import { HarperDBRecord } from '../types/interfaces';

const getUnsuccessfulLogins = (data: HarperDBRecord[]): number => {
  if (!data) {
    return 0;
  }
  let totalUnSuccessfulLogins = 0;
  data.forEach((siteData) => {
    totalUnSuccessfulLogins += siteData.no_of_failed_logins;
  });
  return totalUnSuccessfulLogins;
};

export default getUnsuccessfulLogins;
