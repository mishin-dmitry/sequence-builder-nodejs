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
  class Block extends Model<InferAttributes<Block>, InferCreationAttributes<Block>> {
    declare id: CreationOptional<number>;
    declare sequenceId: number;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: Db) {
      Block.belongsToMany(models.asanas, {
        through: {
          model: "BlockAsana",
          unique: false,
        },
        as: "asanas",
        foreignKey: "blockId",
        otherKey: "asanaId",
      });

      Block.belongsTo(models.sequences, {
        foreignKey: "sequenceId",
        as: "blocks",
      });
    }
  }
  Block.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sequenceId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Sequences",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Block",
      timestamps: false,
    }
  );

  return Block;
};
