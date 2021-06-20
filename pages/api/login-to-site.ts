import type { NextApiRequest, NextApiResponse } from 'next';
import compareHashedPasswords from '@/lib/compareHashedPasswords';
import getHashedPasswordFromSiteId from '@/utils/getHashedPasswordFromSiteId';
import jwt from 'jsonwebtoken';

const loginToSite = async (
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; token: string; message: string }>
) => {
  const siteId = req.body.siteId;
  const password = req.body.password;
  const siteData = await getHashedPasswordFromSiteId(siteId);
  if (siteData[0] == undefined) {
    res.json({
      success: false,
      token: '',
      message: 'Site not found. Invalid URL',
    });
    return;
  }
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
    loggedIn: true,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_TOKEN, {
    expiresIn: maxLoginDuration + 'd',
  });

  // try {
  //   const a = jwt.verify(
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbiI6dHJ1ZSwiaWF0IjoxNjI0MjA3MDg3LCJleHAiOjE2MjQyMDcwOTJ9.fbzPtp1rNTcY8067iqm_LB0Qhe2VdqM9a-SDCs3xzZU',
  //     process.env.JWT_TOKEN
  //   );
  //   console.log(a);
  // } catch (e) {
  //   console.log(e.message);
  // }

  res.json({ success: true, token: jwtToken, message: 'success' });
};

export default loginToSite;
