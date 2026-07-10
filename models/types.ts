import { Sequelize } from "sequelize";
import type createAsanaModel from "./asana.model";
import type createAsanasGroupModel from "./asanas-group.model";
import type createAsanaByGroupModel from "./asana-by-group.model";
import type createUserModel from "./user.model";
import type createSequenceModel from "./sequence.model";
import type createBlockModel from "./block.model";
import type createBlockAsanaModel from "./block-asana.model";
import type createTokenModel from "./token.model";
import type createFeedbackModel from "./feedback.model";
import type createBunchModel from "./bunch.model";
import type createBunchAsanaModel from "./bunch-asana.model";
import type createAsanasGroupsCategoryModel from "./asana-group-category.model";
import type createSequenceViewModel from "../views/sequence.view";

export interface Db {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  asanas: ReturnType<typeof createAsanaModel>;
  asanasGroups: ReturnType<typeof createAsanasGroupModel>;
  asanaByGroups: ReturnType<typeof createAsanaByGroupModel>;
  users: ReturnType<typeof createUserModel>;
  sequences: ReturnType<typeof createSequenceModel>;
  blocks: ReturnType<typeof createBlockModel>;
  blockAsanas: ReturnType<typeof createBlockAsanaModel>;
  tokens: ReturnType<typeof createTokenModel>;
  feedbacks: ReturnType<typeof createFeedbackModel>;
  bunches: ReturnType<typeof createBunchModel>;
  bunchAsanas: ReturnType<typeof createBunchAsanaModel>;
  asanasGroupsCategories: ReturnType<typeof createAsanasGroupsCategoryModel>;
  sequenceView: ReturnType<typeof createSequenceViewModel>;
}
