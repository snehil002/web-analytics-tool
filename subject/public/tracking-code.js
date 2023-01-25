console.log("You are being tracked! For analytics! No private data!");

let canSendData = false;
let myTimeout;

/* create initial user data */
const userData = {
  "webId": "SUB001",
  "currentUrlHost": location.origin,
  "currentPagePath": location.pathname,
  "visiOrOpenDateTime": "",
  "timeOnPageInS": 0,
  "trafficSource": document.referrer == "" ? "Direct" : document.referrer,
  "deviceWidth": innerWidth
};



resetUserData();



/* Capture Page Hide Or Show Event */
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    /* Prepare final user data */
    if (canSendData) {
      const finalTimeMillis = new Date().getTime();
      const initialTimeMillis = userData["timeOnPageInS"];

      userData["timeOnPageInS"] = (finalTimeMillis - initialTimeMillis) / 1000;

      sendData();
    }
  }
  else if (document.visibilityState === "visible") {
    /* reset data */
    resetUserData();
  }
});



function resetUserData() {
  canSendData = false;
  
  clearTimeout(myTimeout);
  myTimeout = setTimeout(() => {
    canSendData = true;
  }, 10000);
  
  const initialTime = new Date();

  userData["visiOrOpenDateTime"] = initialTime.toISOString();
  userData["timeOnPageInS"] = initialTime.getTime();
}



/* Send Data to Analytics Server */
async function sendData () {
  const host = "MY_SERVER_API_HERE";
  const URL = host + `/save-session-data`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData),
    keepalive: true
  }

  try {
    const response = await fetch(URL, options);
    const result = await response.json();
    console.log(result);
  }
  catch(err) {
    console.error(err);
  }
}