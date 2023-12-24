import React from "react";
import NewsItem from "../components/NewsPublices/NewsItem";
import CommonHero from "../components/CommonHero/CommonHero";

export default function News() {
  return (
    <>
      <CommonHero title={"News"} />
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
          <NewsItem />
        </div>
        <div className="ak-height-40 ak-height-lg-30"></div>
        <div className="ak-center">
          <button className="button-white">LOAD MORE</button>
        </div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
