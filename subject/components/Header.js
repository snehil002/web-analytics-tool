import styles from "./Header.module.css";

export default function Header(){ 
  return (
    <div className={styles.header}>
      <div className={styles.brandLogo}>
        <a href="/">SK</a>
      </div>
      <ul className={styles.navUl}>
        <li><a href="https://www.linkedin.com/in/snehil002/" target="_blank">Contact</a></li>
      </ul>
    </div>
  );
}