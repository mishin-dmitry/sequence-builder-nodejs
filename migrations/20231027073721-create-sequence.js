"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable("BlockAsanas", {
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
      }),
      queryInterface.createTable("Blocks", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        sequenceId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "Sequences", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      }),
      queryInterface.createTable("Sequences", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
        },
        isPublic: {
          type: Sequelize.BOOLEAN,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "Users", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.dropTable("BlockAsanas"),
      queryInterface.dropTable("Blocks"),
      queryInterface.dropTable("Sequences"),
    ]);
  },
};
