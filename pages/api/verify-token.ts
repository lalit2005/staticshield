import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  const { token } = req.query;

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
