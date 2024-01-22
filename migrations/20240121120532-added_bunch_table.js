"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable("Bunches", {
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
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "Users", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      }),
      queryInterface.createTable("BunchAsanas", {
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
        bunchId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: "Bunches", key: "id" },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.dropTable("Bunches"),
      queryInterface.dropTable("BunchAsanas"),
    ]);
  },
};
