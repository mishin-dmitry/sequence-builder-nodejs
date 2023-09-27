const { Sequelize, DataTypes } = require("sequelize");
const process = require("process");

const env = process.env.NODE_ENV || "development";
const dbConfig = require("../config/config.js")[env];

console.log(dbConfig, dbConfig);

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

db.asanas = require("./asana")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done");
});

module.exports = db;
