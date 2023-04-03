import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export async function hashPassword(password: string): Promise<string> {
  // create a Salt
  const salt = randomBytes(8).toString('hex');
  // Hash the password with the salt
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  // Join the salt with the hash
  const final = salt + '.' + hash.toString('hex');

  return final;
}
