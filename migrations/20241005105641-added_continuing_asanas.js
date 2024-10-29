'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ContinuingAsanas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      asanaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Asanas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      continuingAsanaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Asanas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ContinuingAsanas');
  },
};
