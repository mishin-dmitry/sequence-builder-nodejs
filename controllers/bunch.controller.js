const db = require("../models");

// Основная модель
const Bunch = db.bunches;
const BunchAsanas = db.bunchAsanas;
const Asanas = db.asanas;

const cache = {};

const getBunchAsanas = async ({ id, title }) => {
  const bunchAsanas = await BunchAsanas.findAll(
    {
      where: { bunchId: id },
    },
    { raw: true }
  );

  const asanas = [];

  for (let i = 0; i < bunchAsanas.length; i++) {
    const iterAsana = bunchAsanas[i];

    if (!cache[iterAsana.asanaId]) {
      const asana = await Asanas.findByPk(iterAsana.asanaId);

      cache[iterAsana.asanaId] = asana;

      asanas.push(asana);
    } else {
      asanas.push(cache[iterAsana.asanaId]);
    }
  }

  return {
    id,
    title,
    asanas,
  };
};

const getBunchById = async (bunchId) => {
  const bunch = await Bunch.findByPk(bunchId, {
    attributes: ["id", "title"],
    raw: true,
  });

  if (!bunch) return null;

  return getBunchAsanas(bunch);
};

// Создание связки асан
const createBunch = async (req, res) => {
  if (!req.user) {
    return res.status(403).send({});
  }

  const { asanas = [], ...restBody } = req.body;

  const bunch = await Bunch.create({ ...restBody, userId: req.userId });

  await BunchAsanas.bulkCreate(
    asanas.map((asanaId) => ({ bunchId: bunch.id, asanaId })),
    { ignoreDuplicates: true }
  );

  res.status(200).send(bunch);
};

// Получить связку асан
const getBunch = async (req, res) => {
  if (!req.user) {
    return res.status(403).send({});
  }

  const { id } = req.params;

  const bunchAsanas = await getBunchById(id);

  if (bunchAsanas) {
    res.status(200).send(bunchAsanas);
  } else {
    res.status(404).send({ isFound: false });
  }
};

// Обновить связку асану
const updateBunch = async (req, res) => {
  if (!req.user) {
    return res.status(403).send({});
  }

  const asanasBunch = await Bunch.findOne({
    where: { id: req.params.id, userId: req.userId },
  });

  if (!asanasBunch) {
    return res.status(404).send({ isFound: false });
  }

  const { id } = req.params;
  const { asanas = [], ...restBody } = req.body;

  await BunchAsanas.destroy({ where: { bunchId: asanasBunch.id } });

  await BunchAsanas.bulkCreate(
    asanas.map(
      (asanaId) => ({
        bunchId: asanasBunch.id,
        asanaId,
      }),
      { ignoreDuplicates: true }
    )
  );

  await asanasBunch.update(restBody, { where: { id } });

  res.status(200).send(asanasBunch);
};

// Удалить связку асан
const deleteBunch = async (req, res) => {
  const { id } = req.params;

  await Bunch.destroy({ where: { id } });

  res.status(200).send({});
};

const getUserAsanaBunches = async (req, res) => {
  const { userId } = req;

  if (!userId) {
    return res.status(403).send([]);
  }

  const bunches = await Bunch.findAll({
    where: {
      userId,
    },
    attributes: ["id", "title"],
  });

  const result = [];

  for (let i = 0; i < bunches.length; i++) {
    const currentBunch = bunches[i];

    const bunch = await getBunchAsanas(currentBunch);

    result.push(bunch);
  }

  return res.status(200).send(result);
};

module.exports = {
  deleteBunch,
  updateBunch,
  getBunch,
  createBunch,
  getUserAsanaBunches,
};
