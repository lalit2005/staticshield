require('dotenv').config({ path: '.env.local' });
const assert = require('assert');
const fetch = require('node-fetch');
const { HARPERDB_KEY, HARPERDB_URL } = process.env;

assert(HARPERDB_KEY, 'HARPERDB_KEY is required');
assert(HARPERDB_URL, 'HARPERDB_URL is required');

const SITE_SCHEMA = 'site_schema';
const SITES_TABLE = 'sites';

const runOperation = (body) =>
  fetch(HARPERDB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${HARPERDB_KEY}`,
    },
    body: JSON.stringify(body),
  });

// The minimum amount of operations needed
async function prepareDatabase() {
  await runOperation({
    operation: 'create_schema',
    schema: SITE_SCHEMA,
  });

  await runOperation({
    operation: 'create_table',
    schema: SITE_SCHEMA,
    table: SITES_TABLE,
    hash_attribute: 'id',
  });

  await runOperation({
    operation: 'create_attribute',
    schema: SITE_SCHEMA,
    table: SITES_TABLE,
    attribute: 'user_id',
  });

  console.log('Database prepared');
}

prepareDatabase();
