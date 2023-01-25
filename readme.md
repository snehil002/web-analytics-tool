# Web Analytics Tool

## About this project
A Web Analytics Tool to track user behavior,  
popularity and traffic on a website.

It analyses a website (Subject) by placing a special  
tracking script on the Subject and sending  
non-identifiable data from the user's device and  
collecting and persisting the user data in a database.

Finally, this data is presented on a Dashboard.

## Reason to create this project
1. I wished there existed a web analytics tool that does  
not collect private user data.  
2. I wanted to know the inner workings of a web analytics tool.  
3. I also wanted to sharpen my technical skills and  
create a computer science side project.  

## How I worked on this project
1. Collected 4 types of user data - number of visits,  
time on page, device width and traffic source.  
2. Used visibilityChange event and fetch API to send  
analytics data.  
3. Created a Node and Express server for the backend.  
4. Used MongoDB for the database.  
5. Used NextJS to create the Subject and Dashboard  
websites.  
6. Used Bootstrap and custom CSS for the Dashboard.  
7. Used Local time on Client and UTC on server and DB.  
Used UTC to fetch and collect analytics data.  
8. Used MongoDB's Aggregation Pipeline to Group Data  
and make development easier.  
9. Used Environment Variables to store APIs.

## How to navigate this project
1. Here is the [Tracking Code](https://gist.github.com/snehil002/690df9e8d76b4005acde9b3ddbc85b8f).  
2. Here is the [data collected from the Subject Website](https://gist.github.com/snehil002/4771f49c1b5f4c08d45128fd4d92624a).  
3. Here is the [data fetched and requested by the Dashboard](https://gist.github.com/snehil002/8082be5ddc37ab840eea74da73d064a8).  
4. Here are the [Server API endpoint calculations](https://gist.github.com/snehil002/7eba630327d70435206b206b3cbcf38b).  
5. Here is the [Database Schema design](https://gist.github.com/snehil002/8a493d91acfca6ea9b346f8a0a08e12e).  

## WHY did I create the project THIS WAY
1. I did not use Beacon API, due to data collection  
problems on iOS devices (till v12) and other problems.  
Rather I used the Fetch API.  
2. I added 10 sec delay before running tracking script  
to filter out bots and mistakenly opened page.  
3. I did not use IP address to track users, because  
IP addresses change regularly and this is their private  
data and I did not want to collect private user data.

## If I had more time I would change this
1. Add additional metrics to be tracked like top 5  
most visited websites.  
2. Try using Web Workers to asynchronously send user  
data.  
3. Try using AI to track and analyse user behavior  
without sacrificing user privacy.  

## Parts of this project
There are 3 parts of this Web Analytics project:  

1. Subject Website: Website required to be analysed.  
A tracking code is placed on each of its pages.  
(Created with NextJS)  

2. Application Server: For collecting, analysing and  
serving user data collected from the Subject website.  
This is also used to save user data into a MongoDB  
database. (Created with NodeJS, ExpressJS)  

3. Dashboard UI: A webpage to show charts based on  
different metrics and analytics data collected from  
the Subject Website. (Created with NextJS)  

## How this project works
1. A tracking script is placed on the Subject website  
and is downloaded to the user's device when the user  
visits it.  

2. The user visits the Subject website and triggers  
some particular events by, such as 'visiting the  
website', 'minimising the window and reopening it',  
'clicking a certain button', etc.  

3. Then this script sends user data to the Application  
server where it is saved into a database.  

4. Server performs some Aggregation operations such as  
Match, Group, and Project to fetch analytics data based  
on different metrics from the DB and create it according  
to the Dashboard's requirements.

5. Data is, then, fetched from this database and  
presented on a dashboard.

## A Note On Data Collection
The script sends the user data - when the page is  
hidden or closed.  

When the page is visible or opened, this data is reset.  

Hence, no personal data is collected.  

However, we can measure the total number of visits and  
total time spent on a page on the Subject website.  

**Note:** These are NOT number of UNIQUE visitors and  
time spent on page by those UNIQUE visitors.  

## Live Links  
1. [Dashboard Website](https://web-analytics-dashboard.vercel.app/)  
2. [Subject Website](https://web-analytics-subject.vercel.app/)  

## External Links
Articles that helped me create this project:  
1. [Build web analytics project from scratch](https://vmois.dev/build-web-analytics-project-from-scratch/)  
2. [Analytics Blog on CTRL](https://www.ctrl.blog/entry/ctrl-analytics.html)  
3. [How to build your own Web Analytics and avoid the Cookie Banner](https://bootcamp.uxdesign.cc/how-to-build-your-own-web-analytics-and-avoid-the-cookie-banner-8c50e8a3f7b6)  
4. [Web Fetch API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)  
5. [Date API on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)  
6. [Get Client's timezone in Javascript](https://stackoverflow.com/questions/1091372/getting-the-clients-time-zone-and-offset-in-javascript)  

## Technologies used to create this Project
ReactJS, NextJS, NodeJS, ExpressJS, MongoDB,  
MongooseJS, Chart.JS, React-Chartjs-2, HTML, CSS, JS