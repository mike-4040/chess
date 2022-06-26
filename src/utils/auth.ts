import type { NextFunction, Request, Response } from 'express';
import { getUser } from '../users/getUser';
import { UserError } from './error';

// a very naive auth implementation: email as bearer token :)
export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UserError('Missing authorization header.');
    }

    const [, email] = authorization.split(' ');

    if (!email) {
      throw new UserError('Missing authorization token (email).');
    }

    const uid = await getUser(email);

    Object.assign(req, { uid });
    next();
  } catch (err) {
    const message = (err as any)?.message;
    res.status(401).send(`Not Authorized${message ? `: ${message}` : '.'}`);
  }
}
