import { HarperDBRecord } from './interfaces';
import { max, fromUnixTime, formatDistanceToNow } from 'date-fns';

const getLastLogin = (data: HarperDBRecord[], rawDate?: boolean) => {
  if (!data) {
    return 'No data';
  }
  if (!rawDate) {
    rawDate = false;
  }
  const timestamps = [];
  data?.forEach((site) => {
    timestamps.push(site.last_login);
  });
  const latest = max(timestamps);
  const date = fromUnixTime(+latest);
  const prettifiedTime = formatDistanceToNow(date, { addSuffix: true });
  console.log(prettifiedTime);
  return rawDate ? date : prettifiedTime;
};

export default getLastLogin;
