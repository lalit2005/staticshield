import { HarperDBRecord } from '../types/interfaces';
import { max } from 'date-fns';

const getLastLogin = (data: HarperDBRecord[]) => {
  if (!data) {
    return new Date().valueOf();
  }

  const timestamps = [];
  data?.forEach((site) => {
    timestamps.push(site.last_login);
  });

  const latest = max(timestamps);
  return +latest;
};

export default getLastLogin;
