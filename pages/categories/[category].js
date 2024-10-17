import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/Category.module.css';
import Pagination from '../../components/Pagination';
import ServiceCard from '../../components/ServiceCard';
import imageGenerators from '../../data/categories/imageGenerators';

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (category) {
      setLoading(true);
      if (category === 'image-generators') {
        // image-generators 카테고리일 경우 로컬 데이터 사용
        setServices(imageGenerators);
        setTotalPages(Math.ceil(imageGenerators.length / 12));
        setLoading(false);
      } else {
        fetchServices();
      }
    }
  }, [category, currentPage]);

  const fetchServices = async () => {
    const res = await fetch(`/api/services?category=${category}&page=${currentPage}&limit=12`);
    const data = await res.json();
    setServices(data.services);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
              service={{
                ...service,
                logo: service.logo || `https://www.google.com/s2/favicons?domain=${service.domain}&sz=64`,
                url: service.url || service.domain
              }} 
              index={index + 1 + (currentPage - 1) * 12} 
            />
          ))}
        </div>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </>
  );
}
