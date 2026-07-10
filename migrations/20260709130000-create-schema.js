"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      email: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.createTable("AsanasGroupsCategories", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.createTable("Asanas", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT("long") },
      alias: { type: Sequelize.STRING, allowNull: false },
      searchKeys: { type: Sequelize.TEXT },
      image: { type: Sequelize.STRING },
    });

    await queryInterface.createTable("Tokens", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      token: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.createTable("AsanasGroups", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      alias: { type: Sequelize.STRING, allowNull: false },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: "AsanasGroupsCategories", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });

    await queryInterface.createTable("AsanaByGroups", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      asanaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Asanas", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "AsanasGroups", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    await queryInterface.createTable("Sequences", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });

    await queryInterface.createTable("Blocks", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      sequenceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Sequences", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });

    await queryInterface.createTable("BlockAsanas", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      inRepeatingBlock: { type: Sequelize.BOOLEAN, allowNull: false },
      inDynamicBlock: { type: Sequelize.BOOLEAN, allowNull: false },
      asanaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Asanas", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      blockId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Blocks", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });

    await queryInterface.createTable("Bunches", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });

    await queryInterface.createTable("BunchAsanas", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      asanaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Asanas", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      bunchId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Bunches", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });

    await queryInterface.createTable("Feedbacks", {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      email: { type: Sequelize.STRING, allowNull: false },
      text: { type: Sequelize.TEXT("long"), allowNull: false },
      topic: { type: Sequelize.STRING, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Feedbacks");
    await queryInterface.dropTable("BunchAsanas");
    await queryInterface.dropTable("Bunches");
    await queryInterface.dropTable("BlockAsanas");
    await queryInterface.dropTable("Blocks");
    await queryInterface.dropTable("Sequences");
    await queryInterface.dropTable("AsanaByGroups");
    await queryInterface.dropTable("AsanasGroups");
    await queryInterface.dropTable("Tokens");
    await queryInterface.dropTable("Asanas");
    await queryInterface.dropTable("AsanasGroupsCategories");
    await queryInterface.dropTable("Users");
  },
};
