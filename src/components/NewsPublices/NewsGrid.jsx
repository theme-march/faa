import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

import NewsItem from "./NewsItem";

export default function NewsGrid() {
  return (
    <div className="container">
      <SectionTitle>News & Publication</SectionTitle>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </div>
    </div>
  );
}
