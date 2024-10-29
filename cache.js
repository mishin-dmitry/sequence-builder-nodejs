const db = require("./models");

const Asanas = db.asanas;
const Pirs = db.pirs;
const ContinuingAsana = db.continuingAsanas;
const AsanaGroups = db.asanasGroups
const AsanaByGroups = db.asanaByGroups

let asanasCache = {};

const getAsanasFromCache = () => Object.freeze(asanasCache);

const updateAsanaInCache = (asana) => {
  asanasCache = {...asanasCache, [asana.id]: asana};
};

const updateAsanasCache = async () => {
  try {
    const asanas = await Asanas.findAll({
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
          attributes: ['continuingAsanaId']
        }
      ],
    });

    const asanasMap = {};

    for (let i = 0; i < asanas.length; i++) {
      const asana = asanas[i];

      asanasMap[asana.id] = {
        ...asana.get({ plain: true }),
        pirs: asana.pirs.map(({pirId}) => pirId),
        continuingAsanas: asana.continuingAsanas.map(({continuingAsanaId}) => continuingAsanaId)
      };
    }

    asanasCache = {...asanasMap};
  } catch (e) {
    console.error(e);
    asanasCache = {};
  }
};

const isAsanasCacheEmpty = () => !Object.keys(asanasCache).length;

module.exports = { getAsanasFromCache, updateAsanasCache, isAsanasCacheEmpty, updateAsanaInCache };
