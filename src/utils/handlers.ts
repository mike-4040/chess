import type { Request, Response } from 'express';

export const healthCheck = async (_req: Request, res: Response) =>
  res.send('I am fine, thank you!');

export const catchAll = (_req: Request, res: Response) =>
  res
    .status(400)
    .send(
      'Wrong request, check documentation at https://documenter.getpostman.com/view/6976266/UzJFvJ2E#229e70ca-0871-4f53-a487-5b357fa69681'
    );
