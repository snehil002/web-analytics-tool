const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Record, connectDB } = require("./myDB");
const {
  myFindInArray, myValidateDates, getTrackedPaths, createAggrParams,
  matchWithDateAndPath, groupAndProject, getYLabels, getAxes
} = require("./helper");




const app = express();

app.use(bodyParser.json( { type: "application/json" } ));
app.use(cors());

const port = process.env.PORT || 3030;





/*************Routes**************/
app.post("/save-session-data", async (req, res) => {
  try {
    const received = req.body;
    const doc = new Record(received);
    const saved = await doc.save();
    console.log(saved);
    res.json("Got Data!🎉");
  }
  catch(err) {
    console.error(err["message"]);
    res.json("Error Tracking!😁");
  }
});





app.get("/get-metric", async (req, res) => {
  const {visitedurl, metricname, timestringi, timestringf, timezone} = req.query;

  const trackedPaths = await getTrackedPaths(Record);

  if (
    visitedurl == undefined || visitedurl == "" ||
    metricname == undefined || metricname == "" ||
    timestringi == undefined || timestringi == "" ||
    timestringf == undefined || timestringf == "" ||
    !myFindInArray(visitedurl, trackedPaths) ||
    !myFindInArray(metricname, 
      ["hourly", "daily", "monthly", "devicewidth", "trafficsource" ]
    )  ||
    !myValidateDates(timestringi, timestringf)
  )
  {
    res.json(
      {
        "xaxis": ["Incorrect Request"],
        "yaxis": {
          "visitorCount": {
            "data": ["0"],
            "ylabel": "Incorrect Request"
          },
          "avgTime": {
            "data": ["0"],
            "ylabel": "Incorrect Request"
          }
        }
      }
    );
  }

  else 
  {
    const aggrParams = createAggrParams(metricname, timezone);
    
    const aggrMatch = matchWithDateAndPath(timestringi, timestringf, visitedurl, Record);
    
    const aggrProject = await groupAndProject(aggrMatch, aggrParams);
    
    const result = getAxes(metricname, timestringi, timestringf, aggrProject);
  
    const yLabels = getYLabels(metricname);

    result["yaxis"]["visitorCount"]["ylabel"] = yLabels["visitorCountYLabel"];
    result["yaxis"]["avgTime"]["ylabel"] = yLabels["avgTimeYLabel"];
    
    res.json(result);
  }
});

/*
  Sample Response
  {
    "xaxis": [],
    "yaxis": {
      "visitorCount": {
        "data": [],
        "ylabel": ""
      },
      "avgTime": {
        "data": [],
        "ylabel": ""
      }
    }
  }
*/




/********START APP SERVER**********/
app.listen(port, () => {
  console.log(`Running, http://localhost:${port}`);
});




/*******Connect DB Here********/
connectDB();