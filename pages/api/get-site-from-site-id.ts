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

  if (data == [] || undefined || data.length == 0) {
    res.json([]);
    res.end(() => {
      console.log('process ended');
    });
    return;
  }
  res.json(data[0]);
}

export default withApiAuthRequired(fetchSitesApi);
