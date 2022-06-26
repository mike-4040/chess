import type { NextFunction, Request, Response } from 'express';
import type { ChessRequest } from '../utils/types';
import { createGame } from './createGame';
import { getGame } from './getGame';
import { getGames } from './getGames';

export const getGamesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid } = req as ChessRequest;

    const games = await getGames(uid)

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

    console.log({ gameId, uid})

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
