const { Sequelize, DataTypes } = require("sequelize");
const process = require("process");

const env = process.env.NODE_ENV || "development";
const dbConfig = require("../config/config.js")[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("sequelize connected");
  })
  .catch((error) => {
    console.log("Error " + error);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.asanas = require("./asana.model.js")(sequelize, DataTypes);
db.asanasGroups = require("./asanas-group.model.js")(sequelize, DataTypes);
db.asanaByGroups = require("./asana-by-group.model.js")(sequelize, DataTypes);
db.users = require("./user.model.js")(sequelize, DataTypes);
db.sequences = require("./sequence.model.js")(sequelize, DataTypes);
db.blocks = require("./block.model.js")(sequelize, DataTypes);
db.blockAsanas = require("./block-asana.model.js")(sequelize, DataTypes);
db.tokens = require("./token.model.js")(sequelize, DataTypes);
db.feedbacks = require("./feedback.model.js")(sequelize, DataTypes);
db.pirs = require("./pirs.model.js")(sequelize, DataTypes);
db.bunches = require("./bunch.model.js")(sequelize, DataTypes);
db.bunchAsanas = require("./bunch-asana.model.js")(sequelize, DataTypes);
db.continuingAsanas = require("./continuing-asana.model.js")(sequelize, DataTypes);
db.asanasGroupsCategories = require("./asana-group-category.model.js")(sequelize, DataTypes);
db.sequenceView = require("../views/sequence.view.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done");
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

(async () => {
  await sequelize.sync();
})();

module.exports = db;
