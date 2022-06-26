import 'dotenv/config';
import express from 'express';

import { auth } from './utils/auth';
import { catchAll, healthCheck } from './utils/handlers';
import { errorHandler } from './utils/error';
import { gameRouter } from './routers/games';
import { usersRouter } from './routers/users';


const port = process.env.PORT || 3000;

const app = express();

app.settings['x-powered-by'] = false;

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get('/health', healthCheck)
  .use('/users', usersRouter)
  .use('/games', auth, gameRouter)
  .use('*', catchAll)
  .use(errorHandler)
  .listen(port, () => {
    console.log(`Chess is listening at ${port}`);
  });
