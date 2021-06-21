import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD'],
  origin: '*',
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

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
