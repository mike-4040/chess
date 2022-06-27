import type { NextFunction, Request, Response } from 'express';

import type { ChessRequest } from '../utils/types';
import { getPossibleMoves } from './getPossibleMoves';
import type { Piece } from '../games/types';
import { postMove } from './postMove';

export async function getPossibleMovesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uid, params } = req as ChessRequest;
    const { gameId, piece, from } = params;

    const moves = await getPossibleMoves(uid, piece as Piece, from, gameId);

    res.json({ moves });
  } catch (err) {
    next(err);
  }
}

export async function postMoveController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uid, params, body } = req as ChessRequest;
    const { gameId } = params;
    const { piece, from, to } = body;

    const moveId = await postMove(uid, piece as Piece, from, to, gameId);

    res.json({ moveId });
  } catch (err) {
    next(err);
  }
}
