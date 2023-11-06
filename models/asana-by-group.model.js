module.exports = (sequelize, DataTypes) => {
  const AsanaByGroup = sequelize.define("AsanaByGroup", {
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
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      references: {
        model: "AsanasGroup",
        key: "id",
      },
    },
  });
  return AsanaByGroup;
};
