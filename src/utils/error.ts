import { NextFunction, Request, Response } from 'express';

export class UserError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);
  if (err instanceof UserError) {
    res.status(400).send(err.message);
  } else {
    res.status(500).send('Internal server error');
  }
}
