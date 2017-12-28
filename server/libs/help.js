const _ = require('lodash');

exports.getRawMocks = mocks => {
  return _.map(mocks, items => {
    for (const prop in items) {
      if (prop === 'mockVo') {
        items[prop] = _.trim(
          JSON.stringify(JSON.parse(items[prop]), null, '\t'),
        );
        break;
      }
    }
    return items;
  });
};
