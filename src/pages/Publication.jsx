import React from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import NewsItem from "../components/NewsPublices/NewsItem";

export default function Publication() {
  return (
    <>
      <CommonHero title={"Publication"} />
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
        </div>
      </div>
    </>
  );
}
