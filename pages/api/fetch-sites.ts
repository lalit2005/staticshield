import { HarperDBRecord } from 'types/interfaces';
import {
  getSession,
  withApiAuthRequired,
  UserProfile,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import fetchSites from '../../utils/fetchSites';

async function fetchSitesApi(req: NextApiRequest, res: NextApiResponse) {
  const { user }: { user: UserProfile } = getSession(req, res);
  const data: HarperDBRecord[] = await fetchSites(user.sub);
  for (let i = 0; i < data.length; i++) {
    delete data[i]['password_hash'];
  }
  res.json(data);
}

export default withApiAuthRequired(fetchSitesApi);
