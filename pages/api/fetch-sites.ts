import {
  getSession,
  withApiAuthRequired,
  UserProfile,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import fetchSites from '../../utils/fetchSites';

async function fetchSitesApi(req: NextApiRequest, res: NextApiResponse) {
  const { user }: { user: UserProfile } = getSession(req, res);
  const data = await fetchSites(user.sub);
  console.log(data);
  console.log(data.sites);

  res.json(data);
}

export default withApiAuthRequired(fetchSitesApi);
