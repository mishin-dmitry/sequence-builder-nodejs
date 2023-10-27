const db = require("../models");

// Основная модель
const Sequence = db.sequences;
const Block = db.blocks;
const BlockAsanas = db.blockAsanas;
const Asanas = db.asanas;

// Создание последовательности
const createSequence = async (req, res) => {
  // TODO если не зареган выходить

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
  });

  for (const block of blocks) {
    const blockInstance = await Block.create({ sequenceId: sequence.id });

    await BlockAsanas.bulkCreate(
      block.map(({ asanaId, inRepeatingBlock = false }) => ({
        blockId: blockInstance.id,
        asanaId,
        inRepeatingBlock,
      }))
    );
  }

  let result;

  try {
    result = await Sequence.findByPk(sequence.id, {
      include: {
        model: Block,
        as: "blocks",
        attributes: ["id"],
        include: {
          model: Asanas,
          attributes: ["id", "alias"],
          as: "asanas",
        },
      },
    });
  } catch (error) {
    console.log(error);
  }

  console.log("AFTER RESPOINSE");

  res.status(200).send(result);
};

module.exports = { createSequence };
