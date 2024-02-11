import React from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import PublicationItem from "../components/Publication/PublicationItem";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";
import { useGetNewsListQuery } from "../features/news/newsApilnject";

export default function Publication() {
  const {
    data: publicationsList,
    isLoading,
    isError,
  } = useGetNewsListQuery({ type: "Publication" });
  let content = null;
  if (isLoading) {
    content = [1, 2, 3, 4, 5, 6].map((event, i) => <HomeLoading key={i} />);
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"There was a error"} />;
  }

  if (!isLoading && !isError && publicationsList?.result < 0) {
    content = <ErrorShow message={"No data found"} />;
  }

  if (!isLoading && !isError && publicationsList?.result.length > 0) {
    content = publicationsList?.result?.map((item) => (
      <PublicationItem key={item.id} props={item} />
    ));
  }
  return (
    <>
      <CommonHero title={"Publication"} />
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {content}
        </div>
        <div className="ak-height-100 ak-height-lg-60"></div>
      </div>
    </>
  );
}
