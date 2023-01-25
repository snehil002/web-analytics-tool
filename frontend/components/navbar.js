import styles from "./navbar.module.css";
import HomeArea from "./homeArea";

export default function Navbar({ setParameter, selectedParams, navBarState, setNavBarState }) {
  
  return (
    <>
      <nav id="sidebarMenu" className={"bg-light sidebar " + styles.myNav +
        " " + (navBarState == false ? styles.hideMyNav : "")
      }>
        <div className="position-sticky sidebar-sticky">

          <div>
            
            <HomeArea navBarState={navBarState} setNavBarState={setNavBarState} />
          
          </div>
          
          <ul className={"nav flex-column " + styles.mymenu }>
            
            <li>
              <h6>Metric Name</h6>
            </li>
            
            <li className="nav-item">
              <button className={(selectedParams["metricName"] ==
                "daily" ? styles.selectedMetric : styles.notSelectedMetric)}
                onClick={() => {
                  setParameter({ "metricName": "daily" });
                }
              }>
                <i className="bi bi-calendar-day"></i>
                Daily
              </button>
            </li>

            <li className="nav-item">
              <button className={(selectedParams["metricName"] ==
                "hourly" ? styles.selectedMetric : styles.notSelectedMetric)}
                onClick={
                () => {
                  setParameter({ "metricName": "hourly" });
                }
              }>
                <i className="bi bi-clock"></i>
                Hourly
              </button>
            </li>

            <li className="nav-item">
              <button className={(selectedParams["metricName"] ==
                "monthly" ? styles.selectedMetric : styles.notSelectedMetric)}
                onClick={() => {
                  setParameter({ "metricName": "monthly" });
                }
              }>
                <i className="bi bi-calendar-month"></i>
                Monthly
              </button>
            </li>
            
            <li className="nav-item">
              <button className={(selectedParams["metricName"] == 
              "devicewidth" ? styles.selectedMetric : styles.notSelectedMetric)}
                onClick={() => {
                  setParameter({ "metricName": "devicewidth" });
                }
              }>
                <i className="bi bi-phone"></i>
                Device Width
              </button>
            </li>

            <li className="nav-item">
              <button className={(selectedParams["metricName"] ==
                "trafficsource" ? styles.selectedMetric : styles.notSelectedMetric)}
                onClick={() => {
                  setParameter({ "metricName": "trafficsource" });
                }}
              >
                <i className="bi bi-people"></i>
                Traffic Source
              </button>
            </li>

          </ul>

        </div>
      </nav>
      
      <div className={styles.overlay +" "+(navBarState == false ? styles.hideOverlay : "")}
        onClick={(e)=>{
          setNavBarState(!navBarState);
        }}
      >
      </div>
    </>
  );
}