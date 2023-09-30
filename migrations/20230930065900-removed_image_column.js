"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Asanas", "image");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Asanas", "image", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
