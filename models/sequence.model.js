"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Sequence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sequence.hasMany(
        models.blocks,
        {
          foreignKey: "sequenceId",
          as: "blocks",
        },
        { onDelete: "cascade" }
      );

      Sequence.belongsTo(models.users, {
        foreignKey: "userId",
      });
    }
  }
  Sequence.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Sequence",
      timestamps: false,
    }
  );

  return Sequence;
};
