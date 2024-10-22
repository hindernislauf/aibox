import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

const getProxiedImageUrl = (url) => {
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=48&h=48&fit=contain&output=png`;
};

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/categories')
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || `HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format');
        }
        console.log('Received categories data:', data);  // 추가된 로그
        setCategories(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>AI 서비스 대시보드</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.container}>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          categories.map((category, index) => (
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
              <div className={styles.seeMoreButtonContainer}>
                <button onClick={() => router.push(`/categories/${encodeURIComponent(category.id)}`)} className={styles.seeMoreButton}>
                  더 보기 ({category.totalItems})
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
