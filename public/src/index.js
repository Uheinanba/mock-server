import _ from 'lodash';

import bootstrap from './core/init';
import { getValsByNames } from './core/utils';
import './style/index.less';
import Mocks from './mocks';
import Events from './events';

class Index {
  constructor() {
    bootstrap();
    this.$el = $('#app');
    this.initElement();
    this.bindEvents();
    this.mocks = new Mocks();
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
