import Script from 'next/script';
import Head from 'next/head';
import Header from "./Header";
import styles from "./post-snippet.module.css";

export default function ({ title, author, created, duration, text1, text2, text3, text4, text5 }) {
  return (
    <>
      <div className="pageDiv">

        <Head>
          <title>{title + " - Web Analytics Subject"}</title>
        </Head>
        
        <Script src="/tracking-code.js" strategy="lazyOnload" />
        
        <Header />
        
        <h1>{title}</h1>
        
        <div className={styles.metadata}>
          <span>{author}</span>
          <span className={styles.sep}>&#9899;</span>
          <span>{created}</span>
          <span className={styles.sep}>&#9899;</span>
          <span>{duration}</span>
        </div>
        
        <p>{text1}</p>
        <p>{text2}</p>
        <p>{text3}</p>
        <p>{text4}</p>
        <p>{text5}</p>
      </div>
    </>
  );
}