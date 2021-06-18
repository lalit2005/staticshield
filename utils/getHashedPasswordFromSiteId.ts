const fetchSitesSiteId = async (siteId: string) => {
  const res = await fetch(process.env.HARPERDB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.HARPERDB_KEY}`,
    },
    body: JSON.stringify({
      operation: 'sql',
      sql: `SELECT password_hash FROM site_schema.sites where id = "${siteId}"`,
    }),
  });

  return res.json();
};
export default fetchSitesSiteId;
