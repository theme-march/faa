import React from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import JobCard from "../components/ApplyJob/JobCard";

export default function Career() {
  return (
    <>
      <CommonHero title={"About Us"} />
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="container container-max-width-910">
        <div className="d-flex gap-3">
          <button className="gray-round-btn">Job Board</button>
          <button className="gray-round-btn">Designer Search</button>
        </div>
        <div className="ak-height-35 ak-height-lg-35"></div>
        <form>
          <input
            type="email"
            autoComplete="current-email"
            className="text-input-filed type_2"
            id="inputEmail"
            placeholder="Search by company, skill, tag…"
          />
        </form>
        <div className="ak-height-40 ak-height-lg-40"></div>
        <div className="react-post">
          <h2 className="mb-3 fw-bolder">Recent posts</h2>
          <p>1 new opportunity posted today!</p>
        </div>
        <div className="ak-height-40 ak-height-lg-40"></div>
        <div>
          <JobCard />
        </div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
