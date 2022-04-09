export default async function updateLogoUrl(
  logoUrl: string,
  userId: string,
  siteID: string
) {
  const res = await fetch(process.env.HARPERDB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.HARPERDB_KEY}`,
    },
    body: JSON.stringify({
      operation: 'sql',
      sql: `update site_schema.sites set logo_url = "${logoUrl}" where user_id = "${userId}" and id = "${siteID}"`,
    }),
  });

  return res.json();
}
