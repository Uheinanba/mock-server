module.exports = (sequelize, DataTypes) => {
  const appProject = sequelize.define('appProject', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    desc: DataTypes.STRING,
  });
  appProject.associate = models => {
    models.appProject.hasMany(models.appMock);
  };
  return appProject;
};
