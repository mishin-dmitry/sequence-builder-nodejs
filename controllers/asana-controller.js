const db = require("../models");

// Основная модель
const Asana = db.asanas;
const AsanaByGroup = db.asanaByGroups;

// Создание асаны
const createAsana = async (req, res) => {
  const { groups, ...restBody } = req.body;

  const asana = await Asana.create(restBody);

  await groups.forEach(async (groupId) => {
    await AsanaByGroup.create({ asanaId: asana.id, groupId });
  });

  res.status(200).send(asana);
};

// Получить список асан
const getAllAsanas = async (_, res) => {
  const asanas = await Asana.findAll({
    include: ["groups"],
  });

  res.status(200).send(asanas);
};

// Получить асану
const getAsana = async (req, res) => {
  const { id } = req.params;

  const asana = await Asana.findOne({ where: { id } });

  if (asana) {
    res.status(200).send(asana);
  } else {
    res.status(404).send();
  }
};

// Обновить асану
const updateAsana = async (req, res) => {
  const { id } = req.params;

  const { groups, ...restBody } = req.body;

  await AsanaByGroup.destroy({ where: { asanaId: id } });

  await groups.forEach(async (groupId) => {
    try {
      const asanaGroup = await AsanaByGroup.findOne({
        where: { asanaId: id, groupId },
      });

      asanaGroup.update({ asanaId: id, groupId });
    } catch (error) {
      console.log(error);
      await AsanaByGroup.create({ asanaId: id, groupId });
    }
  });

  const asana = await Asana.update(restBody, { where: { id } });

  // TODO 404
  res.status(200).send(asana);
};

// Удалить асану
const deleteAsana = async (req, res) => {
  const { id } = req.params;

  await Asana.destroy({ where: { id } });

  res.status(200).send();
};

module.exports = {
  deleteAsana,
  updateAsana,
  getAsana,
  getAllAsanas,
  createAsana,
};
