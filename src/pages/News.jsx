import React from "react";
import NewsItem from "../components/NewsPublices/NewsItem";
import CommonHero from "../components/CommonHero/CommonHero";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";
import { useGetNewsListQuery } from "../features/news/newsApilnject";

export default function News() {
  const {
    data: newsList,
    isLoading,
    isError,
  } = useGetNewsListQuery({ type: "News" });

  let content = null;
  if (isLoading) {
    content = [1, 2, 3, 4, 5, 6].map((event, i) => <HomeLoading key={i} />);
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"Item not found"} />;
  }

  if (!isLoading && !isError && newsList?.result.length < 0) {
    content = <ErrorShow message={"No data found"} />;
  }

  if (!isLoading && !isError && newsList?.result.length > 0) {
    content = newsList?.result?.map((item) => (
      <NewsItem key={item.id} props={item} />
    ));
  }

  return (
    <>
      <CommonHero title={"News"} />
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {content}
        </div>
        <div className="ak-height-40 ak-height-lg-30"></div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
