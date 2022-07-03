import type { Game } from './types';
import { findGame } from './dataStore';
import { UserError } from '../utils/error';

export async function getGame(uid: string, gameId: string): Promise<Game> {
  if (!gameId) {
    throw new UserError('No gameId is provided.');
  }
  
  const game = await findGame(uid, gameId);

  if (!game) {
    throw new UserError(`Game ${gameId} not found.`);
  }

  return game;
}
