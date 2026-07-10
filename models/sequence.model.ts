import {
  Model,
  Sequelize,
  DataTypes as SequelizeDataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { Db } from "./types";

export = (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
  class Sequence extends Model<InferAttributes<Sequence>, InferCreationAttributes<Sequence>> {
    declare id: CreationOptional<number>;
    declare title: string | null;
    declare description: string | null;
    declare userId: number;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: Db) {
      Sequence.hasMany(models.blocks, {
        foreignKey: "sequenceId",
        as: "blocks",
      });

      Sequence.belongsTo(models.users, {
        foreignKey: "userId",
      });
    }
  }
  Sequence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Sequence",
      timestamps: false,
    }
  );

  return Sequence;
};
