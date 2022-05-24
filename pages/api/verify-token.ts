import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ invalidtoken: boolean; expired: boolean }>
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { token } = req.query;
  console.log(token);
  try {
    let decryptedToken = token
      .toString()
      .split('')
      .reverse()
      .join('')
      .split(process.env.TOKEN_SECRET)
      .join('.');
    console.log(decryptedToken);
    const payload: any = jwt.verify(decryptedToken, process.env.JWT_TOKEN);
    console.log(payload);
    if (
      new URL(`https://${payload.siteUrl}`).origin !==
      new URL(req.headers.referer).origin
    ) {
      res.json({
        invalidtoken: true,
        expired: false,
      });
      return;
    }
    res.json({
      invalidtoken: false,
      expired: false,
    });
    return;
  } catch (error) {
    console.log(error.message);
    if (error.message == 'jwt expired') {
      res.json({
        invalidtoken: false,
        expired: true,
      });
      return;
    } else {
      res.json({
        invalidtoken: true,
        expired: false,
      });
      return;
    }
  }
}
