const db = require("../models");

// Основная модель
const Asana = db.asanas;
const AsanaByGroup = db.asanaByGroups;
const Pirs = db.pirs;

// Создание асаны
const createAsana = async (req, res) => {
  const { groups = [], pirs = [], ...restBody } = req.body;

  const asana = await Asana.create(restBody);

  groups.forEach(async (groupId) => {
    await AsanaByGroup.create({ asanaId: asana.id, groupId });
  });

  pirs.forEach(async (pirId) => {
    await Pirs.create({ asanaId: asana.id, pirId });
  });

  res.status(200).send(asana);
};

// Получить список асан
const getAllAsanas = async (_, res) => {
  const asanas = await Asana.findAll({
    include: ["groups"],
  });

  const result = [];

  for (let i = 0; i < asanas.length; i++) {
    const currentAsana = asanas[i].get({ plain: true });

    const pirs =
      (await Pirs.findAll(
        { where: { asanaId: currentAsana.id } },
        { raw: true }
      )) ?? [];

    result.push({
      ...currentAsana,
      pirs: pirs.map(({ pirId }) => pirId),
    });
  }

  res.status(200).send(result);
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

  await AsanaByGroup.destroy({ where: { asanaId: id } });
  await Pirs.destroy({ where: { asanaId: id } });

  await groups.forEach(async (groupId) => {
    try {
      const asanaGroup = await AsanaByGroup.findOne({
        where: { asanaId: id, groupId },
      });

      asanaGroup.update({ asanaId: id, groupId });
    } catch (error) {
      await AsanaByGroup.create({ asanaId: id, groupId });
    }
  });

  await pirs.forEach(async (pirId) => {
    try {
      await Pirs.create({ asanaId: id, pirId });
    } catch {}
  });

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
