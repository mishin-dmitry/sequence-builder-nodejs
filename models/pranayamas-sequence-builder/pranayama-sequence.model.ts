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
  class PranayamaSequence extends Model<
    InferAttributes<PranayamaSequence>,
    InferCreationAttributes<PranayamaSequence>
  > {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string | null;
    declare userId: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: Db) {
      PranayamaSequence.hasMany(models.pranayamaSteps, {
        foreignKey: "sequenceId",
        as: "steps",
      });

      PranayamaSequence.belongsTo(models.users, {
        foreignKey: "userId",
      });
    }
  }

  PranayamaSequence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "PranayamaSequence",
    }
  );

  return PranayamaSequence;
};
