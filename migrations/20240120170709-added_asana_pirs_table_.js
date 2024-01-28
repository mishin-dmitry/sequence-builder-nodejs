"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Pirs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      asanaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Asanas", key: "id" },
      },
      pirId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Asanas", key: "id" },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Pirs");
  },
};
