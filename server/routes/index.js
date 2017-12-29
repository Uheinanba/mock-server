const _ = require('lodash');
const { appMock, appProject } = require('../models');
const { getRawMocks } = require('../libs/help');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await appProject.findAll({
    attributes: ['id', 'name', 'desc'],
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

router.get('/mock/create/:id', function(req, res) {
  res.render('create', {
    projectId: req.params.id,
  });
});

module.exports = router;
