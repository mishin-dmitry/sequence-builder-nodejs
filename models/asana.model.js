"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Asana extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Asana.belongsToMany(models.asanasGroups, {
        through: "AsanaByGroups",
        as: "groups",
        foreignKey: "asanaId",
        otherKey: "groupId",
      });

      Asana.belongsToMany(models.blocks, {
        through: {
          model: "BlockAsana",
          unique: false,
        },
        foreignKey: "asanaId",
        otherKey: "blockId",
        unique: false,
      });

      Asana.belongsToMany(models.bunches, {
        through: {
          model: "BunchAsanas",
          unique: false,
        },
        as: "asanas",
        foreignKey: "asanaId",
        otherKey: "bunchId",
        unique: false,
      });

      Asana.hasMany(models.pirs, {
        as: "pirs",
        foreignKey: "asanaId",
        unique: false,
      });
    }
  }
  Asana.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.TEXT("long"),
      alias: { type: DataTypes.STRING, allowNull: false },
      alignment: DataTypes.TEXT("long"),
      searchKeys: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Asana",
    }
  );

  return Asana;
};
