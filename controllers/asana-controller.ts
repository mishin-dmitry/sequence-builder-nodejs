import { Response, Request } from "express";
import db from "../models";

// Основная модель
const Asana = db.asanas;

// Создание асаны
export const createAsana = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = {
    ...req.body,
    image: `images/${req.file?.filename}`,
  };

  const asana = await Asana.create(data);

  res.status(200).send(asana);
};

// Получить список асан
export const getAllAsanas = async (
  _: Request,
  res: Response
): Promise<void> => {
  const asanas = await Asana.findAll({});

  res.status(200).send(asanas);
};

// Получить асану
export const getAsana = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const asana = await Asana.findOne({ where: { id } });

  if (asana) {
    res.status(200).send(asana);
  } else {
    res.status(404);
  }
};

// Обновить асану
export const updateAsana = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const data = {
    ...req.body,
    image: `images/${req.file?.filename}`,
  };

  const asana = await Asana.update(data, { where: { id } });

  // TODO 404
  res.status(200).send(asana);
};

// Удалить асану
export const deleteAsana = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  await Asana.destroy({ where: { id } });

  res.status(200);
};
