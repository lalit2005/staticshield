import {
  getSession,
  withApiAuthRequired,
  UserProfile,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import updateTitle from 'utils/update/updateTitle';

async function fetchSitesApi(req: NextApiRequest, res: NextApiResponse) {
  const { user }: { user: UserProfile } = getSession(req, res);
  const data = await updateTitle(req.body.title, user.sub, req.body.siteId);
  res.json(data);
}

export default withApiAuthRequired(fetchSitesApi);
