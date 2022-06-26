import { Router } from 'express';
import { createGamesController, getGameController, getGamesController } from '../games/handlers'; 

export const gameRouter = Router()
  .get('/', getGamesController)
  .get('/:gameId', getGameController)
  .post('/', createGamesController);
