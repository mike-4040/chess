import 'dotenv/config';
import express from 'express';

import { auth } from './utils/auth';
import { catchAll, healthCheck } from './utils/handlers';
import { errorHandler } from './utils/error';
import { gamesRouter } from './routers/games';
import { movesRouter } from './routers/moves';
import { usersRouter } from './routers/users';

const port = process.env.PORT || 3000;

express()
  .set('x-powered-by', false)
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/games', auth, gamesRouter)
  .get('/health', healthCheck)
  .use('/moves', auth, movesRouter)
  .use('/users', usersRouter)
  .use('*', catchAll)
  .use(errorHandler)
  .listen(port, () => {
    console.log(`Chess is listening at ${port}`);
  });
