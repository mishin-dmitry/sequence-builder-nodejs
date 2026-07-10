"use strict";

// SequenceView существовал в проде как ручной SQL VIEW, но его определение
// нигде не сохранилось (не было ни в миграциях, ни в бэкапе). Этот SQL
// реконструирован по колонкам из views/sequence.view.ts и логике чтения в
// sequence.controller.ts (collectSequenceInfoById).

const CREATE_VIEW_SQL = `
  CREATE VIEW "SequenceView" AS
  SELECT
    s.id AS "id",
    s."userId" AS "userId",
    s.title AS "title",
    s.description AS "description",
    a.name AS "name",
    a.alias AS "alias",
    a."searchKeys" AS "searchKeys",
    b.id AS "blockId",
    a.id AS "asanaId",
    ba."inRepeatingBlock" AS "inRepeatingBlock",
    ba."inDynamicBlock" AS "inDynamicBlock"
  FROM "Sequences" s
  JOIN "Blocks" b ON b."sequenceId" = s.id
  JOIN "BlockAsanas" ba ON ba."blockId" = b.id
  JOIN "Asanas" a ON a.id = ba."asanaId"
  ORDER BY b.id, ba.id
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(CREATE_VIEW_SQL);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS "SequenceView"');
  },
};
