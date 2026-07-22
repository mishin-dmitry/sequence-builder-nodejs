import {
  Model,
  Sequelize,
  DataTypes as SequelizeDataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export = (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
  class AsanaByGroup extends Model<
    InferAttributes<AsanaByGroup>,
    InferCreationAttributes<AsanaByGroup>
  > {
    declare id: CreationOptional<number>;
    declare asanaId: number;
    declare groupId: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
  }

  AsanaByGroup.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "AsanasGroup",
          key: "id",
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize, modelName: "AsanaByGroup" }
  );

  return AsanaByGroup;
};
