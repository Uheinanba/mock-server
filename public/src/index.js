import init from './core/init';
import _ from 'lodash';
import { getValsByNames } from './core/utils';
import './app.less';
import Events from './events';

class Index {
  constructor() {
    this.$el = $('#app');
    this.bindEvents();
  }
  bindEvents() {
    const events = new Events(this);
    _.each(events, (eventCb, item) => {
      const items = item.split(',');
      this.$el.on(_.trim(items[1]), _.trim(items[0]), () => {
        console.log(3434);
      });
    });
  }
}
new Index();

$('.j-btn__add').on('click', () => {
  $('.j-mock-form__modal').modal('show');
});

const $formEl = $('.j-mock-form__modal');
const $comPanelEl = $('.j-panel-common_data');
$('.j-btn-form__sure').on('click', res => {
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
});

init();
