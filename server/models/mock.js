module.exports = (sequelize, DataTypes) => {
  const appMock = sequelize.define('appMock', {
    url: DataTypes.STRING,
    mockVo: DataTypes.STRING,
    time: DataTypes.STRING,
    desc: DataTypes.STRING,
  });
  return appMock;
};
