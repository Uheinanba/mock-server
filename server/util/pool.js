const _ = require('lodash');
const mysql = require('mysql');
const $conf = require('../config/db');

// 使用连接池，提升性能
module.exports = mysql.createPool(_.extend({}, $conf.mysql));
