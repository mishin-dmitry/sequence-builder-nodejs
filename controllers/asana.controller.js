const { getAsanasFromCache, isAsanasCacheEmpty } = require("../cache");
const db = require("../models");

// Основная модель
const Asana = db.asanas;
const AsanaByGroup = db.asanaByGroups;
const Pirs = db.pirs;

// Создание асаны
const createAsana = async (req, res) => {
  const { groups = [], pirs = [], ...restBody } = req.body;

  const asana = await Asana.create(restBody);

  await Promise.all([
    AsanaByGroup.bulkCreate(
      groups.map((groupId) => ({ asanaId: asana.id, groupId }))
    ),
    Pirs.bulkCreate(pirs.map((pirId) => ({ asanaId: asana.id, pirId }))),
  ]);

  res.status(200).send(asana);
};

// Получить список асан
const getAllAsanas = async (_, res) => {
  let asanas = [];

  if (isAsanasCacheEmpty()) {
    asanas = await Asana.findAll({
      include: [
        "groups",
        {
          model: Pirs,
          as: "pirs",
          attributes: ["pirId", "title"],
        },
      ],
    });
  } else {
    asanas = Object.values(getAsanasFromCache());
  }

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

  const { groups = [], pirs = [], ...restBody } = req.body;

  await Promise.all([
    AsanaByGroup.destroy({ where: { asanaId: id } }),
    Pirs.destroy({ where: { asanaId: id } }),

    AsanaByGroup.bulkCreate(
      groups.map((groupId) => ({ asanaId: id, groupId }))
    ),

    Pirs.bulkCreate(pirs.map((pirId) => ({ asanaId: id, pirId }))),
  ]);

  const asana = await Asana.update(restBody, { where: { id } });

  // TODO 404
  res.status(200).send(asana);
};

// Удалить асану
const deleteAsana = async (req, res) => {
  const { id } = req.params;

  await Asana.destroy({ where: { id } });

  res.status(200).send({});
};

module.exports = {
  deleteAsana,
  updateAsana,
  getAsana,
  getAllAsanas,
  createAsana,
};
