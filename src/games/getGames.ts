import { findGames } from './dataStore';
import type { Game } from './types';

export async function getGames(uid: string): Promise<Game[]> {
  return await findGames(uid);
}
