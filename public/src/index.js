import { getUrlParam } from './core/help';
import bootstrap from './core/init';
import './style/index.less';
import Create from './create';
import Events from './events';
import './libs/autoresize';

toastr.options = {
  closeButton: true,
  progressBar: true,
  timeOut: '3500',
};

class Index {
  constructor() {
    bootstrap();
    this.$el = $('#app');
    this.initData();
    this.create = new Create(this);
    this.bindEvents();

    this.$resizeTextarea.each((i, el) => {
      const $el = $(el);
      $el.css({
        'min-height': '200px',
        'max-height': '500px',
      });
      $el.val(_.trim($el.val()));
    });
  }

  initData() {
    this.$resizeTextarea = $('.j-textarea__autoresize');
    this.editor = window.ace && window.ace.edit('ace-editor');
    $('.j-list__mock-search').val(getUrlParam('key'));
  }

  bindEvents() {
    const events = new Events(this);
    _.each(events, (eventCb, item) => {
      const items = item.split(',');
      this.$el.on(_.trim(items[1]), _.trim(items[0]), eventCb);
    });
  }
}

$(function() {
  new Index();
});
