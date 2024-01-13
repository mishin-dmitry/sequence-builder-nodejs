module.exports = (sequelize, DataTypes) => {
  const Pirs = sequelize.define("Pirs", {
    asanaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      references: {
        model: "Asana",
        key: "id",
      },
    },
    pirId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      references: {
        model: "Asana",
        key: "id",
      },
    },
  });

  return Pirs;
};
