import { HarperDBRecord } from '@/lib/interfaces';

export default async function updateLoginCount(
  siteId: string,
  data: HarperDBRecord
): Promise<{ success: boolean }> {
  if (data.no_of_logins >= data.max_logins) {
    return { success: false };
  }
  console.log(data);
  console.log(data.max_logins, data.max_logins);

  const res = await fetch(process.env.HARPERDB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.HARPERDB_KEY}`,
    },
    body: JSON.stringify({
      operation: 'sql',
      // sql: `SELECT last_login, max_logins,  FROM site_schema.sites where id = "${siteId}"`,
      sql: `update site_schema.sites set no_of_logins = no_of_logins + 1 where id = "${siteId}"`,
    }),
  });
  if (res.ok) {
    return { success: true };
  }
}
