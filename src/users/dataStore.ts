import { dbClient } from '../services/mongo';
import { User } from './types';

const collection = dbClient.db('chess').collection('users');

export const insertUser = async (email: string): Promise<string> => {
  const { insertedId } = await collection.insertOne({ email });
  return insertedId.toString();
};

export const findUser = async (email: string): Promise<User | null> =>
  await collection.findOne<User>({ email });
