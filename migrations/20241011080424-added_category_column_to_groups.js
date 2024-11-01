"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "AsanasGroups", // table name
      "categoryId", // new field name
      {
        type: Sequelize.INTEGER,
        references: { model: "AsanasGroupsCategories", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("AsanasGroups", "categoryId")
  }
};
