import type { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId,
  email: string
}
