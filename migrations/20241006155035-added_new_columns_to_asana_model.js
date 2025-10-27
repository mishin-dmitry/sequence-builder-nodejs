'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Asanas', // table name
      'canBeGenerated', // new field name
      {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }
    )

    await queryInterface.addColumn(
      'Asanas', // table name
      'canBeStartOfSequence', // new field name
      {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Asanas', 'canBeGenerated')
    await queryInterface.removeColumn('Asanas', 'canBeStartOfSequence')
  }
}
