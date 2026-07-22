import { Sequelize } from "sequelize";
import type createAsanaModel from "./asanas-sequence-builder/asana.model";
import type createAsanasGroupModel from "./asanas-sequence-builder/asanas-group.model";
import type createAsanaByGroupModel from "./asanas-sequence-builder/asana-by-group.model";
import type createUserModel from "./user.model";
import type createSequenceModel from "./asanas-sequence-builder/sequence.model";
import type createBlockModel from "./asanas-sequence-builder/block.model";
import type createBlockAsanaModel from "./asanas-sequence-builder/block-asana.model";
import type createTokenModel from "./token.model";
import type createFeedbackModel from "./feedback.model";
import type createBunchModel from "./asanas-sequence-builder/bunch.model";
import type createBunchAsanaModel from "./asanas-sequence-builder/bunch-asana.model";
import type createAsanasGroupsCategoryModel from "./asanas-sequence-builder/asana-group-category.model";
import type createSequenceViewModel from "../views/sequence.view";
import type createPranayamaSequenceModel from "./pranayamas-sequence-builder/pranayama-sequence.model";
import type createPranayamaStepModel from "./pranayamas-sequence-builder/pranayama-step.model";

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
  pranayamaSequences: ReturnType<typeof createPranayamaSequenceModel>;
  pranayamaSteps: ReturnType<typeof createPranayamaStepModel>;
}
