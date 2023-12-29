"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      "Asanas", // table name
      "alignment", // new field name
      {
        type: Sequelize.TEXT,
      }
    ),

  down: async (queryInterface, Sequelize) =>
    queryInterface.removeColumn("Users", "alignment"),
};
