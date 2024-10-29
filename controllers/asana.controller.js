const { getAsanasFromCache, isAsanasCacheEmpty, updateAsanaInCache } = require("../cache");
const db = require("../models");

// Основная модель
const Asana = db.asanas;
const AsanaByGroup = db.asanaByGroups;
const Pirs = db.pirs;
const ContinuingAsana = db.continuingAsanas;
const AsanaGroups = db.asanasGroups

// Создание асаны
const createAsana = async (req, res) => {
  const { groups = [], pirs = [], continuingAsanas = [], ...restBody } = req.body;

  const asana = await Asana.create(restBody);

  await Promise.all([
    AsanaByGroup.bulkCreate(
      groups.map((groupId) => ({ asanaId: asana.id, groupId }))
    ),

    ContinuingAsana.bulkCreate(
      continuingAsanas.map((continuingAsanaId) => ({ asanaId: asana.id, continuingAsanaId }))
    ),

    Pirs.bulkCreate(pirs.map((pirId) => ({ asanaId: asana.id, pirId }))),
  ]);

  if (!isAsanasCacheEmpty()) {
    const asanaModel = await Asana.findByPk(asana.id, {
      include: [
        {
          model: AsanaGroups,
          as: 'groups',
          attributes: ['id', 'name', 'categoryId'],
          through: { attributes: [] }
        },
        {
          model: Pirs,
          as: "pirs",
          attributes: ["pirId", "title"],
        },
        {
          model: ContinuingAsana,
          as: "continuingAsanas",
          attributes: ["continuingAsanaId"],
        }
      ],
    });

    updateAsanaInCache({...asanaModel.get({plain: true}), pirs: asanaModel.pirs.map(({pirId}) => pirId), continuingAsanas: asanaModel.continuingAsanas.map(({continuingAsanaId}) => continuingAsanaId)})
  }

  res.status(200).send(asana);
};

// Получить список асан
const getAllAsanas = async (_, res) => {
  let asanas = [];

  if (isAsanasCacheEmpty()) {
    const result = await Asana.findAll({
      include: [
        {
          model: AsanaGroups,
          as: 'groups',
          attributes: ['id', 'name', 'categoryId'],
          through: { attributes: [] }
        },
        {
          model: Pirs,
          as: "pirs",
          attributes: ["pirId", "title"],
        },
        {
          model: ContinuingAsana,
          as: "continuingAsanas",
          attributes: ["continuingAsanaId"],
        }
      ],
    });

    asanas = result.map((asana) => ({
      ...asana.get({ plain: true }),
      pirs: asana.pirs.map(({pirId}) => pirId),
      continuingAsanas: asana.continuingAsanas.map(({continuingAsanaId}) => continuingAsanaId)
    }))
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

  const { groups = [], pirs = [], continuingAsanas = [], ...restBody } = req.body;

  await Promise.all([
    AsanaByGroup.destroy({ where: { asanaId: id } }),
    ContinuingAsana.destroy({ where: { asanaId: id } }),

    Pirs.destroy({ where: { asanaId: id } }),

    AsanaByGroup.bulkCreate(
      groups.map((groupId) => ({ asanaId: id, groupId }))
    ),

    Pirs.bulkCreate(pirs.map((pirId) => ({ asanaId: id, pirId }))),

    ContinuingAsana.bulkCreate(
      continuingAsanas.map((continuingAsanaId) => ({ asanaId: id, continuingAsanaId }))
    )
  ]);

  const asana = await Asana.update(restBody, { where: { id } });

  if (!isAsanasCacheEmpty()) {
    const asanaModel = await Asana.findByPk(id, {
      include: [
        {
          model: AsanaGroups,
          as: 'groups',
          attributes: ['id', 'name', 'categoryId'],
          through: { attributes: [] }
        },
        {
          model: Pirs,
          as: "pirs",
          attributes: ["pirId", "title"],
        },
        {
          model: ContinuingAsana,
          as: "continuingAsanas",
          attributes: ["continuingAsanaId"],
        }
      ],
    });

    updateAsanaInCache({...asanaModel.get({plain: true}), pirs: asanaModel.pirs.map(({pirId}) => pirId), continuingAsanas: asanaModel.continuingAsanas.map(({continuingAsanaId}) => continuingAsanaId)})
  }

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
