import hashPassword from '@/lib/hashPassword';

export default async function updateSiteName(
  password: string,
  userId: string,
  siteID: string
) {
  const hashedPassword = hashPassword(password);
  const res = await fetch(process.env.HARPERDB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.HARPERDB_KEY}`,
    },
    body: JSON.stringify({
      operation: 'sql',
      sql: `update site_schema.sites set password_hash = "${hashedPassword}" where user_id = "${userId}" and id = "${siteID}"`,
    }),
  });

  return res.json();
}
