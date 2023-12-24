import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { ButtonWhite } from "../Button/Button";
import EventItem from "./EventItem";

export default function RecentEvent() {
  return (
    <div className="container">
      <SectionTitle>Our Recent Events</SectionTitle>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <EventItem />
        <EventItem />
        <EventItem />
      </div>
      <div className="ak-height-40 ak-height-lg-30"></div>
      <div className="text-center">
        <ButtonWhite to={"/"}>View All</ButtonWhite>
      </div>
    </div>
  );
}
