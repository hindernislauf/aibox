import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import ServiceCard from '../../components/ServiceCard';
import styles from '../../styles/Category.module.css';

export default function Category() {
  const router = useRouter();
  const { category } = router.query;
  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (category) {
      const encodedCategory = encodeURIComponent(category);
      fetch(`/api/category/${encodedCategory}`)
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => {
              throw new Error(err.message || '카테고리를 찾을 수 없습니다.');
            });
          }
          return response.json();
        })
        .then(data => {
          setCategoryData(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching category data:', error);
          setError(error.message);
          setIsLoading(false);
        });
    }
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    // 여기에 검색 로직을 추가할 수 있습니다.
    console.log('Searching for:', searchTerm);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (!categoryData) {
    return <div>카테고리를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <Head>
        <title>{categoryData.name} - AI 서비스 대시보드</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="pageHeader">
        <h1 className="pageTitle">{categoryData.name}</h1>
        <form onSubmit={handleSearch} className="searchForm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="AI 서비스 검색..."
            className="searchInput"
          />
          <button type="submit" className="searchButton">검색</button>
        </form>
      </div>
      <div className={styles.container}>
        <div className={styles.serviceGrid}>
          {categoryData.items.map((service, index) => (
            <ServiceCard key={index} service={service} rank={index + 1} />
          ))}
        </div>
      </div>
    </>
  );
}
