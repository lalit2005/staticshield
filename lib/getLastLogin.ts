// import { HarperDBRecord } from './interfaces';
// import { max, fromUnixTime, formatDistanceToNow } from 'date-fns';

// const getLastLogin = (data: HarperDBRecord[], rawDate?: boolean) => {
//   if (!data) {
//     return 'No data';
//   }
//   if (!rawDate) {
//     rawDate = false;
//   }
//   const timestamps = [];
//   data?.forEach((site) => {
//     timestamps.push(site.last_login);
//   });
//   const latest = max(timestamps);
//   const unixTime = fromUnixTime(+latest) || +Date;
//   let prettifiedTime =
//     formatDistanceToNow(unixTime, { addSuffix: true }) || 'Probably now itself';
//   try {
//     prettifiedTime = formatDistanceToNow(unixTime, { addSuffix: true });
//   } catch (error) {
//     prettifiedTime = 'Probably now itself';
//   }
//   console.log(prettifiedTime);
//   return rawDate ? unixTime : prettifiedTime;
// };

// export default getLastLogin;

import { HarperDBRecord } from './interfaces';
import { max, fromUnixTime, formatDistanceToNow } from 'date-fns';

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
