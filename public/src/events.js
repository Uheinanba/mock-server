import store from './core/store';
import { SETTING_FILEDS } from './config';
import { getValsByNames } from './core/utils';
import { fixAceEditorVal } from './core/help';

export default class Events {
  constructor(ctx) {
    this.ctx = ctx;
    this.$tabContent = $('.j-create__tab-content');
    store.trigger('setting-change', [this.getSettingVals()]);
    return this.bindEvents();
  }
  bindEvents() {
    return {
      // create 页面 tab切换
      ['.j-create__nav-tabs a, click'](e) {
        e.preventDefault();
        $(this).tab('show');
      },

      ['.j-create__tab-content select, change']: () =>
        this._handleSettingChange(),

      ['.j-create__tab-content input, blur']: () => this._handleSettingChange(),

      ['.j-create__preview, click']: () => {
        const $previeModal = $('.j-preview__modal-content');
        try {
          const aceVal = fixAceEditorVal(this.ctx.editor.getValue());
          const values = Mock.mock(JSON.parse(aceVal));
          $previeModal.html(JSON.stringify(values, null, '\t'));
        } catch (e) {
          $previeModal.html('编辑框中数据不是有效的JSON格式');
          toastr.error('不是有效的JSON格式', '预览失败');
        }
      },

      ['.j-create__submit, click']: () => {
        let mockVo = {};
        try {
          mockVo = JSON.parse(fixAceEditorVal(this.ctx.editor.getValue()));
        } catch (e) {
          return toastr.error('输入参数不是有效的JSON格式', '调用失败');
        }
        this._handleSubmitMockData(mockVo);
      },
    };
  }

  _handleSubmitMockData(mockVo) {
    $.ajax({
      url: '/api/createMock',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify(
        _.extend(
          { mockVo },
          _.pick(this.settingVals, ['name', 'type', 'method', 'desc', 'time']),
        ),
      ),
    });
  }
  _handleSettingChange() {
    store.trigger('setting-change', [this.getSettingVals()]);
  }

  getSettingVals() {
    this.settingVals = getValsByNames(this.$tabContent, SETTING_FILEDS);
    return this.settingVals;
  }
}
