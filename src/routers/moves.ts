import { Router } from 'express';

import { getPossibleMovesController, postMoveController } from '../moves/handlers';

export const movesRouter = Router()
  .get('/:gameId/:piece/:from', getPossibleMovesController)
  .post('/:gameId', postMoveController);
