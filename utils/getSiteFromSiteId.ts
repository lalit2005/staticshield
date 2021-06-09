const fetchSitesSiteId = async (userId: string, siteId: string) => {
  const res = await fetch(process.env.HARPERDB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.HARPERDB_KEY}`,
    },
    body: JSON.stringify({
      operation: 'sql',
      // sql: `SELECT * FROM site_schema.sites where user_id = "${userId}" AND id = "${siteId}"`,
      sql: `SELECT * FROM site_schema.sites where user_id = "${userId}" AND id = "${siteId}"`,
    }),
  });

  return res.json();
};
export default fetchSitesSiteId;
