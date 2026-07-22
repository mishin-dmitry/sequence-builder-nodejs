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
  class Asana extends Model<InferAttributes<Asana>, InferCreationAttributes<Asana>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string | null;
    declare alias: string;
    declare searchKeys: string | null;
    declare image: string | null;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: Db) {
      Asana.belongsToMany(models.asanasGroups, {
        through: "AsanaByGroups",
        foreignKey: "asanaId",
        otherKey: "groupId",
        onDelete: "CASCADE",
        as: "groups",
      });

      Asana.belongsToMany(models.blocks, {
        through: {
          model: "BlockAsana",
          unique: false,
        },
        foreignKey: "asanaId",
        otherKey: "blockId",
      });

      Asana.belongsToMany(models.bunches, {
        through: {
          model: "BunchAsanas",
          unique: false,
        },
        as: "asanas",
        foreignKey: "asanaId",
        otherKey: "bunchId",
      });
    }
  }
  Asana.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.TEXT("long"),
      alias: { type: DataTypes.STRING, allowNull: false },
      searchKeys: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Asana",
      timestamps: false,
    }
  );

  return Asana;
};
