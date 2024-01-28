const db = require("./models");

const Asanas = db.asanas;
const Pirs = db.pirs;

let asanasCache = {};

const getAsanasFromCache = () => Object.freeze(asanasCache);

const updateAsanasCache = async () => {
  try {
    const asanas = await Asanas.findAll({
      include: [
        "groups",
        {
          model: Pirs,
          as: "pirs",
          attributes: ["pirId", "title"],
        },
      ],
    });

    const asanasMap = {};

    for (let i = 0; i < asanas.length; i++) {
      const asana = asanas[i];

      asanasMap[asana.id] = asana;
    }

    asanasCache = Object.freeze(asanasMap);
  } catch (e) {
    console.error(e);
    asanasCache = Object.freeze({});
  }
};

const isAsanasCacheEmpty = () => !Object.keys(asanasCache).length;

module.exports = { getAsanasFromCache, updateAsanasCache, isAsanasCacheEmpty };
