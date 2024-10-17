import '../styles/globals.css'  // 주의: 'globals.css'가 아니라 'global.css'입니다.

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
