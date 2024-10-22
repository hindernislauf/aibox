import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const getProxiedImageUrl = (url) => {
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=48&h=48&fit=contain&output=png`;
};

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <>
      <Head>
        <title>AI 서비스 대시보드</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.container}>
        {categories.map((category, index) => (
          <div key={index} className={styles.category}>
            <h2 className={styles.categoryTitle}>{category.name}</h2>
            <ul className={styles.serviceList}>
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className={styles.serviceItem}>
                  <img 
                    src={item.logo} 
                    alt={item.name} 
                    className={styles.serviceIcon}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-favicon.png'; // 기본 이미지 경로
                    }}
                  />
                  <span className={styles.serviceName}>{item.name}</span>
                </li>
              ))}
            </ul>
            <Link href={`/categories/${category.id}`} className={styles.seeAll}>
              모든 카테고리 보기 ({category.totalItems}) →
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
