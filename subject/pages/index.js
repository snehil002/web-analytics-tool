import Script from 'next/script';
import Head from 'next/head';
import Header from "../components/Header";
import PostSnippet from '../components/post-snippet';

export default function Home() {

  return (
    <div className="pageDiv">
      
      <Head>
        <title>Subject - Web Analytics Tool</title>
      </Head>
      
      <Script src="/tracking-code.js" strategy="lazyOnload" />

      <Header />

      <h1>Welcome To Snehil's Little Blog</h1>

      <p>
        This is a dummy website. It is created to demonstrate 
        a Web Analytics Project I created. Hence, it is 
        being tracked for analytics purposes. No personal data
        is recorded. Time spent on page, date of visit, 
        traffic source and width of page are tracked.
        Thanks, Snehil.
      </p>

      <PostSnippet 
        title="How to get Client's IP from HTTP Request Object?"
        author="By Snehil"
        created="2 min ago"
        duration="3 min read"
        path="how-to-get-clients-ip-from-http-request"
      />

      <PostSnippet
        title="What is MongoDB's Aggregation Pipeline and how it works?"
        author="By Snehil"
        created="Jan 15, 2023"
        duration="6 min read"
        path="mongodb-aggregation-pipeline"
      />

      <PostSnippet
        title="How to create charts for the web using React-Chartjs NPM Package"
        author="By Snehil"
        created="Jan 11, 2023"
        duration="4 min read"
        path="create-charts-for-web-using-react-chartjs"
      />
      
      <PostSnippet 
        title="How to change the look of the Console Application?"
        author="By Snehil"
        created="Jan 3, 2023"
        duration="5 min read"
        path="how-to-change-the-look-of-the-console-app"
      />
    
      <PostSnippet 
        title="The Art of Writing Computer Code"
        author="By Snehil"
        created="Dec 30, 2022"
        duration="7 min read"
        path="the-art-of-writing-computer-code"
      />
      
    </div>
  )
}