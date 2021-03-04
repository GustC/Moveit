import { GetServerSideProps } from "next";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (    
    <Component {...pageProps} />
  )
}

export default MyApp
