import { Router } from 'express';

import { getPossibleMovesController } from '../moves/handlers';

export const movesRouter = Router().get(
  '/:gameId/:piece/:from',
  getPossibleMovesController
);
