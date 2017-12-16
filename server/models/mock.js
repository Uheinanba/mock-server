module.exports = (sequelize, DataTypes) => {
  var appMock = sequelize.define('app_mock', {
    data: DataTypes.STRING,
    name: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM,
      values: ['fcp', 'http', 'other'],
    },
  });
  return appMock;
};
