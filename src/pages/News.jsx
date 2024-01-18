import React from "react";
import NewsItem from "../components/NewsPublices/NewsItem";
import CommonHero from "../components/CommonHero/CommonHero";
import { useGetHomeIdQuery } from "../features/home/homeApiIn";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

export default function News() {
  const { data: allDataInHome, isLoading, isError } = useGetHomeIdQuery();

  let content = null;
  if (isLoading) {
    content = <HomeLoading />;
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"There was a error"} />;
  }

  if (!isLoading && !isError && allDataInHome?.success === false) {
    content = <ErrorShow message={"No data found"} />;
  }

  if (!isLoading && !isError && allDataInHome?.success === true) {
    const { section_6 } = allDataInHome;
    content = section_6?.map((item) => <NewsItem key={item.id} props={item} />);
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
        {/*     <div className="ak-center">
          <button className="button-white">LOAD MORE</button>
        </div> */}
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
