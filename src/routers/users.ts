import { Router } from 'express';
import { getUserController, postUserController } from '../handlers/users';

export const usersRouter = Router()
  .get('/:email', getUserController)
  .post('/', postUserController);
