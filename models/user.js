module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("Users", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return User;
};
