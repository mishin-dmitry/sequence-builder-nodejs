import { Request, Response } from "express";
import db from "../models";

const AsanasGroup = db.asanasGroups;

// Создание группы асан
const createAsanasGroup = async (req: Request, res: Response) => {
  const asana = await AsanasGroup.create(req.body);

  res.status(200).send(asana);
};

// Получить список групп
const getAllAsanasGroups = async (_req: Request, res: Response) => {
  const asanas = await AsanasGroup.findAll({});

  res.status(200).send(asanas);
};

// Получить группу
const getAsanasGroup = async (req: Request, res: Response) => {
  const { id } = req.params;

  const asana = await AsanasGroup.findOne({ where: { id } });

  if (asana) {
    res.status(200).send(asana);
  } else {
    res.status(404).send();
  }
};

// Обновить группу
const updateAsanasGroup = async (req: Request, res: Response) => {
  const { id } = req.params;

  const asana = await AsanasGroup.update(req.body, { where: { id } });

  // TODO 404
  res.status(200).send(asana);
};

// Удалить группу
const deleteAsanasGroup = async (req: Request, res: Response) => {
  const { id } = req.params;

  await AsanasGroup.destroy({ where: { id } });

  res.status(200).send({});
};

export {
  deleteAsanasGroup,
  updateAsanasGroup,
  getAsanasGroup,
  getAllAsanasGroups,
  createAsanasGroup,
};
