import {
  getSession,
  withApiAuthRequired,
  UserProfile,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import updateMaxLoginDuration from 'utils/update/updateMaxLoginDuration';

async function fetchSitesApi(req: NextApiRequest, res: NextApiResponse) {
  const { user }: { user: UserProfile } = getSession(req, res);
  console.log(req.body);
  const data = await updateMaxLoginDuration(
    req.body.max_login_duration,
    user.sub,
    req.body.siteId
  );
  res.json(data);
}

export default withApiAuthRequired(fetchSitesApi);
