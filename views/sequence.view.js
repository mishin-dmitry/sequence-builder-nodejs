module.exports = (sequelize, DataTypes) => {
  const SequenceView = sequelize.define(
    "SequenceView",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alias: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      searchKeys: {
        type: DataTypes.STRING,
      },
      alignment: {
        type: DataTypes.STRING,
      },
      blockId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      asanaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      inRepeatingBlock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      inDynamicBlock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { tableName: "SequenceView" }
  );

  return SequenceView;
};
