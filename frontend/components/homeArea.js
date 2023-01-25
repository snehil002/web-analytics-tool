import styles from "./homeArea.module.css";

export default function MenuArea ({ navBarState, setNavBarState }) {
  return (
    <>
      <button
        className={styles.myNavButton } 
        onClick={() => {
          setNavBarState(!navBarState);
        }}
      >
        <i className={"bi " + "bi-list" }></i>
      </button>

      <a className={styles.brandName} href="/">MyDashBoard</a>
    </>
  );
}