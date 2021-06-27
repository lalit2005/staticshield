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

  try {
    const decryptedToken = JSON.parse(
      JSON.stringify(
        AES.decrypt(token.toString(), process.env.TOKEN_SECRET).toString(
          enc.Utf8
        )
      )
    );
    const payload = jwt.verify(
      decryptedToken.toString(),
      process.env.JWT_TOKEN
    );
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
