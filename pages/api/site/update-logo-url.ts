import {
  getSession,
  withApiAuthRequired,
  UserProfile,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import updateLogoUrl from 'utils/update/updateLogoUrl';

async function fetchSitesApi(req: NextApiRequest, res: NextApiResponse) {
  const { user }: { user: UserProfile } = getSession(req, res);
  const data = await updateLogoUrl(req.body.logoUrl, user.sub, req.body.siteId);
  console.log(data);
  res.json(data);
}

export default withApiAuthRequired(fetchSitesApi);
