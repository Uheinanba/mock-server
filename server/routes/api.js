const _ = require('lodash');
const Mock = require('mockjs');
const express = require('express');
const isJSON = require('is-json');
const { check, validationResult } = require('../libs/express-validator/check');
const {
  sanitize,
  matchedData,
  customSanitizer,
  sanitizeBody,
} = require('../libs/express-validator/filter');

const { appMock, appProject } = require('../models');
const { SUCCESS_JSON, ERRORS, FAIL_JSON } = require('../config/const');

const router = express.Router();

const checkPostMockData = [
  check('type').isIn(['fcp', 'http']),
  check('appProjectId')
    .isLength({ min: 1 })
    .toInt(),
  check('url')
    .isLength({ min: 2 })
    .withMessage('请输入正确的Url路径'),
  check('time')
    .isLength({ min: 2 })
    .toInt(),
  check('mockVo')
    .custom(isJSON)
    .customSanitizer(v => JSON.stringify(v)),
];

const checkProjectData = [
  check('name').isLength({ min: 1 }),
  check('desc').isLength({ min: 1 }),
];

router.post('/createMock', checkPostMockData, async (req, res) => {
  const body = req.body;
  // 校验参数
  try {
    validationResult(req).throw();
  } catch (err) {
    const errorObj = _.first(_.values(err.mapped()));
    return res.json(
      _.extend({}, ERRORS['invalid'], {
        errMsg: `${errorObj.msg}:${errorObj.param}`,
      }),
    );
  }
  const postData = matchedData(req);

  // 查询是否有重复数据(保证同一project下的Url唯一)
  const repeatMock = await appMock.findOne({
    where: { appProjectId: postData.appProjectId, url: postData.url },
  });
  if (repeatMock) {
    try {
      return res.json(
        _.extend({}, ERRORS['unique'], { errMsg: 'url路径不能重复' }),
      );
    } catch (e) {
      return res.json(ERRORS['db']);
    }
  }

  // 插入数据
  try {
    const created = await appMock.create(postData);
    res.json(SUCCESS_JSON);
  } catch (e) {
    return res.json(ERRORS['db']);
  }
});

router.post('/createProject', checkProjectData, (req, res) => {
  const body = req.body;
  appProject.create(body).then(() => {
    res.json(SUCCESS_JSON);
  });
});

module.exports = router;
