import React from "react";
import CommonHero from "../components/CommonHero/CommonHero";

export default function About() {
  const AboutUsTags = [
    "History",
    "Objectives",
    "Constitution",
    "Executive Committee",
  ];
  return (
    <>
      <CommonHero title={"About Us"} />
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div></div>

      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
