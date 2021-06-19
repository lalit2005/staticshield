import type { NextApiRequest, NextApiResponse } from 'next';
import compareHashedPasswords from '@/lib/compareHashedPasswords';
import getHashedPasswordFromSiteId from '@/utils/getHashedPasswordFromSiteId';
import jwt from 'jsonwebtoken';

const loginToSite = async (req: NextApiRequest, res: NextApiResponse) => {
  const siteId = req.body.siteId;
  const password = req.body.password;
  const siteData = await getHashedPasswordFromSiteId(siteId);
  const {
    password_hash: passwordHash,
    is_login_blocked: isLoginBlocked,
    max_login_duration: maxLoginDuration,
  } = siteData[0];

  const isPasswordCorrect = compareHashedPasswords(
    password.toString(),
    passwordHash.toString()
  );

  if (!isPasswordCorrect) {
    res.json({
      success: false,
      token: '',
      message: 'The password you entered is incorrect',
    });
    return;
  }
  if (isLoginBlocked) {
    res.json({
      success: false,
      token: '',
      message:
        'The login to the website has been temporarily blokced by the owner.',
    });
    return;
  }

  const payload = {
    password,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_TOKEN, {
    expiresIn: '1d',
  });

  // try {
  //   const a = jwt.verify(jwtToken, 'process.env.JWT_TOKEN');
  //   console.log(a);
  // } catch (e) {
  //   console.log(e);
  // }

  res.json({ success: true, token: jwtToken });
};

export default loginToSite;
