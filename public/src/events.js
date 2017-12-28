import store from './core/store';
import { SETTING_FILEDS, UPDATE_MOCK_FILEDS } from './config';
import { getValsByNames, setValsByNames } from './core/utils';
import { fixAceEditorVal } from './core/help';
import fetch from './core/fetch';

export default class Events {
  constructor(ctx) {
    this.ctx = ctx;
    this.$tabContent = $('.j-create__tab-content');
    store.trigger('setting-change', [this.getSettingVals()]);

    $('#newProjectModal').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .get(0)
        .reset();
    });

    return this.bindEvents();
  }
  bindEvents() {
    return _.extend(
      {},
      this.bindCreatePageEvents(),
      this.bindIndexPageEvents(),
      this.bindListPageEvents(),
    );
  }

  bindCreatePageEvents() {
    return {
      // create 页面 tab切换
      ['.j-create__nav-tabs a, click'](e) {
        e.preventDefault();
        $(this).tab('show');
      },

      ['.j-create__tab-content select, change']: () => {
        this._handleSettingChange();
      },

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

  bindIndexPageEvents() {
    return {
      // 新建类别
      ['.j-btn__new-project, click']: () => {
        const { name, desc } = getValsByNames($('#newProjectModal'), [
          'name',
          'desc',
        ]);
        fetch({
          url: '/__api/createProject',
          data: { name, desc },
          successMsg: '添加成功',
        });
      },
    };
  }

  bindListPageEvents() {
    return {
      ['.j-textarea__autoresize, input']() {
        $(this)
          .prev()
          .removeClass('hide');
      },
      ['.j-list__mock-update, click']() {
        const mockId = $(this).attr('data-mockId');
        const $textArea = $(this).next();
        const mockVo = $textArea.val().replace(/\s/g, '');
        try {
          JSON.parse(mockVo);
        } catch (e) {
          return toastr.error('不是有效的JSON格式', '更新失败');
        }
        fetch({
          url: '/__api/updateMock',
          data: {
            mockVo: fixAceEditorVal(mockVo),
            mockId,
          },
          successMsg: '更新成功',
        });
      },
      ['.j-btn-mock_list-del, click'](e) {
        e.stopPropagation();
        const $el = $(this);
        const mockId = $el.attr('data-mockId');
        fetch({
          url: '/__api/delMock',
          data: {
            mockId,
          },
          successMsg: '删除成功',
        }).done(() => {
          $el.parents('tr').remove();
        });
      },

      ['.j-btn-mock_list-update, click'](e) {
        e.stopPropagation();
        const $el = $(this);
        const $tr = $el.parents('tr');
        const $updateModel = $('.j-update__mock-modal');
        const mockId = $el.attr('data-mockId');
        const values = getValsByNames($tr, UPDATE_MOCK_FILEDS);

        setValsByNames($updateModel, UPDATE_MOCK_FILEDS, values);
        $updateModel.modal('show');
        $updateModel.attr('data-mockId', mockId);
      },

      // TODO 更新
      ['.j-btn__update-mock, click'](e) {},
    };
  }

  _handleSubmitMockData(mockVo) {
    let values = _.pick(this.settingVals, ['url', 'type', 'desc', 'time']);
    !/^\/.*/.test(values.url) && (values.url = `/${values.url}`);
    const appProjectId = $('.j-project-id').attr('data-projectId');
    fetch({
      url: '/__api/createMock',
      data: _.extend({ mockVo, appProjectId }, values),
      successMsg: '提交成功',
    }).done(() => {
      location.href = `/mock/list/${appProjectId}`;
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
