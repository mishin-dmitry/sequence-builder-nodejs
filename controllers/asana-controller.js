const db = require("../models");

// Основная модель
const Asana = db.asanas;

// Создание асаны
const createAsana = async (req, res) => {
  const asana = await Asana.create(req.body);

  res.status(200).send(asana);
};

// Получить список асан
const getAllAsanas = async (_, res) => {
  const asanas = await Asana.findAll({});

  res.status(200).send(asanas);
};

// Получить асану
const getAsana = async (req, res) => {
  const { id } = req.params;

  const asana = await Asana.findOne({ where: { id } });

  if (asana) {
    res.status(200).send(asana);
  } else {
    res.status(404);
  }
};

// Обновить асану
const updateAsana = async (req, res) => {
  const { id } = req.params;

  const asana = await Asana.update(req.body, { where: { id } });

  // TODO 404
  res.status(200).send(asana);
};

// Удалить асану
const deleteAsana = async (req, res) => {
  const { id } = req.params;

  await Asana.destroy({ where: { id } });

  res.status(200);
};

module.exports = {
  deleteAsana,
  updateAsana,
  getAsana,
  getAllAsanas,
  createAsana,
};
