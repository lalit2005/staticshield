import { getUnixTime } from 'date-fns';
import { NewSiteFormValues } from './interfaces';

export default async function handleNewSite(siteDetails: NewSiteFormValues) {
  console.log(siteDetails);

  const body = {
    site_name: siteDetails.site_name,
    site_desc: siteDetails.site_desc,
    site_url: siteDetails.site_url,
    max_login_duration: siteDetails.expiration_days,
    no_of_logins: 1,
    no_of_failed_logins: 1,
    password_hash: siteDetails.password,
    max_logins: 100,
    last_login: getUnixTime(new Date()),
    is_login_blocked: false,
  };

  const response = await fetch('/api/add-new-site', {
    method: 'POST',
    body: JSON.stringify({
      record: body,
    }),
  });

  if (response.ok) {
    return { success: true };
  } else {
    return { success: false };
  }
}
