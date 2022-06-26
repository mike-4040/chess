import { Game } from './types';

export const initialGame: Omit<Game, '_id' | 'uid'> = {
  ended: false,
}
