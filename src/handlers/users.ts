import type { NextFunction, Request, Response } from 'express';
import { createUser } from '../users/createUser';
import { getUser } from '../users/getUser';

export const postUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const token = await createUser(email);

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const getUserController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { params } = req;
    const { email } = params;

    const token = await getUser(email);

    res.json({ token });
  } catch (err) {
    next(err)
  }
};
