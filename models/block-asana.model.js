module.exports = (sequelize, DataTypes) => {
  const BlockAsana = sequelize.define(
    "BlockAsana",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      inRepeatingBlock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return BlockAsana;
};
