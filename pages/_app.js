import '../styles/globals.css'
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 클라이언트 측 코드
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
