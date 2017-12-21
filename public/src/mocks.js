import store from './core/store';
import { SETTING_FILEDS, SETTING_FCP_TYPE } from './config';
import { setInitMockData } from './core/help';
import { getValsByNames, setValsByNames } from './core/utils';

export default class {
  constructor() {
    this.initData();
    this.initAceEditor();
    this.listenSettingChange();
  }

  initData() {
    this.editor = ace.edit('ace-editor');
    this.$tabContent = $('.j-create__tab-content');
    this.validSettings = {}; //  保存正确的数据
  }

  listenSettingChange() {
    this.getInitMockData(getValsByNames(this.$tabContent, SETTING_FILEDS));
    store.on('setting-change', res => {
      this.getInitMockData(getValsByNames(this.$tabContent, SETTING_FILEDS));
      console.log(res);
    });
  }

  getInitMockData(settings) {
    const { type, errCodeKey, errMsgKey, errCode, errMsg } = settings;
    try {
      let mockData = setInitMockData(
        type === 'fcp',
        settings,
        this.editor.getValue(),
      );
      this.editor.setValue(JSON.stringify(mockData, null, '\t'));
      this.validSettings = settings;
    } catch (e) {
      setValsByNames(this.$tabContent, SETTING_FILEDS, this.validSettings);
      toastr.error('输入参数不是有效的JSON格式', '调用失败');
    }
  }

  initAceEditor() {
    const editor = this.editor;
    document.getElementById('ace-editor').style.fontSize = '16px';
    ace.require('ace/ext/settings_menu').init(editor);
    editor.setTheme('ace/theme/twilight');
    editor.resize();
    editor.setValue(JSON.stringify(SETTING_FCP_TYPE, null, '\t'));
  }
}
