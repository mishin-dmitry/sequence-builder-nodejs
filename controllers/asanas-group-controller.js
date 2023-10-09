const db = require("../models");

// Основная модель
const AsanasGroup = db.asanasGroups;

// Создание группы асан
const createAsanasGroup = async (req, res) => {
  const asana = await AsanasGroup.create(req.body);

  res.status(200).send(asana);
};

// Получить список групп
const getAllAsanasGroups = async (_, res) => {
  const asanas = await AsanasGroup.findAll({});

  res.status(200).send(asanas);
};

// Получить группу
const getAsanasGroup = async (req, res) => {
  const { id } = req.params;

  const asana = await AsanasGroup.findOne({ where: { id } });

  if (asana) {
    res.status(200).send(asana);
  } else {
    res.status(404).send();
  }
};

// Обновить группу
const updateAsanasGroup = async (req, res) => {
  const { id } = req.params;

  const asana = await AsanasGroup.update(req.body, { where: { id } });

  // TODO 404
  res.status(200).send(asana);
};

// Удалить группу
const deleteAsanasGroup = async (req, res) => {
  const { id } = req.params;

  await AsanasGroup.destroy({ where: { id } });

  res.status(200).send();
};

module.exports = {
  deleteAsanasGroup,
  updateAsanasGroup,
  getAsanasGroup,
  getAllAsanasGroups,
  createAsanasGroup,
};
