import { UserError } from '../utils/error';
import { findUser } from './dataStore';

export async function getUser(email: string): Promise<string> {
  if (!email) {
    throw new UserError(`No email provided`);
  }

  if(typeof email !== 'string') {
    throw new Error(`Wrong email type`);
  }

  const { _id } = await findUser(email) || {};
 
  if (!_id) {
    throw new UserError(`User not found`);
  }

  return _id.toString()
}
