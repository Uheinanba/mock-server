const _ = require('lodash');
const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  models.app_mock.findAll({ raw: true }).then(mocks => {
    res.render('index', {
      mocks: _.map(mocks, items => {
        for (const prop in items) {
          if (prop === 'mockVo') {
            items[prop] = _.trim(
              JSON.stringify(JSON.parse(items[prop]), null, '\t'),
            );
            break;
          }
        }
        return items;
      }),
    });
  });
});

// 新建页面
router.get('/create', function(req, res) {
  res.render('create');
});

module.exports = router;
