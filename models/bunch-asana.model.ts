import {
  Model,
  Sequelize,
  DataTypes as SequelizeDataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export = (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
  class BunchAsana extends Model<
    InferAttributes<BunchAsana>,
    InferCreationAttributes<BunchAsana>
  > {
    declare id: CreationOptional<number>;
    declare asanaId: number;
    declare bunchId: number;
  }

  BunchAsana.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      asanaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "Asanas",
          key: "id",
        },
      },
      bunchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "Bunch",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "BunchAsanas",
      timestamps: false,
    }
  );

  return BunchAsana;
};
