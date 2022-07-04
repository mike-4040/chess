import { Router } from 'express';

import { getPossibleMovesController, postMoveController } from '../handlers/moves';

export const movesRouter = Router()
  .get('/:gameId/:piece/:from', getPossibleMovesController)
  .post('/:gameId', postMoveController);
