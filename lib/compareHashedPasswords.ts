import bcrypt from 'bcrypt';
import { SHA256 } from 'crypto-js';

const hashPassword = (plainTextPassword: string, hash: string) => {
  const SHA256HashedPlaintextPassword = SHA256(
    plainTextPassword + process.env.HASH_SECRET
  ).toString();
  const reversedSHA256HashedPlaintextPassword =
    SHA256HashedPlaintextPassword.split('').reverse().join('');
  const isSame = bcrypt.compareSync(
    reversedSHA256HashedPlaintextPassword,
    hash
  );
  return isSame;
};

export default hashPassword;
