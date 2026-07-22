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
  class AsanasGroup extends Model<
    InferAttributes<AsanasGroup>,
    InferCreationAttributes<AsanasGroup>
  > {
    declare id: CreationOptional<number>;
    declare name: string;
    declare alias: string;
    declare categoryId: number | null;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: Db) {
      AsanasGroup.belongsToMany(models.asanas, {
        through: "AsanaByGroups",
        foreignKey: "groupId",
        otherKey: "asanaId",
        onDelete: "CASCADE",
        as: "asanas",
      });

      AsanasGroup.belongsTo(models.asanasGroupsCategories, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
        as: "category",
      });
    }
  }
  AsanasGroup.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      alias: { type: DataTypes.STRING, allowNull: false },
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AsanasGroup",
      timestamps: false,
    }
  );

  return AsanasGroup;
};
