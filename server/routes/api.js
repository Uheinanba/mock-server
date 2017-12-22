const _ = require('lodash');
const Mock = require('mockjs');
const models = require('../models');
const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { sanitize, sanitizeBody } = require('express-validator/filter');

const router = express.Router();

const insertMockData = async data => {
  console.log(data);
  const mocks = await models.app_mock.create(data);
};

router.post(
  '/createMock',
  [
    check('type').isIn(['fcp', 'http']),
    check('method').isIn(['post', 'get']),
    check('name').isLength({ min: 1 }),
    check('time').isLength({ min: 2 }),
    sanitizeBody('time').toInt(),
  ],
  (req, res) => {
    const body = req.body;
    try {
      body.mockVo = JSON.stringify(Mock.mock(body.mockVo));
    } catch (e) {
      return res.json({
        errCode: -201,
        errorMsg: 'mockVo 不是正确的json类型',
        data: 0,
      });
    }

    try {
      validationResult(req).throw();
    } catch (err) {
      const errorObj = _.first(_.values(err.mapped()));
      return res.json({
        errCode: -201,
        errorMsg: `${errorObj.msg}:${errorObj.param}`,
        data: 0,
      });
    }

    insertMockData(body);
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
