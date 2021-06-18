import bcrypt from 'bcrypt';
import { SHA256 } from 'crypto-js';

const hashPassword = (plainTextPassword: string, hash: string) => {
  console.log(plainTextPassword + process.env.HASH_SECRET);
  const SHAHash = SHA256(
    plainTextPassword + process.env.HASH_SECRET
  ).toString();
  const reversedSHAHash = SHAHash.split('').reverse().join('');
  return bcrypt.compareSync(reversedSHAHash, hash);
};

export default hashPassword;
