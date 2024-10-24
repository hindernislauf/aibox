import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import ServiceCard from '../components/ServiceCard';
import styles from '../styles/Result.module.css';

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (q) {
      setIsLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Search results:', data);
          if (data.error) {
            throw new Error(data.error);
          }
          // 중복 제거를 위해 Map 객체 사용
          const uniqueServicesMap = new Map();
          data.forEach(service => {
            if (!uniqueServicesMap.has(service.name) || service.upvotes > uniqueServicesMap.get(service.name).upvotes) {
              uniqueServicesMap.set(service.name, service);
            }
          });
          const uniqueServices = Array.from(uniqueServicesMap.values());
          setSearchResults(uniqueServices);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
          setSearchResults([]);
          setIsLoading(false);
        });
    }
  }, [q]);

  return (
    <>
      <Head>
        <title>검색 결과: {q} - AI 서비스 대시보드</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>'{q}' 검색 결과</h1>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : searchResults.length > 0 ? (
          <div className={styles.serviceGrid}>
            {searchResults.map((service, index) => (
              <ServiceCard key={service.id || index} service={service} rank={index + 1} />
            ))}
          </div>
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </div>
    </>
  );
}
