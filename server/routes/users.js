const express = require('express');
const router = express.Router();
const userDao = require('../dao/userDao.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/addUser', function(req, res, next) {
  userDao.add(req, res, next);
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
