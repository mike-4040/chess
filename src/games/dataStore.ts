import { ObjectId } from 'mongodb';

import { dbClient } from '../services/mongo';
import type { Game } from './types';

const collection = dbClient.db('chess').collection('games');

export const insertGame = async (game: Omit<Game, '_id'>): Promise<string> => {
  const { insertedId } = await collection.insertOne(game);
  return insertedId.toString();
};

export const findGames = async (uid: string): Promise<Game[]> => {
  return await collection.find<Game>({ uid }).toArray();
};

export const findGame = async (uid: string, gameId: string): Promise<Game | null> => {
  return await collection.findOne<Game>({ _id: new ObjectId(gameId), uid  });
};
