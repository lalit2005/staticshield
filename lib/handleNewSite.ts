import { NewSiteFormValues } from '../types/interfaces';

export default async function handleNewSite(siteDetails: NewSiteFormValues) {
  const body = {
    site_name: siteDetails.site_name,
    site_desc: siteDetails.site_desc,
    site_url: siteDetails.site_url,
    max_login_duration: siteDetails.expiration_days,
    no_of_logins: 1,
    no_of_failed_logins: 1,
    password_hash: siteDetails.password,
    max_logins: 100,
    last_login: +new Date().valueOf(),
    is_login_blocked: false,
    cap: siteDetails.cap,
  };

  const response = await fetch('/api/add-new-site', {
    method: 'POST',
    body: JSON.stringify({
      record: body,
    }),
  });

  if (response.ok) {
    return { success: true, data: await response.json() };
  } else {
    return { success: false };
  }
}
