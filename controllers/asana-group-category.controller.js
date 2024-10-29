const db = require("../models");

// Основная модель
const AsanasGroupsCategories = db.asanasGroupsCategories;
const AsanaGroups = db.asanasGroups

// Создание категории
const createAsanasGroupsCategory = async (req, res) => {
  const asana = await AsanasGroupsCategories.create(req.body);

  res.status(200).send(asana);
};

// Получить категории
const getAllAsanasGroupsCategories = async (_, res) => {
  const categories = await AsanasGroupsCategories.findAll({attributes: ['id', 'name'], include: {
    model: AsanaGroups,
    as: 'groups',
    attributes: ['id', 'name', 'categoryId'],
  }});

  res.status(200).send(categories);
};

// Получить группу
const getAsanasGroupsCategory = async (req, res) => {
  const { id } = req.params;

  const category = await AsanasGroupsCategories.findOne({ where: { id } });

  if (category) {
    res.status(200).send(category);
  } else {
    res.status(404).send();
  }
};

// Обновить категорию
const updateAsanasGroupsCategory = async (req, res) => {
  const { id } = req.params;

  const asana = await AsanasGroupsCategories.update(req.body, { where: { id } });

  // TODO 404
  res.status(200).send(asana);
};

// Удалить группу
const deleteAsanasGroupsCategory = async (req, res) => {
  const { id } = req.params;

  await AsanasGroupsCategories.destroy({ where: { id } });

  res.status(200).send({});
};

module.exports = {
  deleteAsanasGroupsCategory,
  updateAsanasGroupsCategory,
  getAsanasGroupsCategory,
  getAllAsanasGroupsCategories,
  createAsanasGroupsCategory,
};
