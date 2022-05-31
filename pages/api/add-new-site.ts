import {
  getSession,
  withApiAuthRequired,
  UserProfile,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import addHarperDbRecord from 'utils/addHarperDbRecord';

async function fetchSitesApi(req: NextApiRequest, res: NextApiResponse) {
  const { user }: { user: UserProfile } = getSession(req, res);
  req.body = JSON.parse(req.body);
  const data = await addHarperDbRecord(req.body.record, user.sub);
  res.json(data);
}

export default withApiAuthRequired(fetchSitesApi);
