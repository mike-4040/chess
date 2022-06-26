import { initialGame } from './constants';
import { insertGame } from './dataStore';

export async function createGame(uid: string): Promise<string> {
  const game = { ...initialGame, uid };

  return await insertGame(game);
}
