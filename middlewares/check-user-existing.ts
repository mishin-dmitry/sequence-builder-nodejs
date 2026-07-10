import { Request, Response, NextFunction } from "express";
import db from "../models";

const User = db.users;

const checkUserExisting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return next();
    }

    const user = await User.findOne({
      where: { id: req.userId },
    });

    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

export { checkUserExisting };
