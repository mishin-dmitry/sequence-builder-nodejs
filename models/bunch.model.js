"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Bunch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bunch.belongsToMany(models.asanas, {
        through: {
          model: "BunchAsanas",
          unique: false,
        },
        as: "asanas",
        foreignKey: "bunchId",
        otherKey: "asanaId",
        unique: false,
      });

      Bunch.belongsTo(models.users, {
        foreignKey: "userId",
      });
    }
  }
  Bunch.init(
    {
      title: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Bunch",
      timestamps: false,
    }
  );

  return Bunch;
};
