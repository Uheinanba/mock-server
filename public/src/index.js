import bootstrap from './core/init';
import _ from 'lodash';
import { getValsByNames } from './core/utils';
import './app.less';
import Events from './events';

class Index {
  constructor() {
    bootstrap();
    this.initMockData = {
      data: {},
    };
    this.$el = $('#app');
    this.initElement();
    this.bindEvents();
    this.initAceEditor();
  }

  initElement() {
    this.$modalForm = this.$el.find('.j-mock-form__modal');
  }

  bindEvents() {
    const events = new Events(this);
    _.each(events, (eventCb, item) => {
      const items = item.split(',');
      this.$el.on(_.trim(items[1]), _.trim(items[0]), eventCb);
    });
  }

  initAceEditor() {
    if (!window.ace) return;
    const editor = ace.edit('ace-editor');
    document.getElementById('ace-editor').style.fontSize = '16px';
    ace.require('ace/ext/settings_menu').init(editor);
    editor.setTheme('ace/theme/twilight');
    editor.resize();
    /* editor.getSession().setUseWrapMode(true);
    editor.getSession().setWrapLimitRange(60, 60); */
    editor.setValue(JSON.stringify(this.initMockData, null, '\t'));
  }
}

new Index();

/* $('.j-btn__add').on('click', () => {
  $('.j-mock-form__modal').modal('show');
}); */

/* const $formEl = $('.j-mock-form__modal');
const $comPanelEl = $('.j-panel-common_data');
$('.j-btn-form__confirm').on('click', res => {
  const formData = getValsByNames($formEl, [
    'method',
    'type',
    'description',
    'url',
    'errCode',
    'errMsg',
    'data',
  ]);
  const commonData = getValsByNames($comPanelEl, [
    'errorCodeKey',
    'errorMsgKey',
  ]);
  const postData = _.extend({}, formData, commonData);
  console.log(postData);
}); */
