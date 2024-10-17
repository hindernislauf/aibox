import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Category.module.css';
import Pagination from '../components/Pagination';
import ServiceCard from '../components/ServiceCard';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched categories:', data);
        setCategories(data);
      })
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
            <h2 className={styles.categoryTitle}>
              {category.icon} {category.name}
            </h2>
            <ul className={styles.serviceList}>
              {category.services.slice(0, 5).map((service, serviceIndex) => (
                <li key={serviceIndex} className={styles.serviceItem}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                  <span className={styles.serviceName}>{service.name}</span>
                </li>
              ))}
            </ul>
            <Link href={`/categories/${category.id}`} className={styles.seeAll}>
              See all category ({category.totalServices}) →
            </Link>
          </div>
        ))}
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </>
  );
}
