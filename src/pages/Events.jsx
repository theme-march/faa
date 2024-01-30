import React from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import { useGetEventListQuery } from "../features/events/eventsApiInject";
import ErrorShow from "../components/UI/ErrorShow";
import HomeLoading from "../components/UI/HomeLoading";
import EventItem from "../components/RecentEvent/EventItem";

export default function Events() {
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
      <EventItem key={event.id} props={event} />
    ));
  }

  return (
    <>
      <CommonHero title={"Events"} />
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
