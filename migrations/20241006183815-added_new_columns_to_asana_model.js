'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Asanas', // table name
      'isAsymmetrical', // new field name
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    )

    await queryInterface.addColumn(
      'Asanas', // table name
      'groupForGenerating', // new field name
      {
        type: Sequelize.STRING
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Asanas', 'isAsymmetrical')
    await queryInterface.removeColumn('Asanas', 'groupForGenerating')
  }
}
