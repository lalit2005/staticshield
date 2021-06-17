import {
  getSession,
  withApiAuthRequired,
  UserProfile,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import deleteSite from 'utils/update/deleteSite';

async function fetchSitesApi(req: NextApiRequest, res: NextApiResponse) {
  const { user }: { user: UserProfile } = getSession(req, res);
  console.log(req.body);
  const data = await deleteSite(user.sub, req.body.siteId);
  res.json(data);
}

export default withApiAuthRequired(fetchSitesApi);
