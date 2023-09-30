"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      "Asanas", // table name
      "alias", // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    ),

  down: async (queryInterface, Sequelize) =>
    queryInterface.removeColumn("Users", "alias"),
};
