import store from './core/store';
import { SETTING_FILEDS } from './config';
import { getValsByNames } from './core/utils';

export default class Events {
  constructor(ctx) {
    this.ctx = ctx;
    this.$tabContent = $('.j-create__tab-content');
    this.getSettingVals();
    store.trigger('setting-change', [this.settingVals]);
    return this.bindEvents();
  }
  bindEvents() {
    return {
      // create 页面 tab切换
      ['.j-create__nav-tabs a, click'](e) {
        e.preventDefault();
        $(this).tab('show');
      },

      ['.j-create__tab-content select, change']: () =>
        this.handleSettingChange(),
      ['.j-create__tab-content input, blur']: () => this.handleSettingChange(),
    };
  }

  handleSettingChange() {
    this.getSettingVals();
    store.trigger('setting-change', [this.settingVals]);
  }

  getSettingVals() {
    this.settingVals = getValsByNames(this.$tabContent, SETTING_FILEDS);
  }
}
