import hashPassword from '@/lib/hashPassword';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const pwd = req.query.pwd.toString();
  const h = await hashPassword(pwd);
  res.json({ hash: h });
}
