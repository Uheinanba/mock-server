import store from './core/store';

export default class Events {
  constructor(ctx) {
    this.ctx = ctx;
    return {
      // create 页面 tab切换
      ['.j-create__nav-tabs a, click'](e) {
        e.preventDefault();
        $(this).tab('show');
      },

      ['.j-create__tab-content select, change'](e) {
        store.trigger('setting-change', [3434]);
      },

      ['.j-create__tab-content input, blur'](e) {
        store.trigger('setting-change');
      },
    };
  }
}
