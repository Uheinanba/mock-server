var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
