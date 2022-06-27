import type { NextFunction, Request, Response } from 'express';
import { getPossibleMoves } from './getPossibleMoves';
import type { Piece } from '../games/types';
import type { ChessRequest } from '../utils/types';

export const getPossibleMovesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid, params } = req as ChessRequest;
    const { gameId, piece, from } = params;

    const moves = await getPossibleMoves(uid, piece as Piece, from, gameId);

    res.json({ moves });
  } catch (err) {
    next(err);
  }
};
