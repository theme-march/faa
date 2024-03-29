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
    content = <ErrorShow message={"There was a error"} />;
  }

  if (!isLoading && !isError && allDataInHome?.success === false) {
    content = <ErrorShow message={"No data found"} />;
  }

  if (!isLoading && !isError && allDataInHome?.success === true) {
    const { section_1, section_2, section_3, section_4, section_5, section_6 } =
      allDataInHome;
    content = (
      <>
        <AboutUs />

        <div className="ak-height-80 ak-height-lg-30"></div>
        <MilestoneProgram props={section_1[1]} />

        <div className="ak-height-80 ak-height-lg-30"></div>
        <DonationCareer props={section_2} />

        <div className="ak-height-80 ak-height-lg-30"></div>
        <RecentEvent props={section_3} />

        <div className="ak-height-80 ak-height-lg-30"></div>
        <MovingImg props={section_4} />

        <div className="ak-height-80 ak-height-lg-30"></div>
        <UncommingEvents props={section_5} />

        <div className="ak-height-80 ak-height-lg-30"></div>
        <NewsGrid props={section_6} />

        <div className="ak-height-80 ak-height-lg-30"></div>
      </>
    );
  }

  return content;
}
