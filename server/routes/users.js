const express = require('express');
const router = express.Router();
// const userDao = require('../model/userDao.js');

//引入框架
var Sequelize = require('sequelize');
//初始化链接（支持连接池）
var sequelize = new Sequelize('connect', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

const Task = sequelize.define('task', {
  title: Sequelize.STRING,
  rating: { type: Sequelize.STRING, defaultValue: 3 },
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/addUser', function(req, res, next) {
  // now instantiate an object
  Task.sync();
  Task.create({ title: 'foo', description: 'bar', deadline: new Date() }).then(
    task => {
      // you can now access the newly created task via the variable task
    },
  );

  res.send('respond with a resource');
  // userDao.add(req, res, next);
});

/**
  @param {
    pageSize
    pageNumber
  }
  @return {
    pageSize
    pageNumber
    totalCount
    data
  }
 */
router.post('/', (req, res, next) => {
  res.json();
  // console.log(res);
});
module.exports = router;
