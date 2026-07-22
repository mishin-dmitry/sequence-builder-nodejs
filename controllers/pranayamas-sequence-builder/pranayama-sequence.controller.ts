import { Request, Response } from "express";
import db from "../../models";

const PranayamaSequence = db.pranayamaSequences;
const PranayamaStep = db.pranayamaSteps;

interface StepInput {
  name: string;
  description?: string | null;
  mode: "timer" | "metronome";
  durationMode: "time" | "cycles";
  timerSeconds: number;
  cycleCount: number;
  rhythm?: string | null;
}

const getPranayamaSequenceWithSteps = async (id: string | number) => {
  const sequence = await PranayamaSequence.findByPk(id, {
    include: [
      {
        model: PranayamaStep,
        as: "steps",
      },
    ],
    order: [[{ model: PranayamaStep, as: "steps" }, "position", "ASC"]],
  });

  return sequence;
};

const replaceSteps = async (sequenceId: number, steps: StepInput[]) => {
  await PranayamaStep.destroy({ where: { sequenceId } });

  if (steps.length) {
    await PranayamaStep.bulkCreate(
      steps.map((step, index) => ({
        sequenceId,
        position: index,
        name: step.name,
        description: step.description ?? null,
        mode: step.mode,
        durationMode: step.durationMode,
        timerSeconds: step.timerSeconds,
        cycleCount: step.cycleCount,
        rhythm: step.rhythm ?? null,
      })),
      { validate: true }
    );
  }
};

// Создание последовательности пранаямы
const createPranayamaSequence = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(403).send({});
  }

  const { name, description = null, steps = [] } = req.body;

  const sequence = await PranayamaSequence.create({
    name,
    description,
    userId: req.userId as number,
  });

  await replaceSteps(sequence.id, steps);

  const result = await getPranayamaSequenceWithSteps(sequence.id);

  res.status(200).send(result);
};

const getPranayamaSequence = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req;

  if (!userId) {
    return res.status(403).send({});
  }

  const sequence = await getPranayamaSequenceWithSteps(id);

  if (!sequence) {
    return res.status(200).send({ isFound: false });
  }

  if (sequence.userId !== userId) {
    return res.status(403).send({});
  }

  return res.status(200).send(sequence);
};

const updatePranayamaSequence = async (req: Request, res: Response) => {
  const { userId } = req;
  const { id } = req.params;
  const { steps = [], ...restBody } = req.body;

  if (!userId) {
    return res.status(403).send({});
  }

  const sequence = await PranayamaSequence.findByPk(id);

  if (!sequence) {
    return res.status(200).send({ isFound: false });
  }

  if (userId !== sequence.userId) {
    return res.status(403).send({});
  }

  await sequence.update(restBody);
  await replaceSteps(sequence.id, steps);

  const updatedSequence = await getPranayamaSequenceWithSteps(id);

  return res.status(200).send(updatedSequence);
};

const deletePranayamaSequence = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req;

  if (!userId) {
    return res.status(403).send({});
  }

  const sequence = await PranayamaSequence.findByPk(id);

  if (!sequence) {
    return res.status(200).send({ isFound: false });
  }

  if (userId !== sequence.userId) {
    return res.status(403).send({});
  }

  await sequence.destroy();

  return res.status(200).send({});
};

const getUserPranayamaSequences = async (req: Request, res: Response) => {
  const { userId } = req;

  if (!userId) {
    return res.status(200).send([]);
  }

  const result = await PranayamaSequence.findAll({
    where: { userId },
  });

  return res.status(200).send(result);
};

export {
  createPranayamaSequence,
  getPranayamaSequence,
  updatePranayamaSequence,
  deletePranayamaSequence,
  getUserPranayamaSequences,
};
