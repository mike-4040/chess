import 'dotenv/config';
import express from 'express';

import { usersRouter } from './routers/users';
import { errorHandler } from './utils/error';
import { catchAll, healthCheck } from './utils/handlers';

const port = process.env.PORT || 3000;

const app = express();

app.settings['x-powered-by'] = false;

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get('/health', healthCheck)
  .use('/users', usersRouter)
  .use('*', catchAll)
  .use(errorHandler)
  .listen(port, () => {
    console.log(`Chess is listening at ${port}`);
  });
