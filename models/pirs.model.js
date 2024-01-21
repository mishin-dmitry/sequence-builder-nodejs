"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pirs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pirs.belongsTo(models.asanas, {
        foreignKey: "pirId",
      });

      Pirs.belongsTo(models.asanas, {
        foreignKey: "asanaId",
      });
    }
  }
  Pirs.init(
    {
      title: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Pirs",
    },
    { timestamps: false }
  );

  return Pirs;
};
