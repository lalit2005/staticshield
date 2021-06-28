import { HarperDBRecord } from 'types/interfaces';
import { getUnixTime } from 'date-fns';

export default async function updateLoginCount(
  siteId: string,
  data: HarperDBRecord
): Promise<{ success: boolean }> {
  const res = await fetch(process.env.HARPERDB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.HARPERDB_KEY}`,
    },
    body: JSON.stringify({
      operation: 'sql',
      sql: `update site_schema.sites set no_of_failed_logins = no_of_failed_logins + 1 where id = "${siteId}"`,
    }),
  });
  if (res.ok) {
    return { success: true };
  }
}
