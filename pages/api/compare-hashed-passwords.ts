import compareHashedPasswords from '@/lib/compareHashedPasswords';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const pwd = req.query.pwd.toString();
  const hash = req.query.hash.toString();
  const h = await compareHashedPasswords(pwd, hash);
  res.json({ isSame: h });
}
