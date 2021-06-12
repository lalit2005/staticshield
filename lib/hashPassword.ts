import bcrypt from 'bcrypt';
import { SHA256 } from 'crypto-js';

const hashPassword = (password: string) => {
  const SHA256HashedPassword = SHA256(
    password + process.env.HASH_SECRET
  ).toString();
  const reversedSHA256HashedPassword = SHA256HashedPassword.toString()
    .split('')
    .reverse()
    .join('');
  const bcryptHashedPassword = bcrypt.hashSync(reversedSHA256HashedPassword, 5);
  return bcryptHashedPassword;
};

export default hashPassword;
