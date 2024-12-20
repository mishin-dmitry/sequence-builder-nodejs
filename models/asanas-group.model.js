"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AsanasGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AsanasGroup.belongsToMany(models.asanas, {
        through: 'AsanaByGroups',
        foreignKey: 'groupId',
        otherKey: 'asanaId',
        onDelete: 'CASCADE',
        as: 'asanas'
      });

      AsanasGroup.belongsTo(models.asanasGroupsCategories, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
        as: 'category'
      })
    }
  }
  AsanasGroup.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "AsanasGroup",
    },
    { timestamps: false }
  );

  return AsanasGroup;
};
