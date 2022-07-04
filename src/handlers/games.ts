import type { NextFunction, Request, Response } from 'express';

import { UserError } from '../utils/error';
import type { ChessRequest } from '../utils/types';
import { createGame } from '../games/createGame';
import { getGame } from '../games/getGame';
import { getGames } from '../games/getGames';

export const getGamesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid } = req as ChessRequest;

    const games = await getGames(uid);

    res.json({ games });
  } catch (err) {
    next(err);
  }
};

export const getGameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid, params } = req as ChessRequest;
    const { gameId } = params;

    const game = await getGame(uid, gameId);

    res.json({ game });
  } catch (err) {
    next(err);
  }
};

export const createGamesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid } = req as ChessRequest;

    const gameId = await createGame(uid);

    res.json({ gameId });
  } catch (err) {
    next(err);
  }
};

export const getMovesHistoryController = async (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    throw new UserError(
      "I don't know how to implement this. If you have suggestion, please email to dumb@example.com!"
    );
  } catch (err) {
    next(err);
  }
};
