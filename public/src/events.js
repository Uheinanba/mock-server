import store from './core/store';
import { SETTING_FILEDS, UPDATE_MOCK_FILEDS } from './config';
import {
  getValsByNames,
  setValsByNames,
  setStore,
  getStore,
} from './core/utils';
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
    const me = this;
    return {
      // 新建类别
      ['.j-btn__new-project, click']: () => {
        const { name, desc, prefix } = getValsByNames($('#newProjectModal'), [
          'name',
          'desc',
          'prefix',
        ]);
        if (_.isEmpty(name) || _.isEmpty(desc) || _.isEmpty(prefix))
          return toastr.info('请输入项目名称和描述', '警告', {
            timeOut: '1500',
            progressBar: false,
            positionClass: 'toast-top-center',
          });
        fetch({
          url: '/__api/createProject',
          data: { name, desc, prefix },
          successMsg: '添加成功',
        }).then(() => {
          location.reload();
        });
      },

      // 删除
      ['.j-index__del-project, click'](e) {
        e.stopPropagation();
        e.preventDefault();
        const $projItem = $(this).parents('.j-index__project-item');

        $('.j-my-modal')
          .data({
            projectName: $projItem.find('.project-name').text(),
            projectId: $projItem.attr('data-projectId'),
          })
          .modal('toggle');
      },

      ['.j-proj-btn__confirm-del, click'](e) {
        const $el = $(this);
        const $modal = $el.parents('.j-my-modal');
        const $nameEl = $modal.find('input[name="name"]');
        const nameVal = $nameEl.val();

        if ($modal.data('projectName') !== nameVal) {
          $nameEl.val('');
          return toastr.error('请输入正确的项目名称', '失败');
        }

        fetch({
          url: '/__api/delProject',
          data: {
            projectId: $modal.data('projectId'),
          },
          successMsg: '删除成功',
        }).then(() => {
          $('.j-index__project-item').filter((index, el) => $(el).remove());
          $modal.modal('hide');
        });
      },
    };
  }

  bindListPageEvents() {
    return {
      ['.j-list__tr-item, click']() {
        setTimeout(() => {
          $('textarea').autoResize();
        }, 0);
      },

      ['.j-textarea__autoresize, input']() {
        $(this)
          .prev()
          .removeClass('hide');
      },

      // 更新mockVo数据
      ['.j-list__mock-update, click']() {
        let mockVo;
        const mockId = $(this).attr('data-mockId');
        const $textArea = $(this).next();
        try {
          mockVo = fixAceEditorVal($textArea.val().replace(/\s/g, ''));
          JSON.parse(mockVo);
        } catch (e) {
          return toastr.error('不是有效的JSON格式', '更新失败');
        }
        fetch({
          url: '/__api/updateMock',
          data: {
            mockVo: mockVo,
            mockId,
          },
          successMsg: '更新成功',
        });
      },

      // 删除
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
        }).then(() => {
          const $tr = $el.parents('tr');
          $tr.next().remove();
          $tr.remove();
        });
      },

      // 弹窗 modal 更新
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

      // 按照url进行搜索
      ['.j-mock_list-search, click'](e) {
        const $el = $(this);
        $el.parents('form').submit();
      },

      // 更新
      ['.j-btn__update-mock, click'](e) {
        const $updateModel = $('.j-update__mock-modal');
        const mockId = $updateModel.attr('data-mockId');
        const values = getValsByNames($updateModel, UPDATE_MOCK_FILEDS);
        fetch({
          url: '/__api/updateMock',
          data: _.extend({ mockId }, values),
          successMsg: '更新成功',
        }).then(() => {
          setValsByNames(
            $('.j-mock__list-table').find(`tr[data-mockId='${mockId}']`),
            UPDATE_MOCK_FILEDS,
            values,
          );
        });
      },
    };
  }

  _handleSubmitMockData(mockVo) {
    let values = _.pick(this.settingVals, [
      'url',
      'type',
      'desc',
      'time',
      'method',
    ]);
    values.type && setStore('type', values.type);

    !/^\/.*/.test(values.url) && (values.url = `/${values.url}`);
    const appProjectId = $('.j-create__project-data').attr('data-projectId');
    fetch({
      url: '/__api/createMock',
      data: _.extend({ mockVo, appProjectId }, values),
      successMsg: '提交成功',
    }).then(() => {
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
