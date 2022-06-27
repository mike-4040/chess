import { dbClient } from '../services/mongo';
import type { CompleteMove } from './types';

const collection = dbClient.db('chess').collection('moves');

export async function insertMove(move: CompleteMove): Promise<string> {
  const { insertedId } = await collection.insertOne(move);
  return insertedId.toString();
};
