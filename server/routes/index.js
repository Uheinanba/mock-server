const _ = require('lodash');
const { appMock, appProject } = require('../models');
const { getRawMocks } = require('../libs/help');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await appProject.findAll({
    attributes: ['id', 'name', 'prefix', 'desc'],
    raw: true,
  });
  res.render('index', {
    projects,
  });
});

// mock列表页面
router.get('/mock/list/:id', async (req, res) => {
  const appProjectId = req.params.id;
  const key = req.query.key;
  const where = !key
    ? { appProjectId }
    : { appProjectId, url: { $like: '%' + key + '%' } };
  const mocks = await appMock.findAll({
    where,
    raw: true,
  });
  res.render('list', {
    projectId: appProjectId,
    mocks: getRawMocks(mocks),
  });
});

router.get('/mock/create/:id', async (req, res) => {
  const projectId = req.params.id;
  const projects = await appProject.findOne({
    where: { id: projectId },
    raw: true,
  });
  const prefix = projects.prefix;

  const prePrefix = prefix.indexOf('/') === 0 ? prefix.slice(1) : prefix; // 处理前缀
  const postPrefix = _.lastIndexOf('/') === 0 ? prePrefix : prePrefix + '/'; // 处理后缀

  res.render('create', {
    projectId,
    prefix: postPrefix,
  });
});

module.exports = router;
