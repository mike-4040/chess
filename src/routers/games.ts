import { Router } from 'express';

import {
  createGamesController,
  getGameController,
  getGamesController,
  getMovesHistoryController,
} from '../handlers/games';

export const gameRouter = Router()
  .get('/', getGamesController)
  .get('/:gameId', getGameController)
  .post('/', createGamesController)
  .get('/:gameId/history', getMovesHistoryController);
