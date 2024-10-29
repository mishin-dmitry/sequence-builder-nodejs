"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AsanasGroupsCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AsanasGroupsCategory.hasMany(models.asanasGroups, {
        foreignKey: "categoryId",
        as: "groups",
        onDelete: 'CASCADE',
      });
    }
  }
  AsanasGroupsCategory.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "AsanasGroupsCategory",
    },
    { timestamps: false }
  );

  return AsanasGroupsCategory;
};
