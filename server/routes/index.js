var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  models.app_mock.findAll().then(mocks => {
    const resMocks = mocks.map(item => ({
      name: item.name,
      type: item.type,
      mock: item.data,
    }));
    res.render('index', {
      mocks: resMocks,
    });
  });
});

// 新建页面
router.get('/create', function(req, res) {
  res.render('create');
});

module.exports = router;
