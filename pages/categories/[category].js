import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ServiceCard from '../../components/ServiceCard';
import styles from '../../styles/Category.module.css';

export default function Category() {
  const router = useRouter();
  const { category } = router.query;
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    if (category) {
      fetch(`/api/category/${category}`)
        .then(response => response.json())
        .then(data => setCategoryData(data))
        .catch(error => console.error('Error fetching category data:', error));
    }
  }, [category]);

  if (!categoryData) {
    return <div>로딩 중...</div>;
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
