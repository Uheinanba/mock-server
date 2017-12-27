const _ = require('lodash');
const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await models.appProject.findAll({
    attributes: ['id', 'name', 'desc'],
    raw: true,
  });
  res.render('index', {
    projects,
  });
});

// mock列表页面
router.get('/mock/list/:id', function(req, res) {
  console.log(req.params);
  res.render('list', {
    projectId: req.params.id,
  });
});

router.get('/mock/create/:id', function(req, res) {
  res.render('create', {
    projectId: req.params.id,
  });
});

module.exports = router;

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
