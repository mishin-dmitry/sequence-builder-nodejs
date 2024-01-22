module.exports = (sequelize, DataTypes) => {
  const BunchAsana = sequelize.define("BunchAsanas", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
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
    bunchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      references: {
        model: "Bunch",
        key: "id",
      },
    },
  });

  return BunchAsana;
};
