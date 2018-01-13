const _ = require('lodash');
const { validationResult } = require('../libs/express-validator/check');
const { ERRORS } = require('../config/const');

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

exports.isValidParams = (req, res) => {
  try {
    validationResult(req).throw();
    return true;
  } catch (err) {
    const errorObj = _.first(_.values(err.mapped()));
    res.json(
      _.extend({}, ERRORS['invalid'], {
        errMsg: `${errorObj.msg}:${errorObj.param}`,
      }),
    );
    return false;
  }
};
