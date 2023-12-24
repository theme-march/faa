import React from "react";
import NewsGrid from "../components/NewsPublices/NewsGrid";
import UncommingEvents from "../components/UncommingEvents/UncommingEvents";
import MovingImg from "../components/MovingText/MovingImg";
import RecentEvent from "../components/RecentEvent/RecentEvent";
import DonationCareer from "../components/DonationCareer/DonationCareer";
import MilestoneProgram from "../components/MilestoneProgram/MilestoneProgram";
import AboutUs from "../components/AboutUs/AboutUs";

export default function Home() {
  return (
    <>
      <div className="ak-height-80 ak-height-lg-40"></div>
      <AboutUs />

      <div className="ak-height-100 ak-height-lg-60"></div>
      <MilestoneProgram />

      <div className="ak-height-100 ak-height-lg-60"></div>
      <DonationCareer />

      <div className="ak-height-100 ak-height-lg-60"></div>
      <RecentEvent />

      <div className="ak-height-100 ak-height-lg-60"></div>
      <MovingImg />

      <div className="ak-height-100 ak-height-lg-60"></div>
      <UncommingEvents />

      <div className="ak-height-100 ak-height-lg-60"></div>
      <NewsGrid />

      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
