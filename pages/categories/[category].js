import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ServiceCard from '../../components/ServiceCard';
import styles from '../../styles/Category.module.css';

export default function Category() {
  const router = useRouter();
  const { category } = router.query;
  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (category) {
      fetch(`/api/category/${category}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('카테고리를 찾을 수 없습니다.');
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
    <div className={styles.container}>
      <h1>{categoryData.name} 서비스</h1>
      <div className={styles.serviceGrid}>
        {categoryData.items.map((service, index) => (
          <ServiceCard key={index} service={service} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
