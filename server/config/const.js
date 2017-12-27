exports.SUCCESS_JSON = {
  errCode: 0,
  errMsg: '成功',
  data: null,
};

exports.FAIL_JSON = {
  errCode: -1,
  errMsg: '系统错误',
  data: null,
};

exports.ERRORS = {
  invalid: {
    errCode: -201,
    errMsg: '参数校验失败',
    data: null,
  },
  db: {
    errCode: -202,
    errMsg: '数据库操作失败',
    data: null,
  },
  unique: {
    errCode: -203,
    errMsg: '值要唯一',
    data: null,
  },
};
