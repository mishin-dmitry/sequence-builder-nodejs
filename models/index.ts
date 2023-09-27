import { Sequelize, DataTypes } from "sequelize";
import process from "process";

const env = process.env.NODE_ENV || "development";
const dbConfig = require("../config/config.js")[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
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

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.asanas = require("./asana-model")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done");
});

export default db;
