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
  class Bunch extends Model<InferAttributes<Bunch>, InferCreationAttributes<Bunch>> {
    declare id: CreationOptional<number>;
    declare title: string | null;
    declare userId: number;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: Db) {
      Bunch.belongsToMany(models.asanas, {
        through: {
          model: "BunchAsanas",
          unique: false,
        },
        as: "asanas",
        foreignKey: "bunchId",
        otherKey: "asanaId",
      });

      Bunch.belongsTo(models.users, {
        foreignKey: "userId",
      });
    }
  }
  Bunch.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bunch",
      timestamps: false,
    }
  );

  return Bunch;
};
