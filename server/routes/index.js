const _ = require('lodash');
const { appMock, appProject } = require('../models');
const express = require('express');
const router = express.Router();

const getRawMocks = mocks => {
  return _.map(mocks, items => {
    for (const prop in items) {
      if (prop === 'mockVo') {
        items[prop] = _.trim(
          JSON.stringify(JSON.parse(items[prop]), null, '\t'),
        );
        break;
      }
    }
    return items;
  });
};

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
  const mocks = await appMock.findAll({
    where: { appProjectId },
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
