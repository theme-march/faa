import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

import NewsItem from "./NewsItem";

export default function NewsGrid({ props }) {
  return (
    <div className="container">
      <SectionTitle>News & Publication</SectionTitle>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {props.map((item) => (
          <NewsItem key={item.id} props={item} />
        ))}
      </div>
    </div>
  );
}
