import dotenv from 'dotenv';
import { logger } from './logger'
/* pg module is a popular Node.js library used to interact with PostgreSQL databases.
The pg module provides an interface for connecting to, querying, and managing PostgreSQL databases from Node.js applications.

The 'Pool' class is an essential part of the 'pg' module. It represents a pool of client connections to the PostgreSQL database. When you want to execute queries, you typically need to establish a connection to the database server. However, establishing a new connection for every query can be resource-intensive and slow. To address this, connection pooling is used.
*/
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  ENV,
} = process.env;

let client: Pool;


console.log('PostgreSQL Configuration:', {
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT || '5433'),
});


if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT || '5433'),
  });
} else if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT || '5433'),
  });
} else {
  throw new Error(`Unknown ENV: ${ENV}`);
}

client.on('error', (err) => {
  console.error('PostgreSQL connection error:', err.message);
});

export default client;
