import _ from 'lodash';
import store from './core/store';
import { getValsByNames } from './core/utils';

const FCP_TYPE = {
  Result: {
    FailureCode: 0,
    StatusCode: 0,
  },
  Value: {},
};
const HTTP_TYPE = {};

export default class {
  constructor() {
    this.data = {
      data: {},
    };
    this.initAceEditor();
    this.listenSettingVal(data => {
      console.log(data);
    });
  }

  listenSettingVal(cb = $.noop) {
    cb(this.getSettingVal());
    store.on('setting-change', () => {
      cb(this.getSettingVal());
    });
  }

  getInitMockData(obj) {
    let typeData = obj.type === 'fcp' ? _.merge({}, FCP_TYPE) : HTTP_TYPE;
    _.set(typeData);
    if (obj.type === 'fcp') {
      let data = _.merge({}, FCP_TYPE);
      // _.set(data, 'Value.', );
    }
    /* const typeData =
      obj.type === 'fcp'
        ? { Result: { FailureCode: 0, StatusCode: 0 }, Value: {} }
        : {}; */
  }

  getSettingVal() {
    const $basic = $('#basicSetting');
    const $other = $('#otherSetting');
    const basicVal = getValsByNames($basic, [
      'method',
      'type',
      'delay',
      'desc',
    ]);
    const otherVal = getValsByNames($other, ['errCodeKey', 'errMsgKey']);
    return _.extend({}, basicVal, otherVal);
  }

  initAceEditor() {
    if (!window.ace) return;
    const editor = ace.edit('ace-editor');
    document.getElementById('ace-editor').style.fontSize = '16px';
    ace.require('ace/ext/settings_menu').init(editor);
    editor.setTheme('ace/theme/twilight');
    editor.resize();
    editor.setValue(JSON.stringify(this.data, null, '\t'));
  }
}
