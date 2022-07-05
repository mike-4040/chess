import { Router } from 'express';

import {
  createGamesController,
  getGameController,
  getGamesController,
  getMovesHistoryController,
} from '../handlers/games';

export const gamesRouter = Router()
  .get('/', getGamesController)
  .get('/:gameId', getGameController)
  .post('/', createGamesController)
  .get('/:gameId/history', getMovesHistoryController);
