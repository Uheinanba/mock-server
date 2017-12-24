module.exports = (sequelize, DataTypes) => {
  const appMock = sequelize.define('app_mock', {
    url: DataTypes.STRING,
    mockVo: DataTypes.STRING,
    time: DataTypes.STRING,
    desc: DataTypes.STRING,
  });
  return appMock;
};
