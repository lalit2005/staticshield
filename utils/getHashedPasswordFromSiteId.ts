const getHashedPasswordFromSiteId = async (siteId: string) => {
  const res = await fetch(process.env.HARPERDB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.HARPERDB_KEY}`,
    },
    body: JSON.stringify({
      operation: 'sql',
      sql: `SELECT password_hash, max_login_duration, is_login_blocked, max_logins, no_of_logins, site_url FROM site_schema.sites where id = "${siteId}"`,
    }),
  });

  return res.json();
};
export default getHashedPasswordFromSiteId;
