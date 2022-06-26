import { Router } from 'express';
import { getUserController, postUserController } from '../users/handlers';

export const usersRouter = Router()
  .get('/:email', getUserController)
  .post('/', postUserController);
