import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'aibox2',
  password: '0000',
  port: 5432,
});

export default {
  query: (text, params) => pool.query(text, params),
};
