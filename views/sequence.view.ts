import {
  Model,
  Sequelize,
  DataTypes as SequelizeDataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export = (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
  class SequenceView extends Model<
    InferAttributes<SequenceView>,
    InferCreationAttributes<SequenceView>
  > {
    declare id: CreationOptional<number>;
    declare userId: number;
    declare title: string;
    declare description: string;
    declare name: string;
    declare alias: string;
    declare searchKeys: string | null;
    declare blockId: number;
    declare asanaId: number;
    declare inRepeatingBlock: boolean;
    declare inDynamicBlock: boolean;
  }

  SequenceView.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alias: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      searchKeys: {
        type: DataTypes.STRING,
      },
      blockId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      asanaId: {
        type: DataTypes.INTEGER,
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
    },
    { sequelize, tableName: "SequenceView", modelName: "SequenceView", timestamps: false }
  );

  return SequenceView;
};
