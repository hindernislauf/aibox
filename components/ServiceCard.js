// 이 컴포넌트는 개별 서비스 카드를 렌더링합니다.

import styles from '../styles/ServiceCard.module.css';

export default function ServiceCard({ service, rank }) {
  const typeClass = service.type.replace(/\s+/g, '').toLowerCase();

  return (
    <div className={styles.card}>
      <div className={styles.rank}>{rank}</div>
      <div className={`${styles.type} ${styles[typeClass]}`}>{service.type}</div>
      <div className={styles.header}>
        <img src={service.logo} alt={`${service.name} logo`} className={styles.logo} />
        <h3 className={styles.name}>{service.name}</h3>
      </div>
      <p className={styles.description}>{service.description}</p>
      <div className={styles.footer}>
        <div className={styles.stats}>
          <span>평점: {service.rating}/5</span>
          <span style={{marginLeft: '10px'}}>좋아요: {service.upvotes}</span>
        </div>
        <a href={service.url} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
          방문하다
        </a>
      </div>
    </div>
  );
}
