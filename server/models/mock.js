module.exports = (sequelize, DataTypes) => {
  const appMock = sequelize.define('appMock', {
    url: DataTypes.STRING,
    type: DataTypes.STRING,
    time: DataTypes.STRING,
    desc: DataTypes.STRING,
    mockVo: DataTypes.STRING,
  });
  return appMock;
};
