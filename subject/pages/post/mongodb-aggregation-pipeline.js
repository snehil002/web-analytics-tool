import PageLayout from "../../components/pageLayout";

const author="By Snehil",
created="Jan 15, 2023",
duration="6 min read",
title="What is MongoDB's Aggregation Pipeline and how it works?",
text1="Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
text2="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "+
"when an unknown printer took a galley of type and scrambled it to make a "+
"type specimen book.",
text3="It has survived not only five centuries, but also the "+
"leap into electronic typesetting, remaining essentially unchanged.",
text4="It was popularised in the 1960s with the release of Letraset sheets containing "+
"Lorem Ipsum passages, and more recently with desktop publishing software like "+
"Aldus PageMaker including versions of Lorem Ipsum.",
text5="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots "+
"in a piece of classical Latin literature from 45 BC, making it over 2000 years old.";

export default function ( ){
  return (
    <PageLayout author={author} created={created} duration={duration}
      title={title}
      text1={text1} text2={text2} text3={text3} text4={text4}
      text5={text5}
    />
  );
}