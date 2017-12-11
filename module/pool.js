const $conf = require('../config/db');
const $sql = require('./userSqlMapping');

// 使用连接池，提升性能
module.exports = mysql.createPool(_.extend({}, $conf.mysql));
