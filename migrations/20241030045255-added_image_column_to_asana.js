"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      "Asanas", // table name
      "image", // new field name
      {
        type: Sequelize.STRING,
      }
    ),

  down: async (queryInterface, Sequelize) =>
    queryInterface.removeColumn("Users", "image"),
};
