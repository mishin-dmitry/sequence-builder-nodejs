import { Request, Response } from "express";
import db from "../models";

const Feedback = db.feedbacks;

const createFeedback = async (req: Request, res: Response) => {
  const feedback = await Feedback.create(req.body);

  res.status(200).send(feedback);
};

export { createFeedback };
