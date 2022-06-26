import type { NextFunction, Request, Response } from 'express';
import { createUser } from './createUser';
import { getUser } from './getUser';

export const postUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const uid = await createUser(email);

    res.json({ uid });
  } catch (err) {
    next(err);
  }
};

export const getUserController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { params } = req;
    const { email } = params;

    const uid = await getUser(email);

    res.json({ uid });
  } catch (err) {
    next(err)
  }
};
