import React from "react";
import EventItem from "../components/RecentEvent/EventItem";
import CommonHero from "../components/CommonHero/CommonHero";

export default function Events() {
  return (
    <>
      <CommonHero title={"Events"} />
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
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
