import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function verify(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;
  console.log();

  try {
    const payload = jwt.verify(token.toString(), process.env.JWT_TOKEN);
    console.log(payload);
    res.json({
      invalidtoken: false,
      expired: false,
      payload: payload,
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
