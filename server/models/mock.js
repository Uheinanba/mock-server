module.exports = (sequelize, DataTypes) => {
  var appMock = sequelize.define('app_mock', {
    mockVo: DataTypes.STRING,
    name: DataTypes.STRING,
    time: DataTypes.STRING,
    desc: DataTypes.STRING,
    method: {
      type: DataTypes.ENUM,
      values: ['post', 'get'],
    },
    type: {
      type: DataTypes.ENUM,
      values: ['fcp', 'http', 'other'],
    },
  });
  return appMock;
};
