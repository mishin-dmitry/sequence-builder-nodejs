import { Sequelize } from "sequelize";

export const AsanaModel = (sequelize: Sequelize, DataTypes: any) => {
  const Asana = sequelize.define("asana", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  return Asana;
};
