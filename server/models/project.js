module.exports = (sequelize, DataTypes) => {
  const appProject = sequelize.define('appProject', {
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
  });
  appProject.associate = models => {
    models.appProject.hasMany(models.appMock);
  };
  return appProject;
};
