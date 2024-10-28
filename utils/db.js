import { sql } from '@vercel/postgres';

export default {
  query: async (text, params) => {
    try {
      if (params) {
        return await sql.query(text, params);
      }
      return await sql.query(text);
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }
};
