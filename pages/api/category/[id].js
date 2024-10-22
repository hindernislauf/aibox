import db from '../../../utils/db';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    let result;
    if (id === 'all-categories') {
      result = await db.query(`
        SELECT DISTINCT ON (s.id) s.* 
        FROM services s
        ORDER BY s.id, s.upvotes DESC
      `);
    } else {
      result = await db.query(`
        SELECT DISTINCT ON (s.id) s.* 
        FROM services s
        JOIN service_categories sc ON s.id = sc.service_id
        JOIN categories c ON c.id = sc.category_id
        WHERE LOWER(c.name) = LOWER($1)
        ORDER BY s.id, s.upvotes DESC
      `, [id.replace(/-/g, ' ')]);
    }

    if (result.rows.length === 0) {
      res.status(404).json({ message: '카테고리를 찾을 수 없습니다.' });
    } else {
      res.status(200).json({
        name: id === 'all-categories' ? 'All Categories' : id.replace(/-/g, ' '),
        items: result.rows.map(item => ({
          ...item,
          logo: item.logo ? `https://images.weserv.nl/?url=${encodeURIComponent(item.logo)}&w=48&h=48&fit=contain&output=png` : '/default-favicon.png'
        }))
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}
