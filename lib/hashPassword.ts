import bcrypt from 'bcrypt';
import { SHA256 } from 'crypto-js';

const hashPassword = (password: string) => {
  const SHAHash = SHA256(password + process.env.HASH_SECRET).toString();
  const reversedSHAHash = SHAHash.split('').reverse().join('');
  const bcryptHashedPassword = bcrypt.hashSync(reversedSHAHash, 5);
  return bcryptHashedPassword;
};

export default hashPassword;
