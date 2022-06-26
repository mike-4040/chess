import type { ObjectId } from 'mongodb';

export interface Game {
  _id: ObjectId;
  ended: boolean;
  uid: string;
}
