import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Successfully connected to the database');
    client.query('SELECT NOW()', (err, result) => {
      release();
      if (err) {
        console.error('Error executing query', err.stack);
      } else {
        console.log('Query result:', result.rows[0]);
      }
    });
  }
});

export default async function handler(req, res) {
  const { q, category } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: '검색어를 입력해주세요.' });
  }

  try {
    const client = await pool.connect();
    try {
      let query;
      let params;

      if (category === 'all-categories') {
        query = `
          SELECT DISTINCT ON (s.name) s.*, c.name as category_name
          FROM services s
          LEFT JOIN service_categories sc ON s.id = sc.service_id
          LEFT JOIN categories c ON sc.category_id = c.id
          WHERE s.name ILIKE $1 OR s.description ILIKE $1
          ORDER BY s.name, s.upvotes DESC
          LIMIT 20
        `;
        params = [`%${q}%`];
      } else {
        query = `
          SELECT s.*, c.name as category_name
          FROM services s
          LEFT JOIN service_categories sc ON s.id = sc.service_id
          LEFT JOIN categories c ON sc.category_id = c.id
          WHERE s.name ILIKE $1 OR s.description ILIKE $1
          ORDER BY 
            CASE 
              WHEN s.name ILIKE $1 THEN 0
              ELSE 1
            END,
            s.upvotes DESC
          LIMIT 100
        `;
        params = [`%${q}%`];
      }

      const result = await client.query(query, params);

      const services = result.rows.map(row => ({
        ...row,
        logo: `https://images.weserv.nl/?url=${encodeURIComponent(row.logo)}&w=48&h=48&fit=contain&output=png`,
        type: row.type || '무료',
        rating: row.rating || 'N/A',
        url: row.domain || '#'
      }));

      res.status(200).json(services);
    } catch (queryError) {
      console.error('쿼리 실행 오류:', queryError);
      res.status(500).json({ 
        error: '쿼리 실행 중 오류가 발생했습니다.', 
        details: queryError.message,
        stack: process.env.NODE_ENV === 'development' ? queryError.stack : undefined
      });
    } finally {
      client.release();
    }
  } catch (dbError) {
    console.error('데이터베이스 연결 오류:', dbError);
    res.status(500).json({ 
      error: '데이터베이스 연결 오류가 발생했습니다.', 
      details: dbError.message,
      stack: process.env.NODE_ENV === 'development' ? dbError.stack : undefined
    });
  }
}
