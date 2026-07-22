"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PranayamaSequences", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.createTable("PranayamaSteps", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      sequenceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "PranayamaSequences", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      position: { type: Sequelize.INTEGER, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING },
      mode: { type: Sequelize.STRING, allowNull: false },
      durationMode: { type: Sequelize.STRING, allowNull: false },
      timerSeconds: { type: Sequelize.INTEGER, allowNull: false },
      cycleCount: { type: Sequelize.INTEGER, allowNull: false },
      rhythm: { type: Sequelize.STRING },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("PranayamaSteps");
    await queryInterface.dropTable("PranayamaSequences");
  },
};
