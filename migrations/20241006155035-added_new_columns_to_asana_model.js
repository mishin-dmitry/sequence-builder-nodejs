"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "Asanas", // table name
      "canBeGenerated", // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Asanas", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }
    )

    await queryInterface.addColumn(
      "Asanas", // table name
      "canBeStartOfSequence", // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Asanas", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "canBeGenerated")
    await queryInterface.removeColumn("Users", "canBeStartOfSequence")
  }
};
