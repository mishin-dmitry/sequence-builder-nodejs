"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ContinuingAsanas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContinuingAsanas.belongsTo(models.asanas, {
        foreignKey: "asanaId",
      });

      ContinuingAsanas.belongsTo(models.asanas, {
        foreignKey: "continuingAsanaId",
      });
    }
  }
  ContinuingAsanas.init(
    {},
    {
      sequelize,
      modelName: "ContinuingAsanas",
    },
    { timestamps: false }
  );

  return ContinuingAsanas;
};
