import type { Request, Response } from 'express';

export const healthCheck = async (_req: Request, res: Response) =>
  res.send('I am fine, thank you!');

export const catchAll = (_req: Request, res: Response) =>
  res.status(400).send('Not implemented');
