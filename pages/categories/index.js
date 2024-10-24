import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Category.module.css';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>모든 카테고리</h1>
      <ul className={styles.categoryList}>
        {categories.map(category => (
          <li key={category.id} className={styles.categoryItem}>
            <Link href={`/categories/${category.id}`}>
              <a>{category.name} ({category.totalItems})</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

