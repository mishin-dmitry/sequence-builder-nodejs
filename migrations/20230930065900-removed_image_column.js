"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.removeColumn("Asanas", "image"),
  down: async (queryInterface, Sequelize) =>
    queryInterface.addColumn("Asanas", "image", {
      type: Sequelize.STRING,
      allowNull: false,
    }),
};
