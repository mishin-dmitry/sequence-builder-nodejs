const db = require("../models");

// Основная модель
const Sequence = db.sequences;
const Block = db.blocks;
const BlockAsanas = db.blockAsanas;
const Asanas = db.asanas;

const collectSequenceInfoById = async (id) => {
  // Найдем модель последовательности
  const sequence = await Sequence.findByPk(id, { raw: true });

  if (!sequence) return null;

  // Соберем все блоки
  const blocks = await Block.findAll({ where: { sequenceId: id }, raw: true });

  const resultBlocks = [];

  for (let i = 0; i < blocks.length; i++) {
    const currentBlock = blocks[i];

    // Найдем все асаны для текущего блока
    const blockAsanas = await BlockAsanas.findAll({
      where: { blockId: currentBlock.id },
      raw: true,
    });

    const currentBlockAsanas = [];

    // Соберем инфу о асанах
    for (let j = 0; j < blockAsanas.length; j++) {
      const { asanaId, inRepeatingBlock, inDynamicBlock } = blockAsanas[j];

      const asana = await Asanas.findByPk(asanaId);

      currentBlockAsanas.push({
        id: asana.id,
        alias: asana.alias,
        inRepeatingBlock: Boolean(inRepeatingBlock),
        inDynamicBlock: Boolean(inDynamicBlock),
      });
    }

    resultBlocks.push(currentBlockAsanas);
  }

  return {
    ...sequence,
    isPublic: Boolean(sequence.isPublic),
    blocks: resultBlocks,
  };
};

// Создание последовательности
const createSequence = async (req, res) => {
  if (!req.user) {
    return res.status(403).send({});
  }

  const {
    title = "",
    description = "",
    isPublic = false,
    blocks = [],
  } = req.body;

  const sequence = await Sequence.create({
    title,
    description,
    isPublic,
    userId: req.userId,
  });

  for (const block of blocks) {
    const blockInstance = await Block.create({ sequenceId: sequence.id });

    await BlockAsanas.bulkCreate(
      block.map(
        ({ asanaId, inRepeatingBlock = false, inDynamicBlock = false }) => ({
          blockId: blockInstance.id,
          asanaId,
          inRepeatingBlock,
          inDynamicBlock,
        })
      )
    );
  }

  const result = collectSequenceInfoById(sequence.id);

  res.status(200).send(result);
};

const getSequence = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  const sequence = await collectSequenceInfoById(id);

  if (!sequence) {
    return res.status(200).send({ isFound: false });
  }

  // Если последовательность не с открытым доступом
  // и не мы ее создатели то вернем 404
  if (!sequence.isPublic && userId !== sequence.userId) {
    return res.status(200).send({ isFound: false });
  }

  return res.status(200).send(sequence);
};

const deleteSequence = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  if (!userId) {
    return res.status(403).send({});
  }

  const sequence = await Sequence.findByPk(id);

  if (!sequence) {
    return res.status(200).send({ isFound: false });
  }

  if (userId !== sequence.userId) {
    return res.status(403).send({});
  }

  sequence.destroy();

  return res.status(200).send({});
};

const updateSequence = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const { blocks, ...restBody } = req.body;

  if (!userId) {
    return res.status(403).send({});
  }

  const sequence = await Sequence.findByPk(id);

  if (!sequence) {
    return res.status(200).send({ isFound: false });
  }

  if (userId !== sequence.userId) {
    return res.status(403).send({});
  }

  await sequence.update(restBody);

  await Block.destroy({
    where: {
      sequenceId: id,
    },
  });

  for (const block of blocks) {
    const blockInstance = await Block.create({ sequenceId: sequence.id });

    await BlockAsanas.bulkCreate(
      block.map(
        ({ asanaId, inRepeatingBlock = false, inDynamicBlock = false }) => ({
          blockId: blockInstance.id,
          asanaId,
          inRepeatingBlock,
          inDynamicBlock,
        })
      )
    );
  }

  await sequence.save();

  const updatedSequence = collectSequenceInfoById(id);

  return res.status(200).send(updatedSequence);
};

const getPublicSequences = async (req, res) => {
  const { userId } = req;

  if (!userId) {
    return res.status(200).send([]);
  }

  const result = await Sequence.findAll({
    where: {
      isPublic: true,
    },
    include: {
      model: Block,
      as: "blocks",
      attributes: ["id"],
      include: {
        model: Asanas,
        attributes: ["id", "alias"],
        as: "asanas",
        through: {
          attributes: ["inRepeatingBlock", "inDynamicBlock"],
          as: "options",
        },
      },
    },
  });

  return res.status(200).send(result);
};

const getUserSequences = async (req, res) => {
  const { userId } = req;

  if (!userId) {
    return res.status(200).send([]);
  }

  const result = await Sequence.findAll({
    where: {
      userId,
    },
    include: {
      model: Block,
      as: "blocks",
      attributes: ["id"],
      include: {
        model: Asanas,
        attributes: ["id", "alias"],
        as: "asanas",
        through: {
          attributes: ["inRepeatingBlock", "inDynamicBlock"],
          as: "options",
        },
      },
    },
  });

  return res.status(200).send(result);
};

module.exports = {
  createSequence,
  getSequence,
  deleteSequence,
  updateSequence,
  getPublicSequences,
  getUserSequences,
};
