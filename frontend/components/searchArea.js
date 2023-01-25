import { useState } from "react";
import styles from "./searchArea.module.css";

export default function ({ selectedParams, setParameter }) {
  const [typedPath, setTypedPath] = useState( selectedParams["visitedUrl"] );

  return (
    <>
      <span className={"input-group " + styles.searchArea}>
        
          <input id="searchURL" className="form-control" type="text" 
            placeholder="Search URL" aria-label="Search"
            onChange={
              (e) => {
                setTypedPath(e.target.value)
              }
            }
            value={typedPath}
          />
        
          {/* <label className={styles.label} htmlFor="searchURL">Search URL</label> */}

        <button
          onClick = {(e) => {
            setParameter({ "visitedUrl": typedPath });
          }}
        >
          <i className="bi bi-search"></i>
        </button>
      </span>
    </>
  );
}