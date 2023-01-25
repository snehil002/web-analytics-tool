import styles from "./morecontrols.module.css";

export default function MoreControls({ setParameter, selectedParams }) {

  return (
    <>
      <div className={"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 px-3 mt-3 " + styles.moreControlsDiv}>

        <div>          
          <label htmlFor="datei" className={styles.dateLabel}
            onClick={()=>{
              document.getElementById("datei").showPicker();
            }
          }>
          
            <input type="date" value={selectedParams["timeStringI"]} id="datei"
              onChange={(e) => {
                setParameter({"timeStringI": e.target.value});
              }
            }/>
          
            <i className="bi bi-calendar-event"></i>
          
            {" "}
          
            { new Date(selectedParams["timeStringI"]).toLocaleString("en-IN", {"day": "2-digit", "month": "short","year":"numeric"}) }
            
          </label>

          <i className={"bi bi-arrow-left-right " + styles.marginR07rem}></i>
        
          <label htmlFor="datef" className={styles.dateLabel}
            onClick={()=>{
              document.getElementById("datef").showPicker();
            }
          }>
            
            <input type="date" value={selectedParams["timeStringF"]} id="datef"
              onChange={(e) => {
                setParameter({"timeStringF": e.target.value});
              }
            }/>
            
            <i className="bi bi-calendar-event"></i>
            
            {" "}
            
            { new Date(selectedParams["timeStringF"]).toLocaleString("en-IN", {"day": "2-digit", "month": "short","year":"numeric"}) }
          
          </label>
        </div>

        <div>
          <button
            className={
              styles.visitorButton + " " + 
              (selectedParams["visitorCountOrAvgTime"] == "visitorCount" ? 
              styles.selectedVisitor : styles.notSelected)
            }
            onClick={(e) => {
              setParameter({"visitorCountOrAvgTime": "visitorCount"});
            }
          }>
            Visitor
          </button>
          
          <button 
            className={
              styles.avgTimeButton + " " + 
              (selectedParams["visitorCountOrAvgTime"] == "avgTime" ? 
              styles.selectedAvgTime : styles.notSelected)
            }
            onClick={(e) => {
              setParameter({"visitorCountOrAvgTime": "avgTime"});
            }
          }>
            AvgTime
          </button>
        </div>

      </div>
    </>
  );
}