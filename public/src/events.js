import store from './core/store';
import { SETTING_FILEDS } from './config';
import { getValsByNames } from './core/utils';

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
      ['.j-create__nav-tabs a, click']() {
        e.preventDefault();
        $(this).tab('show');
      },

      ['.j-create__tab-content select, change']: () =>
        this.handleSettingChange(),

      ['.j-create__tab-content input, blur']: () => this.handleSettingChange(),

      ['.j-create__submit, click']: () => {
        let mocks = {};
        try {
          mocks = JSON.parse(this.ctx.editor.getValue());
        } catch (e) {
          return toastr.error('输入参数不是有效的JSON格式', '调用失败');
        }

        console.log(_.extend({}, this.settingVals, { mocks }));
        $.ajax({
          url: '/api/mocks',
          type: 'POST',
          data: _.extend({}, this.settingVals, { mocks }),
        });
      },
    };
  }

  handleSettingChange() {
    store.trigger('setting-change', [this.getSettingVals()]);
  }

  getSettingVals() {
    this.settingVals = getValsByNames(this.$tabContent, SETTING_FILEDS);
    return this.settingVals;
  }
}
