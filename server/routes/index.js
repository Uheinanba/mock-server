var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

var data = Mock.mock({
  'list|1-10': [
    {
      'id|+1': 1,
    },
  ],
});
// console.log(JSON.stringify(data, null, 4));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
