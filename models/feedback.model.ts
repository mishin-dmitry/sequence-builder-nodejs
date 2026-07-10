import {
  Model,
  Sequelize,
  DataTypes as SequelizeDataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export = (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
  class Feedback extends Model<InferAttributes<Feedback>, InferCreationAttributes<Feedback>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare text: string;
    declare topic: string;
    declare name: string;
  }

  Feedback.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "Feedback", timestamps: false }
  );

  return Feedback;
};
