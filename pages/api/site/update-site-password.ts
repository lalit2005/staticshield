import {
  getSession,
  withApiAuthRequired,
  UserProfile,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import updateSitePassword from 'utils/update/updateSitePassword';

async function fetchSitesApi(req: NextApiRequest, res: NextApiResponse) {
  const { user }: { user: UserProfile } = getSession(req, res);
  console.log(req.body);
  const data = await updateSitePassword(
    req.body.password,
    user.sub,
    req.body.siteId
  );
  res.json(data);
}

export default withApiAuthRequired(fetchSitesApi);
