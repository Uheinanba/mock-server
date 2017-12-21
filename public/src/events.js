import _ from 'lodash';
import store from './core/store';

export default class Events {
  constructor(ctx) {
    this.ctx = ctx;
    return {
      /* ['.j-btn__add, click']() {
        ctx.$modalForm.modal('show');
      }, */
      // create 页面 tab切换
      ['.j-create__nav-tabs a, click'](e) {
        e.preventDefault();
        $(this).tab('show');
      },

      ['.j-create__tab-content select, change'](e) {
        store.trigger('setting-change');
      },

      ['.j-create__tab-content input, blur'](e) {
        store.trigger('setting-change');
      },

      /* ['.j-btn-form__confirm, click']() {
        const formData = getValsByNames(ctx.$modalForm, [
          'method',
          'type',
          'description',
          'url',
          'errCode',
          'errMsg',
          'data',
          'errorCodeKey',
          'errorMsgKey',
        ]);
        const commonData = getValsByNames(ctx.$commonPanel, [
          'errorCodeKey',
          'errorMsgKey',
        ]);
        console.log(formData);
        // const postData = _.extend({}, formData);
      }, */
    };
  }
}
