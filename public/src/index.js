import bootstrap from './core/init';
import './style/index.less';
import Mocks from './mocks';
import Events from './events';

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
    this.mocks = new Mocks(this);
    this.bindEvents();
  }

  initData() {
    this.editor = window.ace && window.ace.edit('ace-editor');
    this.$modalForm = this.$el.find('.j-mock-form__modal');
  }

  bindEvents() {
    const events = new Events(this);
    _.each(events, (eventCb, item) => {
      const items = item.split(',');
      this.$el.on(_.trim(items[1]), _.trim(items[0]), eventCb);
    });
  }
}

new Index();
