"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn("Asanas", "searchKeys", {
      type: Sequelize.TEXT,
    }),

  down: async (queryInterface, Sequelize) =>
    queryInterface.removeColumn("Asanas", "searchKeys"),
};
