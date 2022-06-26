import { UserError } from '../utils/error';
import { findUser, insertUser } from './dataStore';

export async function createUser(email: string): Promise<string> {
  /** @todo email validation */

  if (!email) {
    throw new UserError('No email provided');
  }

  const dbUser = await findUser(email);

  if (dbUser) {
    throw new UserError(`User with email '${email}' already exists`);
  }

  return await insertUser(email);
}
