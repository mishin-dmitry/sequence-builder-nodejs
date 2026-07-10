import { Request, Response } from "express";
import db from "../models";

const Bunch = db.bunches;
const BunchAsanas = db.bunchAsanas;
const Asanas = db.asanas;

const cache: Record<number, InstanceType<typeof Asanas> | null> = {};

const getBunchAsanas = async ({
  id,
  title,
}: {
  id: number;
  title: string | null;
}) => {
  const bunchAsanas = await BunchAsanas.findAll({
    where: { bunchId: id },
  });

  const asanas = [];

  for (let i = 0; i < bunchAsanas.length; i++) {
    const iterAsana = bunchAsanas[i];

    if (!cache[iterAsana.asanaId]) {
      const asana = await Asanas.findByPk(iterAsana.asanaId);

      cache[iterAsana.asanaId] = asana;

      asanas.push(asana);
    } else {
      asanas.push(cache[iterAsana.asanaId]);
    }
  }

  return {
    id,
    title,
    asanas,
  };
};

const getBunchById = async (bunchId: string | number, userId: number) => {
  const bunch = await Bunch.findOne({
    where: { id: bunchId, userId },
    attributes: ["id", "title"],
    raw: true,
  });

  if (!bunch) return null;

  return getBunchAsanas(bunch);
};

// Создание связки асан
const createBunch = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(403).send({});
  }

  const { asanas = [], ...restBody } = req.body;

  const bunch = await Bunch.create({ ...restBody, userId: req.userId });

  await BunchAsanas.bulkCreate(
    asanas.map((asanaId: number) => ({ bunchId: bunch.id, asanaId })),
    { ignoreDuplicates: true }
  );

  res.status(200).send(bunch);
};

// Получить связку асан
const getBunch = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(403).send({});
  }

  const { id } = req.params;

  const bunchAsanas = await getBunchById(id, req.userId as number);

  if (bunchAsanas) {
    res.status(200).send(bunchAsanas);
  } else {
    res.status(404).send({ isFound: false });
  }
};

// Обновить связку асану
const updateBunch = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(403).send({});
  }

  const asanasBunch = await Bunch.findOne({
    where: { id: req.params.id, userId: req.userId as number },
  });

  if (!asanasBunch) {
    return res.status(404).send({ isFound: false });
  }

  const { asanas = [], title } = req.body;

  await BunchAsanas.destroy({ where: { bunchId: asanasBunch.id } });

  await BunchAsanas.bulkCreate(
    asanas.map((asanaId: number) => ({
      bunchId: asanasBunch.id,
      asanaId,
    })),
    { ignoreDuplicates: true }
  );

  await asanasBunch.update({ title });

  res.status(200).send(asanasBunch);
};

// Удалить связку асан
const deleteBunch = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(403).send({});
  }

  const { id } = req.params;

  await Bunch.destroy({ where: { id, userId: req.userId as number } });

  res.status(200).send({});
};

const getUserAsanaBunches = async (req: Request, res: Response) => {
  const { userId } = req;

  if (!userId) {
    return res.status(403).send([]);
  }

  const bunches = await Bunch.findAll({
    where: {
      userId,
    },
    attributes: ["id", "title"],
  });

  const result = [];

  for (let i = 0; i < bunches.length; i++) {
    const currentBunch = bunches[i];

    const bunch = await getBunchAsanas(currentBunch);

    result.push(bunch);
  }

  return res.status(200).send(result);
};

export { deleteBunch, updateBunch, getBunch, createBunch, getUserAsanaBunches };
