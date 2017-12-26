const _ = require('lodash');
const Mock = require('mockjs');
const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { sanitize, sanitizeBody } = require('express-validator/filter');

const models = require('../models');
const { SUCCESS_JSON } = require('../config/const');

const router = express.Router();

const checkPostMockData = [
  check('type').isIn(['fcp', 'http']),
  check('method').isIn(['post', 'get']),
  check('name').isLength({ min: 1 }),
  check('time').isLength({ min: 2 }),
  sanitizeBody('time').toInt(),
];
const checkProjectData = [
  check('name').isLength({ min: 1 }),
  check('desc').isLength({ min: 1 }),
];

/* router.post('/createMock', checkPostMockData, (req, res) => {
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
  models.appMock.create(body).then(() =>
    res.json({
      errCode: 0,
      errorMsg: 'mockVo 不是正确的json类型',
      data: 1,
    }),
  );
}); */

router.post('/createProject', checkProjectData, (req, res) => {
  const body = req.body;
  models.appProject.create(body).then(() => {
    res.json(SUCCESS_JSON);
  });
});

module.exports = router;
