const { getAsanasFromCache } = require("../cache");

const db = require("../models");

// Основная модель
const Sequence = db.sequences;
const Block = db.blocks;
const BlockAsanas = db.blockAsanas;
const Asanas = db.asanas;
const SequenceView = db.sequenceView;

const collectSequenceInfoById = async (id, userId) => {
  // Найдем вьюшку последовательности
  const sequence = await SequenceView.findAll({ where: { id } });

  if (!sequence) return null;
  if (!sequence.length) return [];
  if (sequence[0].userId !== userId) return null;

  let currentBlockId = null;
  let blocks = [];
  let currentBlock = [];

  const asanasCache = getAsanasFromCache();

  for (let i = 0; i < sequence.length; i++) {
    const element = sequence[i];

    let currentAsana = null;

    if (asanasCache[element.asanaId]) {
      currentAsana = asanasCache[element.asanaId];
    } else {
      currentAsana = await Asanas.findByPk(element.asanaId);
    }

    currentAsana = {
      ...currentAsana,
      inRepeatingBlock: element.inRepeatingBlock,
      inDynamicBlock: element.inDynamicBlock,
    };

    if (currentBlockId !== element.blockId) {
      currentBlockId = element.blockId;

      if (currentBlock.length) {
        blocks.push(currentBlock);
        currentBlock = [currentAsana];
      } else {
        currentBlock.push(currentAsana);
      }
    } else {
      currentBlock.push(currentAsana);
    }

    if (i === sequence.length - 1) {
      blocks.push(currentBlock);
    }
  }

  return {
    id,
    title: sequence[0].title,
    description: sequence[0].description,
    blocks,
    userId,
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

  const result = await collectSequenceInfoById(sequence.id, sequence.userId);

  res.status(200).send(result);
};

const getSequence = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  const sequence = await collectSequenceInfoById(id, userId);

  if (!sequence) {
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

  const updatedSequence = await collectSequenceInfoById(id, userId);

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
