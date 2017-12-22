var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  models.app_mock.findAll().then(mocks => {
    res.render('index', {
      mocks: mocks,
    });
  });
});

// 新建页面
router.get('/create', function(req, res) {
  res.render('create');
});

module.exports = router;
