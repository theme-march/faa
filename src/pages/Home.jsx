import React, { useEffect, useState } from "react";
import NewsGrid from "../components/NewsPublices/NewsGrid";
import UncommingEvents from "../components/UncommingEvents/UncommingEvents";
import MovingImg from "../components/MovingText/MovingImg";
import RecentEvent from "../components/RecentEvent/RecentEvent";
import DonationCareer from "../components/DonationCareer/DonationCareer";
import MilestoneProgram from "../components/MilestoneProgram/MilestoneProgram";
import AboutUs from "../components/AboutUs/AboutUs";
import { useGetHomeIdQuery } from "../features/home/homeApiIn";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

export default function Home() {
  const { data: allDataInHome, isLoading, isError } = useGetHomeIdQuery();

  let content = null;
  if (isLoading) {
    content = <HomeLoading />;
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"Item not found"} />;
  }

  if (!isLoading && !isError && allDataInHome?.success === false) {
    content = <ErrorShow message={"No data found"} />;
  }

  if (!isLoading && !isError && allDataInHome?.success === true) {
    const { section_2, section_3, section_4, section_5, section_6 } =
      allDataInHome;
    content = (
      <>
        <AboutUs />

        <div className="ak-height-80 ak-height-lg-30"></div>
        <MilestoneProgram />

        <div className="ak-height-80 ak-height-lg-30"></div>
        {section_2.length !== 0 ? (
          <DonationCareer props={section_2} />
        ) : (
          <p className="container">Data not load</p>
        )}
        <div className="ak-height-80 ak-height-lg-30"></div>
        {section_3.length !== 0 ? (
          <RecentEvent props={section_3} />
        ) : (
          <p className="container">Data not load</p>
        )}

        <div className="ak-height-80 ak-height-lg-30"></div>
        {section_4.length !== 0 ? (
          <MovingImg props={section_4} />
        ) : (
          <p className="container">Data not load</p>
        )}
        <div className="ak-height-80 ak-height-lg-30"></div>
        {section_5.length !== 0 ? (
          <UncommingEvents props={section_5} />
        ) : (
          <p className="container">Data not load</p>
        )}
        <div className="ak-height-80 ak-height-lg-30"></div>
        {section_6.length !== 0 ? (
          <NewsGrid props={section_6} />
        ) : (
          <p className="container">Data not load</p>
        )}
        <div className="ak-height-80 ak-height-lg-30"></div>
      </>
    );
  }

  return content;
}
