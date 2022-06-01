import type { NextApiRequest, NextApiResponse } from 'next';
import compareHashedPasswords from '@/lib/compareHashedPasswords';
import getHashedPasswordFromSiteId from '@/utils/getHashedPasswordFromSiteId';
import jwt from 'jsonwebtoken';
import updateLoginCount from '@/utils/updateLoginCount';
import updateUnsuccessfulLoginCount from '@/utils/updateUnsuccessfulLoginsCount';
import rateLimit from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

const loginToSite = async (
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; token: string; message: string }>
) => {
  try {
    await limiter.check(res, 5, 'CACHE_TOKEN'); // 5 requests per minute

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
      max_logins: maxLogins,
      no_of_logins: numberOfLogins,
      site_url: siteUrlFromDb,
    } = siteData[0];

    if (
      new URL(req.body.siteUrl).origin !==
        new URL('https://' + siteUrlFromDb).origin ||
      !siteUrlFromDb
    ) {
      res.json({
        success: false,
        token: '',
        message: 'Invalid site',
      });
      return;
    }

    if (+numberOfLogins >= +maxLogins) {
      res.json({
        message:
          'This site exceeded the maximum number of logins given per month',
        token: '',
        success: false,
      });
      return;
    }

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
      updateUnsuccessfulLoginCount(siteId, siteData[0]);
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
      siteUrl: siteUrlFromDb,
    };
    const updateResponse = await updateLoginCount(siteId, siteData[0]);
    console.log(updateResponse);
    const jwtToken = jwt.sign(payload, process.env.JWT_TOKEN, {
      expiresIn: maxLoginDuration + 'd',
    });
    const modifiedToken = jwtToken
      .split('.')
      .join(process.env.TOKEN_SECRET)
      .split('')
      .reverse()
      .join('');
    console.log(modifiedToken);
    res.json({ success: true, token: modifiedToken, message: 'success' });
  } catch (error) {
    console.error(error);
    res.status(429).json({
      success: false,
      token: '',
      message: 'You have exceeded the rate limit. Try again later',
    });
  }
};

export default loginToSite;
