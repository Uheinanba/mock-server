import _ from 'lodash';

import { getValsByNames } from './core/utils';

export default class Events {
  constructor(ctx) {
    this.ctx = ctx;
    return {
      ['.j-btn__add, click']() {
        ctx.$modalForm.modal('show');
      },

      ['.j-btn-form__confirm, click']() {
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
        /* const commonData = getValsByNames(ctx.$commonPanel, [
          'errorCodeKey',
          'errorMsgKey',
        ]); */
        console.log(formData);
        // const postData = _.extend({}, formData);
      },
    };
  }
}
