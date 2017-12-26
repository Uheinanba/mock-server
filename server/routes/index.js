const _ = require('lodash');
const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  models.appProject
    .findAll({
      attributes: ['name', 'desc'],
      raw: true,
    })
    .then(projects => {
      res.render('index', {
        projects,
        /* mocks: _.map(mocks, items => {
        for (const prop in items) {
          if (prop === 'mockVo') {
            items[prop] = _.trim(
              JSON.stringify(JSON.parse(items[prop]), null, '\t'),
            );
            break;
          }
        }
        return items;
      }), */
      });
    });
});

// 新建页面
router.get('/mock/list', function(req, res) {
  res.render('list');
});

module.exports = router;
