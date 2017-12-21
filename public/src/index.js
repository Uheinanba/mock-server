import bootstrap from './core/init';
import { getValsByNames } from './core/utils';
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
    this.mocks = new Mocks();

    this.initElement();
    this.bindEvents();
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
}

new Index();
