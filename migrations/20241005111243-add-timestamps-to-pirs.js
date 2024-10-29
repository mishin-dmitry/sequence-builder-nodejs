'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Pirs', 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'), // Установка текущей даты как значение по умолчанию
        });
        await queryInterface.addColumn('Pirs', 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Pirs', 'createdAt');
        await queryInterface.removeColumn('Pirs', 'updatedAt');
    }
};
