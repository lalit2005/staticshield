import hashPassword from '@/lib/hashPassword';
import { HarperDBRecordWithoutDefaults } from 'types/interfaces';

const addHarperDbRecord = async (
  record: HarperDBRecordWithoutDefaults,
  user_id: string
) => {
  record.password_hash = hashPassword(record.password_hash);
  const res = await fetch(process.env.HARPERDB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.HARPERDB_KEY}`,
    },
    body: JSON.stringify({
      operation: 'insert',
      schema: 'site_schema',
      table: 'sites',
      records: [{ ...record, user_id }],
    }),
  });

  return res.json();
};
export default addHarperDbRecord;
