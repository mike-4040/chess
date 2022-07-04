import type { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { findUserById } from '../users/dataStore';
import { UserError } from './error';

// a very naive auth implementation: uid as bearer token :)
export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UserError('Missing authorization header.');
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      throw new UserError('Missing authorization token.');
    }

    if (!ObjectId.isValid(token)){
       throw new UserError('Invalid authorization token.');
    }

    const user = await findUserById(token);

    if (!user) {
      throw new UserError('Not authorized');
    }

    Object.assign(req, { uid: token });
    next();
  } catch (err) {
    const message = (err as any)?.message;
    res.status(401).send(`Not Authorized${message ? `: ${message}` : '.'}`);
  }
}
