var models = require('../models');
var express = require('express');
const { check, validationResult } = require('express-validator/check');
var router = express.Router();

const insertMockData = async data => {
  const mocks = await models.app_mock.create(data);
  console.log(mocks);
};

router.post(
  '/createMock',
  [check('type').isIn(['fcp', 'http']), check('method').isIn(['post', 'get'])],
  function(req, res) {
    const body = req.body;
    console.log(body);
    // insertMockData(body);
    res.json({
      success: 'true',
    });
    /* models.app_mock.findAll().then(mocks => {
    const resMocks = mocks.map(item => ({
      name: item.name,
      type: item.type,
      mock: item.data,
    }));
    res.render('index', {
      mocks: resMocks,
    });
  }); */
  },
);

// 新建页面
router.get('/create', function(req, res) {
  res.render('create');
});

module.exports = router;
