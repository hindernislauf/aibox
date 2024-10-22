import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;
  const filePath = path.join(process.cwd(), 'js', `${id}.json`);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: '카테고리를 찾을 수 없습니다.' });
  }
}
