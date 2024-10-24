import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import Search from '../components/Search';

const getProxiedImageUrl = (url) => {
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=48&h=48&fit=contain&output=png`;
};

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
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
        setCategories(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (results) => {
    const uniqueResults = Array.from(new Set(results.map(r => r.id)))
      .map(id => results.find(r => r.id === id));
    setSearchResults(uniqueResults);
  };

  return (
    <>
      <Head>
        <title>AI 서비스 대시보드</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="pageHeader">
        <h1 className="pageTitle">AIBOX</h1>
        <Search onSearch={handleSearch} router={router} />
      </div>
      <div className={styles.container}>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : searchResults.length > 0 ? (
          <div className={styles.searchResults}>
            <h2>검색 결과</h2>
            {searchResults.map((result, index) => (
              <div key={index} className={styles.searchResultItem}>
                <h3>{result.name}</h3>
                <p>{result.description}</p>
              </div>
            ))}
          </div>
        ) : (
          categories.map((category, index) => (
            <div key={index} className={styles.category}>
              <h2 className={styles.categoryTitle}>{category.name}</h2>
              <hr className={styles.divider} />
              <ul className={styles.serviceList}>
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.serviceItem}>
                    <span className={styles.itemNumber}>{itemIndex + 1}.</span>
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
