// 이 컴포넌트는 개별 서비스 카드를 렌더링합니다.

import styles from '../styles/ServiceCard.module.css';

export default function ServiceCard({ service, index }) {
  return (
    <div className={styles.card}>
      <div className={styles.rank}>{index}</div>
      <img src={`https://www.google.com/s2/favicons?domain=${service.domain}&sz=64`} alt={`${service.name} logo`} className={styles.logo} />
      <h3 className={styles.name}>{service.name}</h3>
      <p className={styles.description}>{service.description}</p>
      <a href={service.domain} target="_blank" rel="noopener noreferrer" className={styles.link}>Visit Site</a>
    </div>
  );
}
