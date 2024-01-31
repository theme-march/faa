import React from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import PublicationItem from "../components/Publication/PublicationItem";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";
import { useGetEventListQuery } from "../features/events/eventsApiInject";

export default function Publication() {
  const { data: eventList, isLoading, isError } = useGetEventListQuery();

  let content = null;
  if (isLoading) {
    content = [1, 2, 3, 4, 5, 6].map((event, i) => <HomeLoading key={i} />);
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"There was a error"} />;
  }

  if (!isLoading && !isError && eventList?.success === false) {
    content = <ErrorShow message={"Event not found"} />;
  }

  if (!isLoading && !isError && eventList?.success === true) {
    content = eventList?.result?.map((event) => (
      <PublicationItem key={event.id} props={event} />
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
