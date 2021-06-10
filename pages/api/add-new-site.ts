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
  console.log(req.body);
  console.log(req.body.record);
  console.log(data);

  res.json(data);
}

export default withApiAuthRequired(fetchSitesApi);
