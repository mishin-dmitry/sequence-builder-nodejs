"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("AsanaByGroups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      asanaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Asanas", key: "id" },
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "AsanasGroups", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("AsanaByGroups");
  },
};
