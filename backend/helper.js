/*********MY HELPER FUNCTIONS START HERE*********/

/*********Functions to Validate URL parameters********/

exports.getTrackedPaths = async function (Record) {
  
  const aggrPaths = await Record.aggregate([
    {
      $group: {
        _id: "$currentPagePath"
      }
    }
  ]);

  return aggrPaths.map((e) => e["_id"]);
}




exports.myFindInArray = function (k, arr) {
  for (let i=0; i<arr.length; i++) {
    if (arr[i] == k) return true;
  }
  return false;
}



function myCheckISODateStringFormat(ts) {
  return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}([.]\d{3})?(Z|([+]|[-])\d{2}:\d{2})/.test(ts);
}



function myCheckDateParsable(ts) {
  return !isNaN(Date.parse(ts));
}



function myCompareTiIsLess(ti, tf) {
  return new Date(ti) <= new Date(tf);
}



function myCheckValidAnalyticsDate (ti, tf) {
  const utcTodayStart = new Date();
  utcTodayStart.setUTCHours(0, 0, 0, 0);

  return (
    new Date(ti) >= new Date("2023-01-01T00:00:00.000Z") &&
    new Date(tf) < utcTodayStart
  );
}



exports.myValidateDates = function (ti, tf) {
  if (!myCheckISODateStringFormat(ti) || !myCheckISODateStringFormat(tf))
    return false;
  if (!myCheckDateParsable(ti) || !myCheckDateParsable(tf))
    return false;
  if (!myCompareTiIsLess(ti, tf))
    return false;
  if (!myCheckValidAnalyticsDate(ti, tf))
    return false;
  return true;
}




/*********Functions to Get the Metric Data*********/

/***
 * Creates Parameters for Data Aggregation
 * with metricName
 * `id` for grouping data,
 * `projection` for projecting data,
 * Returns them as an object
***/
exports.createAggrParams = function ( metricName, timeZone ) {
  let id, projection;
  const dateSpecification = {
    date: "$visiOrOpenDateTime",
    timezone: timeZone
  };

  if (metricName === "hourly")
  {
    id = {
      hour: { 
        $hour: dateSpecification
      }
    };
    projection = { 
      _id: 0,
      hourly: "$_id.hour",
      count: 1,
      avgTime: {
        $trunc: ["$avgTime", 1]
      }
    };
  }
  
  else if (metricName === "daily")
  {
    id = {
      day: {
        $dayOfMonth: dateSpecification
      },
      month: {
        $month: dateSpecification
      },
      year: {
        $year: dateSpecification
      }
    };
    projection = { 
      _id: 0, 
      daily: {
        day: "$_id.day",
        month: "$_id.month",
        year: "$_id.year"
      },
      count: 1,
      avgTime: {
        $trunc: ["$avgTime", 1]
      }
    };  
  }
  
  else if(metricName === "monthly")
  {
    id = { 
      month: { 
        $month: dateSpecification 
      } 
    };
    projection = { 
      _id: 0, 
      monthly: "$_id.month", 
      count: 1, 
      avgTime: {
        $trunc: ["$avgTime", 1]
      } 
    };
  }
  
  else if (metricName === "devicewidth")
  {
    id = { 
      width: "$deviceWidth"
    };
    projection = { 
      _id: 0,
      devicewidth: "$_id.width", 
      count: 1, 
      avgTime: {
        $trunc: ["$avgTime", 1]
      } 
    };  
  }

  else if (metricName === "trafficsource")
  {
    id = { 
      source: "$trafficSource"
    };
    projection = { 
      _id: 0, 
      trafficsource: "$_id.source", 
      count: 1, 
      avgTime: {
        $trunc: ["$avgTime", 1]
      } 
    };
  }

  return {
    "id": id,
    "projection": projection
  };
}




exports.getYLabels = function (metricName) {
  let visitorCountYLabel = "",  avgTimeYLabel = "";

  if (metricName == "hourly") {
    visitorCountYLabel = "Number of Visitors at different Hours in a day in the requested Time Interval";
    avgTimeYLabel = "Average Time Spent by Visitors at different Hours in a day in the requested Time Interval";
  }
  else if (metricName == "daily") {
    visitorCountYLabel = "Number of Visitors on different Days in the requested Time Interval";
    avgTimeYLabel = "Average Time Spent by Visitors on different Days in the requested Time Interval";
  }
  else if (metricName == "monthly") {
    visitorCountYLabel = "Number of Visitors in All Months in the requested Time Interval";
    avgTimeYLabel = "Average Time Spent by Visitors in All Months in the requested Time Interval";
  }
  else if (metricName == "devicewidth") {
    visitorCountYLabel = "Number of Visitors using different Devices in the requested Time Interval";
    avgTimeYLabel = "Average Time Spent by Visitors using different Devices in the requested Time Interval";
  }
  else if (metricName == "trafficsource") {
    visitorCountYLabel = "Number of Visitors coming from different Websites in the requested Time Interval";
    avgTimeYLabel = "Average Time Spent by Visitors coming from different Websites in the requested Time Interval";
  }

  return {
    "visitorCountYLabel": visitorCountYLabel,
    "avgTimeYLabel": avgTimeYLabel
  };
}





/***
 * Aggregation Pipeline Stage: Match
 * Filters records based on Date and Path
 * Creates data for grouping and projection
 * Returns Mongoose Aggregate object
***/
exports.matchWithDateAndPath = function (timeStringI, timeStringF, visitedUrl, Record) {
  return (
    Record.aggregate([
      {
        $match:
        { 
          "visiOrOpenDateTime": { $gte: new Date(timeStringI), $lte: new Date(timeStringF) }, 
          "currentPagePath": visitedUrl
        }
      }
    ])
  );
}





/***
 * General Async Function to
 * group and project aggregation data from DB
 * based on Aggregation Params created with
 * createAggrParams()
 * Returns Array of Objects with fields
 * as projected
***/
exports.groupAndProject = async function ( aggrMatch, aggrParams )
{
  const aggrGroup = aggrMatch.group(
    {
      _id: aggrParams["id"],
      count: { $sum: 1 },
      avgTime: { $avg: "$timeOnPageInS" } 
    }
  );

  return await aggrGroup.project( aggrParams["projection"] );
}






/***
 * Convert 24 HR to 12 HR Format
***/
function get12hr(h){
  if(h === 0) return "12 am";
  if(h >= 1 && h <= 11) return h+" am";
  if(h === 12) return "12 pm";
  if(h >= 13 && h <= 23) return (h-12)+" pm";
  return -1;
}





/***
 * Returns Month Name Based on
 * 0 indexed numbers
***/
function getMonthName(n) {
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  return months[n].substring(0, 3);
}





/***
 * Returns X and Y axis data
 * for Metric Name = hourly
***/
function getHourlyAxes(metricName, aggrProject) {
  const xaxis = [],
  visitorCountData = [],
  avgTimeData = [];
  
  for (let i=0; i<=23; i++) {
    xaxis.push( get12hr(i) );
    const key = i;
    const elem = aggrProject.find(e => e[metricName] === key);
    if (elem) {
      visitorCountData.push(elem["count"]);
      avgTimeData.push(elem["avgTime"]);
    }
    else {
      visitorCountData.push(0);
      avgTimeData.push(0);
    }
  }
  
  return {
    "xaxis": xaxis,
    "yaxis": {
      "visitorCount": {
        "data": visitorCountData
      },
      "avgTime": {
        "data": avgTimeData
      }
    }
  };
}





/***
 * Returns X and Y axis data
 * for Metric Name = daily
***/
function getDailyAxes(metricName, timeStringI, timeStringF, aggrProject) {
  const xaxis = [],
  visitorCountData = [],
  avgTimeData = [];
  
  for ( let i=new Date(timeStringI); i <= new Date(timeStringF); i.setDate(i.getDate() + 1) )
  {
    const curr = new Date(i);
    
    const currday = curr.getDate(),
     currmonth = curr.getMonth()+1,
     curryear = curr.getFullYear();
    
    xaxis.push(curr.getDate() + " " +
     getMonthName(curr.getMonth()) + " " +
     curr.getFullYear());
    
    const elem = aggrProject.find(e => e[metricName]["day"] === currday &&
    e[metricName]["month"] === currmonth && e[metricName]["year"] === curryear);
    
    if (elem) {
      visitorCountData.push(elem["count"]);
      avgTimeData.push(elem["avgTime"]);
    }
    else {
      visitorCountData.push(0);
      avgTimeData.push(0);
    }
  }
  
  return {
    "xaxis": xaxis,
    "yaxis": {
      "visitorCount": {
        "data": visitorCountData
      },
      "avgTime": {
        "data": avgTimeData
      }
    }
  };
}




/***
 * Returns X and Y axis data
 * for Metric Name = monthly
***/
function getMonthlyAxes(metricName, aggrProject) {
  const xaxis = [],
  visitorCountData = [],
  avgTimeData = [];
  
  for(let i=0; i<=11; i++) {
    xaxis.push(getMonthName(i));
    const key = i+1;
    const elem = aggrProject.find(e => e[metricName] === key);
    if (elem) {
      visitorCountData.push(elem["count"]);
      avgTimeData.push(elem["avgTime"]);
    }
    else {
      visitorCountData.push(0);
      avgTimeData.push(0);
    }
  }
  
  return {
    "xaxis": xaxis,
    "yaxis": {
      "visitorCount": {
        "data": visitorCountData
      },
      "avgTime": {
        "data": avgTimeData
      }
    }
  };
}




/***
 * Returns X and Y axis data
 * for Metric Name = devicewidth
 ***/
function getDeviceWidthAxes(metricName, aggrProject) {
  const xaxis = [],
  visitorCountData = [],
  avgTimeData = [];

  for (let e of aggrProject) {
    xaxis.push(e[metricName] + " px");
    visitorCountData.push(e["count"]);
    avgTimeData.push(e["avgTime"]);
  }

  return {
    "xaxis": xaxis,
    "yaxis": {
      "visitorCount": {
        "data": visitorCountData
      },
      "avgTime": {
        "data": avgTimeData
      }
    }
  };
}





/***
 * Returns X and Y axis data
 * for Metric Name = trafficsource
 ***/
function getTrafficSourceAxes(metricName, aggrProject) {
  const xaxis = [],
  visitorCountData = [],
  avgTimeData = [];

  for (let e of aggrProject) {
    xaxis.push(e[metricName]);
    visitorCountData.push(e["count"]);
    avgTimeData.push(e["avgTime"]);
  }
  
  return {
    "xaxis": xaxis,
    "yaxis": {
      "visitorCount": {
        "data": visitorCountData
      },
      "avgTime": {
        "data": avgTimeData
      }
    }
  };
}







/***
 * General Function to
 * Returns an object of 2 arrays and ylabel
 * one array for x axis
 * and one for y axis
 * for any metric, time and visitor or avgTime
***/
exports.getAxes = function (metricName, timeStringI, timeStringF, aggrProject) {

  if (metricName == "hourly") {
    return getHourlyAxes(metricName,aggrProject);
  }
  
  else if (metricName == "daily") {
    return getDailyAxes(metricName, timeStringI, timeStringF, aggrProject);
  }
  
  else if (metricName == "monthly") {
    return getMonthlyAxes(metricName, aggrProject);
  }
  
  else if (metricName == "devicewidth") {
    return getDeviceWidthAxes(metricName, aggrProject);
  }

  else if (metricName == "trafficsource") {
    return getTrafficSourceAxes(metricName, aggrProject);
  }

}