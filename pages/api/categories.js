// 이 파일은 카테고리 데이터를 제공하는 API 엔드포인트입니다.

import db from '../../utils/db';

export default async function handler(req, res) {
  try {
    // 간단한 쿼리로 연결 테스트
    const testResult = await db.query('SELECT NOW()');
    console.log('Database connection successful:', testResult.rows[0]);

    const result = await db.query(`
      SELECT c.name, 
             COUNT(DISTINCT s.name) as totalItems
      FROM categories c
      JOIN service_categories sc ON c.id = sc.category_id
      JOIN services s ON sc.service_id = s.id
      GROUP BY c.name
      ORDER BY c.name
    `);

    const categories = await Promise.all(result.rows.map(async (category) => {
      const items = await db.query(`
        SELECT DISTINCT ON (s.name) s.* 
        FROM services s
        JOIN service_categories sc ON s.id = sc.service_id
        JOIN categories c ON c.id = sc.category_id
        WHERE c.name = $1 
        ORDER BY s.name, s.upvotes DESC 
        LIMIT 5
      `, [category.name]);

      return {
        id: encodeURIComponent(category.name.toLowerCase().replace(/\s+/g, '-')),
        name: category.name,
        items: items.rows.map(item => ({
          ...item,
          logo: `https://images.weserv.nl/?url=${encodeURIComponent(item.logo)}&w=48&h=48&fit=contain&output=png`
        })),
        totalItems: parseInt(category.totalitems)
      };
    }));

    // 모든 아이템을 포함하는 'all_categories' 추가
    const allItems = await db.query(`
      SELECT DISTINCT ON (s.id) s.* 
      FROM services s
      ORDER BY s.id, s.upvotes DESC 
      LIMIT 5
    `);

    const allCategories = {
      id: 'all-categories',
      name: 'All Categories',
      items: allItems.rows.map(item => ({
        ...item,
        logo: `https://images.weserv.nl/?url=${encodeURIComponent(item.logo)}&w=48&h=48&fit=contain&output=png`
      })),
      totalItems: await db.query('SELECT COUNT(DISTINCT name) FROM services').then(res => res.rows[0].count)
    };

    categories.unshift(allCategories);

    res.status(200).json(categories);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
  }
}
