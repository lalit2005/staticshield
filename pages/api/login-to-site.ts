import type { NextApiRequest, NextApiResponse } from 'next';
import compareHashedPasswords from '@/lib/compareHashedPasswords';
import getHashedPasswordFromSiteId from '@/utils/getHashedPasswordFromSiteId';

const loginToSite = async (req: NextApiRequest, res: NextApiResponse) => {
  const siteId = req.body.siteId;
  const password = req.body.password;
  const passwordHash = await getHashedPasswordFromSiteId(siteId);
  const isPasswordCorrect = compareHashedPasswords(
    password.toString(),
    passwordHash[0].password_hash.toString()
  );
  if (isPasswordCorrect) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};

export default loginToSite;
