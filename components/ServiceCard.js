// 이 컴포넌트는 개별 서비스 카드를 렌더링합니다.

import styles from '../styles/ServiceCard.module.css';

export default function ServiceCard({ service, rank }) {
  return (
    <div className={styles.card}>
      <div className={styles.rank}>{rank}</div>
      <img src={service.logo} alt={`${service.name} logo`} className={styles.logo} />
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <div className={styles.type}>{service.type}</div>
      <div className={styles.rating}>평점: {service.rating}/5</div>
      <div className={styles.category}>{service.category}</div>
      <div className={styles.upvotes}>좋아요: {service.upvotes}</div>
      <a href={service.url} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
        방문하다
      </a>
    </div>
  );
}
