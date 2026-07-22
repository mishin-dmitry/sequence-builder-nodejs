import {
  Model,
  Sequelize,
  DataTypes as SequelizeDataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { Db } from "../types";

export = (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
  class AsanasGroupsCategory extends Model<
    InferAttributes<AsanasGroupsCategory>,
    InferCreationAttributes<AsanasGroupsCategory>
  > {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: Db) {
      AsanasGroupsCategory.hasMany(models.asanasGroups, {
        foreignKey: "categoryId",
        as: "groups",
        onDelete: "CASCADE",
      });
    }
  }
  AsanasGroupsCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "AsanasGroupsCategory",
    }
  );

  return AsanasGroupsCategory;
};
