import {
  Model,
  Sequelize,
  DataTypes as SequelizeDataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export = (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
  class BlockAsana extends Model<
    InferAttributes<BlockAsana>,
    InferCreationAttributes<BlockAsana>
  > {
    declare id: CreationOptional<number>;
    declare asanaId: number;
    declare blockId: number;
    declare inRepeatingBlock: boolean;
    declare inDynamicBlock: boolean;
  }

  BlockAsana.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      inRepeatingBlock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      inDynamicBlock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      asanaId: DataTypes.INTEGER,
      blockId: DataTypes.INTEGER,
    },
    { sequelize, modelName: "BlockAsana", timestamps: false }
  );

  return BlockAsana;
};
