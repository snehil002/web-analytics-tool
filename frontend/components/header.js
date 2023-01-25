import styles from "./header.module.css";
import HomeArea from "./homeArea";
import SearchArea from "./searchArea";

export default function Header({ setParameter, selectedParams, navBarState, setNavBarState }) {
  
  return (
    <>
      <header className={"navbar sticky-top " + styles.headerArea}>
        
        <div className={styles.menuArea}>
          <HomeArea navBarState={navBarState} setNavBarState={setNavBarState} />
        </div>

        <div className={styles.searchArea}>
          <SearchArea selectedParams={selectedParams} setParameter={setParameter} />
        </div>

      </header>
    </>
  );
}