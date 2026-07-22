import {
  Model,
  Sequelize,
  DataTypes as SequelizeDataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

const RHYTHM_PATTERN = /^\d+(:\d+){1,3}$/;

export = (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
  class PranayamaStep extends Model<
    InferAttributes<PranayamaStep>,
    InferCreationAttributes<PranayamaStep>
  > {
    declare id: CreationOptional<number>;
    declare sequenceId: number;
    declare position: number;
    declare name: string;
    declare description: string | null;
    declare mode: "timer" | "metronome";
    declare durationMode: "time" | "cycles";
    declare timerSeconds: number;
    declare cycleCount: number;
    declare rhythm: string | null;
  }

  PranayamaStep.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sequenceId: DataTypes.INTEGER,
      position: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.STRING,
      mode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isIn: [["timer", "metronome"]] },
      },
      durationMode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isIn: [["time", "cycles"]] },
      },
      timerSeconds: { type: DataTypes.INTEGER, allowNull: false },
      cycleCount: { type: DataTypes.INTEGER, allowNull: false },
      rhythm: {
        type: DataTypes.STRING,
        // Нет ритма при durationMode = "time" — актуален только для метронома.
        allowNull: true,
        validate: {
          // "вдох:выдох" | "вдох:задержка:выдох" | "вдох:задержка:выдох:задержка" —
          // от 2 до 4 сегментов, только неотрицательные целые.
          is: RHYTHM_PATTERN,
        },
      },
    },
    {
      sequelize,
      modelName: "PranayamaStep",
      timestamps: false,
    }
  );

  return PranayamaStep;
};
