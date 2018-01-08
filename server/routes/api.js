const _ = require('lodash');
const Mock = require('mockjs');
const express = require('express');
const isJSON = require('is-json');
const { getRawMocks, isValidParams } = require('../libs/help');
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
  check('method').isIn(['post', 'get']),
  check('desc').exists(),
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
    .customSanitizer(v => JSON.stringify(Mock.mock(v))),
];

const checkProjectData = [
  check('name').isLength({ min: 1 }),
  check('desc').isLength({ min: 1 }),
  check('prefix').isLength({ min: 1 }),
];

router.post('/createMock', checkPostMockData, async (req, res) => {
  const body = req.body;
  // 校验参数
  if (!isValidParams(req, res)) return;
  const postData = matchedData(req);

  // 查询是否有重复数据(保证同一project下的Url唯一)

  try {
    const repeatMock = await appMock.findOne({
      where: { appProjectId: postData.appProjectId, url: postData.url },
    });
    if (repeatMock)
      return res.json(
        _.extend({}, ERRORS['unique'], { errMsg: 'url路径不能重复' }),
      );
  } catch (e) {
    console.log(e);
    return res.json(ERRORS['db']);
  }

  // 插入数据
  try {
    const created = await appMock.create(postData);
    res.json(SUCCESS_JSON);
  } catch (e) {
    console.log(e);
    return res.json(ERRORS['db']);
  }
});

router.post('/delMock', async (req, res) => {
  const body = req.body;
  try {
    const result = await appMock.destroy({
      where: {
        id: body.mockId,
      },
    });
    result ? res.json(SUCCESS_JSON) : res.json(FAIL_JSON);
  } catch (error) {
    res.json(ERRORS['db']);
  }
});

router.post('/updateMock', async (req, res) => {
  const body = req.body;
  const postData = _.omit(body, ['mockId']);
  try {
    const result = await appMock.update(postData, {
      where: {
        id: body.mockId,
      },
    });
    result ? res.json(SUCCESS_JSON) : res.json(FAIL_JSON);
  } catch (error) {
    res.json(ERRORS['db']);
  }
});

router.post('/createProject', checkProjectData, async (req, res) => {
  const body = req.body;
  if (!isValidParams(req, res)) return;
  try {
    await appProject.create(body);
    res.json(SUCCESS_JSON);
  } catch (e) {
    res.json(ERRORS['db']);
  }
});

router.post('/delProject', async (req, res) => {
  const body = req.body;
  try {
    const result = await appProject.destroy({
      where: {
        id: body.projectId,
      },
    });
    result ? res.json(SUCCESS_JSON) : res.json(FAIL_JSON);
  } catch (error) {
    res.json(ERRORS['db']);
  }
});

module.exports = router;
