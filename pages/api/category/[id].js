import db from '../../../utils/db';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    let result;
    if (id === 'all-categories') {
      result = await db.query(`
        SELECT DISTINCT ON (s.name) s.* 
        FROM services s
        ORDER BY s.name, s.upvotes DESC
      `);
    } else {
      const decodedId = decodeURIComponent(id).replace(/-/g, ' ').toLowerCase();
      console.log('Requested category:', decodedId);
      result = await db.query(`
        SELECT DISTINCT ON (s.name) s.* 
        FROM services s
        JOIN service_categories sc ON s.id = sc.service_id
        JOIN categories c ON c.id = sc.category_id
        WHERE LOWER(c.name) = $1
        ORDER BY s.name, s.upvotes DESC
      `, [decodedId]);
    }

    if (result.rows.length === 0) {
      res.status(404).json({ message: '카테고리를 찾을 수 없습니다.' });
    } else {
      const uniqueItems = new Map();
      result.rows.forEach(item => {
        if (!uniqueItems.has(item.name) || item.upvotes > uniqueItems.get(item.name).upvotes) {
          uniqueItems.set(item.name, item);
        }
      });

      const filteredItems = Array.from(uniqueItems.values());

      res.status(200).json({
        name: id === 'all-categories' ? 'All Categories' : decodeURIComponent(id).replace(/-/g, ' '),
        items: filteredItems.map(item => ({
          ...item,
          logo: `https://images.weserv.nl/?url=${encodeURIComponent(item.logo)}&w=48&h=48&fit=contain&output=png`
        }))
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
  }
}
