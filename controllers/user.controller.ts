import { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      req.user
        ? { id: req.user.id, email: req.user.email, isFound: true }
        : { isFound: false }
    );
};

export { getUser };
