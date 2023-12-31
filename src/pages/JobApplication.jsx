import React from "react";
import JobApplicationFrom from "../components/JobApplicationFrom/JobApplicationFrom";
import SectionTitle from "../components/SectionTitle/SectionTitle";

export default function JobApplication() {
  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-60"></div>
      <SectionTitle>Job Application</SectionTitle>
      <JobApplicationFrom />

      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
