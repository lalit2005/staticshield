import {
  getSession,
  withApiAuthRequired,
  UserProfile,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import blockLogins from 'utils/update/blockLogins';

async function fetchSitesApi(req: NextApiRequest, res: NextApiResponse) {
  const { user }: { user: UserProfile } = getSession(req, res);
  console.log(req.body);
  const data = await blockLogins(
    req.body.isLoginBlocked,
    user.sub,
    req.body.siteId
  );
  res.json(data);
}

export default withApiAuthRequired(fetchSitesApi);
