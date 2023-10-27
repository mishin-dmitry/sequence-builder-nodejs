"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("BlockAsanas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      asanaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Asanas", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      blockId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Blocks", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BlockAsanas");
  },
};
