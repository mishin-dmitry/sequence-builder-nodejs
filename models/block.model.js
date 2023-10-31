"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Block extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Block.belongsToMany(models.asanas, {
        through: {
          model: "BlockAsana",
          unique: false,
        },
        as: "asanas",
        foreignKey: "blockId",
        otherKey: "asanaId",
        unique: false,
      });

      Block.belongsTo(models.sequences, {
        foreignKey: "sequenceId",
        as: "blocks",
      });
    }
  }
  Block.init(
    {
      sequenceId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Sequences",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Block",
      timestamps: false,
    }
  );

  return Block;
};
