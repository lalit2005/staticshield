import { HarperDBRecord } from '../types/interfaces';

const getSuccessfulLogins = (data: HarperDBRecord[]): number => {
  if (!data) {
    return 0;
  }
  let totalSuccessfulLogins = 0;
  data.forEach((siteData) => {
    totalSuccessfulLogins += siteData.no_of_logins;
  });
  return totalSuccessfulLogins;
};

export default getSuccessfulLogins;
