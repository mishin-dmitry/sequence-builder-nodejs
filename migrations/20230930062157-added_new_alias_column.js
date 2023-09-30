"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "Asanas", // table name
        "alias", // new field name
        {
          type: Sequelize.STRING,
          allowNull: false,
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Users", "alias")]);
  },
};
