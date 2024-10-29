"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "Asanas", // table name
      "isAsymmetrical", // new field name
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    )

    await queryInterface.addColumn(
      "Asanas", // table name
      "groupForGenerating", // new field name
      {
        type: Sequelize.ENUM(['sagittal', 'frontal', 'stomachLying', 'backLying', 'sitting', 'handBalances', 'shoulders', 'inverted']),
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "isAsymmetrical")
    await queryInterface.removeColumn("Users", "groupForGenerating")
  }
};
