import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // 카테고리 데이터를 외부 소스에서 가져옵니다 (예: API 호출)
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <>
      <Head>
        <title>AI Services Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <div className="container" id="categoryContainer">
        {categories.map((category, index) => (
          <div key={index} className="category-box">
            <h2 className="category-title">
              <span className="category-icon">{category.icon}</span> {category.title}
            </h2>
            <ul className="service-list">
              {category.services.map((service, serviceIndex) => (
                <li key={serviceIndex} className="service-item">
                  <span className="service-icon">{service.icon}</span> {service.name}
                </li>
              ))}
            </ul>
            <a href="#" className="see-all">See all category ({category.total}) →</a>
          </div>
        ))}
      </div>
    </>
  );
}
