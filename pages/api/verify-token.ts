import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { AES, enc } from 'crypto-js';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ invalidtoken: boolean; expired: boolean }>
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  const { token } = req.query;
  console.log(token);
  console.log(token);
  try {
    let decryptedToken = token
      .toString()
      .split('')
      .reverse()
      .join('')
      .replaceAll(process.env.TOKEN_SECRET, '.');
    const payload = jwt.verify(decryptedToken, process.env.JWT_TOKEN);
    console.log(payload);
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
