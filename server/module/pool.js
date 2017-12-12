const _ = require('lodash');
const mysql = require('mysql');
const $conf = require('../config/db');
const $sql = require('../dao/userSqlMapping');

// 使用连接池，提升性能
module.exports = mysql.createPool(_.extend({}, $conf.mysql));
