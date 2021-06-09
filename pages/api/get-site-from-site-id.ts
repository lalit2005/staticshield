import {
  getSession,
  withApiAuthRequired,
  UserProfile,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import fetchSitesFromSiteId from '../../utils/getSiteFromSiteId';

async function fetchSitesApi(req: NextApiRequest, res: NextApiResponse) {
  const { user }: { user: UserProfile } = getSession(req, res);
  const data = await fetchSitesFromSiteId(
    user.sub,
    req.query.siteId.toString()
  );
  console.log(data);

  res.json(data[0]);
}

export default withApiAuthRequired(fetchSitesApi);
