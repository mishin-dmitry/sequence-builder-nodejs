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
      // define association here
    }
  }
  Asana.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.TEXT,
      alias: { type: DataTypes.STRING, allowNull: false },
      searchKeys: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Asana",
    }
  );
  return Asana;
};
