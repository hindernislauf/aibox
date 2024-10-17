import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/Category.module.css';
import Pagination from '../../components/Pagination';
import ServiceCard from '../../components/ServiceCard';

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (category) {
      setLoading(true);
      fetch(`/api/services?category=${encodeURIComponent(category)}&page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
          setServices(data.services);
          setTotalPages(data.totalPages);
          setLoading(false);
        })
        .catch(error => {
          console.error('서비스 데이터를 가져오는 중 오류 발생:', error);
          setLoading(false);
        });
    }
  }, [category, currentPage]);

  if (loading) return <div>로딩 중...</div>;
  if (!category) return <div>카테고리를 찾을 수 없습니다.</div>;

  return (
    <>
      <Head>
        <title>{category} - AI 서비스 목록</title>
      </Head>
      <div className={styles.container}>
        <h1>{category} 서비스</h1>
        <div className={styles.serviceGrid}>
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id || index} 
              service={{...service, logo: service.domain, url: service.domain}} 
              index={index + 1} 
            />
          ))}
        </div>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </>
  );
}
