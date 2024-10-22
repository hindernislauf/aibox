// 이 파일은 카테고리 데이터를 제공하는 API 엔드포인트입니다.

import fs from 'fs';
import path from 'path';

const getProxiedImageUrl = (url) => {
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
};

export default function handler(req, res) {
  const jsDirectory = path.join(process.cwd(), 'js');
  const jsonFiles = fs.readdirSync(jsDirectory).filter(file => file.endsWith('.json'));

  const categories = jsonFiles.map(file => {
    const filePath = path.join(jsDirectory, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return {
      id: file.replace('.json', ''),
      name: data.name,
      items: data.items.slice(0, 5).map(item => ({
        ...item,
        logo: getProxiedImageUrl(item.logo)
      })),
      totalItems: data.items.length
    };
  });

  res.status(200).json(categories);
}
