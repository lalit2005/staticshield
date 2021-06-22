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
  const date = fromUnixTime(+latest) || +Date;
  let prettifiedTime =
    formatDistanceToNow(date, { addSuffix: true }) || 'Probably now itself';
  try {
    prettifiedTime = formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    prettifiedTime = 'Probably now itself';
  }
  console.log(prettifiedTime);
  return rawDate ? date : prettifiedTime;
};

export default getLastLogin;
