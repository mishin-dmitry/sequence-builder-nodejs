import { Sequelize, DataTypes, Dialect } from "sequelize";
import { Db } from "./types";

import createAsanaModel from "./asana.model";
import createAsanasGroupModel from "./asanas-group.model";
import createAsanaByGroupModel from "./asana-by-group.model";
import createUserModel from "./user.model";
import createSequenceModel from "./sequence.model";
import createBlockModel from "./block.model";
import createBlockAsanaModel from "./block-asana.model";
import createTokenModel from "./token.model";
import createFeedbackModel from "./feedback.model";
import createBunchModel from "./bunch.model";
import createBunchAsanaModel from "./bunch-asana.model";
import createAsanasGroupsCategoryModel from "./asana-group-category.model";
import createSequenceViewModel from "../views/sequence.view";

interface DbConfig {
  database: string;
  username: string;
  password?: string;
  host: string;
  dialect: Dialect;
  port?: number | string;
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}

const env = process.env.NODE_ENV || "development";
const dbConfig = require("../config/config.js")[env] as DbConfig;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port ? Number(dbConfig.port) : undefined,
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

const db: Db = {
  Sequelize,
  sequelize,
  asanas: createAsanaModel(sequelize, DataTypes),
  asanasGroups: createAsanasGroupModel(sequelize, DataTypes),
  asanaByGroups: createAsanaByGroupModel(sequelize, DataTypes),
  users: createUserModel(sequelize, DataTypes),
  sequences: createSequenceModel(sequelize, DataTypes),
  blocks: createBlockModel(sequelize, DataTypes),
  blockAsanas: createBlockAsanaModel(sequelize, DataTypes),
  tokens: createTokenModel(sequelize, DataTypes),
  feedbacks: createFeedbackModel(sequelize, DataTypes),
  bunches: createBunchModel(sequelize, DataTypes),
  bunchAsanas: createBunchAsanaModel(sequelize, DataTypes),
  asanasGroupsCategories: createAsanasGroupsCategoryModel(sequelize, DataTypes),
  sequenceView: createSequenceViewModel(sequelize, DataTypes),
};

db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done");
});

Object.values(db).forEach((entry) => {
  if ("associate" in entry && typeof entry.associate === "function") {
    entry.associate(db);
  }
});

(async () => {
  await sequelize.sync();
})();

export = db;
