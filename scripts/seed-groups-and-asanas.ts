import fs from "fs";
import path from "path";
import db from "../models";

interface GroupSeed {
  id: number;
  alias: string;
  name: string;
}

interface AsanaSeed {
  id: number;
  alias: string;
  name: string;
  categories?: string[];
  searchKeys?: string;
}

const groups: GroupSeed[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../groups.json"), "utf8")
);
const asanas: AsanaSeed[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../asanas.json"), "utf8")
);

const resetSequence = async (table: string) => {
  await db.sequelize.query(
    `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), (SELECT COALESCE(MAX(id), 1) FROM "${table}"))`
  );
};

const run = async () => {
  // Пересоздаём с нуля, чтобы скрипт можно было безопасно перезапускать.
  await db.sequelize.query(
    'TRUNCATE TABLE "AsanaByGroups", "Asanas", "AsanasGroups" RESTART IDENTITY CASCADE'
  );

  await db.asanasGroups.bulkCreate(groups, { validate: true });
  await resetSequence("AsanasGroups");
  console.log(`Добавлено групп: ${groups.length}`);

  await db.asanas.bulkCreate(
    asanas.map(({ id, alias, name, searchKeys }) => ({ id, alias, name, searchKeys })),
    { validate: true }
  );
  await resetSequence("Asanas");
  console.log(`Добавлено асан: ${asanas.length}`);

  const groupIdByAlias = new Map(groups.map((group) => [group.alias, group.id]));

  const asanaByGroupRows: { asanaId: number; groupId: number }[] = [];
  const unknownCategoryAliases = new Set<string>();

  for (const asana of asanas) {
    for (const categoryAlias of asana.categories ?? []) {
      const groupId = groupIdByAlias.get(categoryAlias);

      if (groupId === undefined) {
        unknownCategoryAliases.add(categoryAlias);
        continue;
      }

      asanaByGroupRows.push({ asanaId: asana.id, groupId });
    }
  }

  if (unknownCategoryAliases.size) {
    console.warn(
      "Не найдены группы для алиасов (проверьте groups.json на опечатки):",
      [...unknownCategoryAliases].join(", ")
    );
  }

  await db.asanaByGroups.bulkCreate(asanaByGroupRows, { validate: true });
  console.log(`Добавлено связей асана-группа: ${asanaByGroupRows.length}`);

  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
