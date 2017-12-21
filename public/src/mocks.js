import store from './core/store';
import { setInitMockData } from './core/help';
import { SETTING_FILEDS, SETTING_FCP_TYPE } from './config';
import { setValsByNames } from './core/utils';

export default class {
  constructor(ctx) {
    this.ctx = ctx;
    this.initData();
    this.initAceEditor();
    this.listenSettingChange();
    // this.editor.getSession().on('change', function() {});
  }

  initData() {
    this.editor = this.ctx.editor;
    this.$tabContent = $('.j-create__tab-content');
    this.validSettings = {}; //  保存正确的数据
  }

  listenSettingChange() {
    store.on('setting-change', res => this.getInitMockData(res));
  }

  getInitMockData(settings) {
    const { type, errCodeKey, errMsgKey, errCode, errMsg } = settings;
    try {
      // 设置aec 编辑器中数据
      let mockData = setInitMockData(
        type === 'fcp',
        settings,
        this.editor.getValue(),
      );
      this.editor.setValue(JSON.stringify(mockData, null, '\t'));
      this.validSettings = settings;
    } catch (e) {
      // 重新设置setting 面板中的数据
      setValsByNames(this.$tabContent, SETTING_FILEDS, this.validSettings);
      toastr.error('输入参数不是有效的JSON格式', '调用失败');
    }
  }

  initAceEditor() {
    const editor = this.editor;
    if (!editor) return;
    document.getElementById('ace-editor').style.fontSize = '16px';
    ace.require('ace/ext/settings_menu').init(editor);
    editor.setTheme('ace/theme/twilight');
    editor.resize();
    editor.setValue(JSON.stringify(SETTING_FCP_TYPE, null, '\t'));
  }
}
