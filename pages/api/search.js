import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { q, category } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: '검색어를 입력해주세요.' });
  }

  try {
    let result;
    if (category === 'all-categories') {
      result = await sql`
        SELECT DISTINCT ON (s.name) s.*, c.name as category_name
        FROM services s
        LEFT JOIN service_categories sc ON s.id = sc.service_id
        LEFT JOIN categories c ON sc.category_id = c.id
        WHERE s.name ILIKE ${`%${q}%`} OR s.description ILIKE ${`%${q}%`}
        ORDER BY s.name, s.upvotes DESC
        LIMIT 20
      `;
    } else {
      result = await sql`
        SELECT s.*, c.name as category_name
        FROM services s
        LEFT JOIN service_categories sc ON s.id = sc.service_id
        LEFT JOIN categories c ON sc.category_id = c.id
        WHERE s.name ILIKE ${`%${q}%`} OR s.description ILIKE ${`%${q}%`}
        ORDER BY 
          CASE 
            WHEN s.name ILIKE ${`%${q}%`} THEN 0
            ELSE 1
          END,
          s.upvotes DESC
        LIMIT 100
      `;
    }

    const services = result.rows.map(row => ({
      ...row,
      logo: `https://images.weserv.nl/?url=${encodeURIComponent(row.logo)}&w=48&h=48&fit=contain&output=png`,
      type: row.type || '무료',
      rating: row.rating || 'N/A',
      url: row.url || row.domain || '#'
    }));

    res.status(200).json(services);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: '검색 중 오류가 발생했습니다.' });
  }
}
