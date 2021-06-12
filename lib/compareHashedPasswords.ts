import bcrypt from 'bcrypt';
import crypto from 'crypto-js';
import { SHA256, AES, enc } from 'crypto-js';

const hashPassword = (plainTextPassword: string, hash: string) => {
  console.log(hash);
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
