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
  },
  
  // 서비스 정보를 가져오는 함수 수정
  getServiceWithLogo: async (id) => {
    try {
      const query = `
        SELECT 
          s.*,
          CASE 
            WHEN s.url IS NOT NULL THEN 
              regexp_replace(s.url, '/[^/]*$', '/favicon.ico')  -- URL에서 favicon.ico 경로 생성
            ELSE '/default-favicon.png'
          END as logo
        FROM services s
        WHERE s.id = $1
      `;
      return await sql.query(query, [id]);
    } catch (error) {
      console.error('Error fetching service with logo:', error);
      throw error;
    }
  }
};
