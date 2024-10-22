import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.homeButton}>
          홈
        </Link>
        <div className={styles.logo}>
          <div className={styles.logoImage}>AI</div>
          <span className={styles.siteName}>AIBOX</span>
        </div>
      </div>
    </nav>
  );
}
