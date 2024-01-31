import React, { useEffect, useState } from "react";
import JobCard from "../components/ApplyJob/JobCard";

const joblist = [
  {
    title: "Head of Treasury",
    type: "application",
    experience: "Years of experience 20",
    details:
      "The Google logo appears in numerous settings to identify the search engine company. Google has used several logos over its history",
  },
  {
    title: "web Development",
    type: "web",
    experience: "Years of experience 20",
    details:
      "The Google logo appears in numerous settings to identify the search engine company. Google has used several logos over its history",
  },
  {
    title: "Design ui/ux",
    type: "design",
    experience: "Years of experience 20",
    details:
      "The Google logo appears in numerous settings to identify the search engine company. Google has used several logos over its history",
  },
];
export default function Career() {
  const [formData, setFormData] = useState("");
  const [jobslist, setjobslist] = useState([]);
  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };

  useEffect(() => {
    const filterList = joblist.filter((item) => {
      const itemName = item.title.toLowerCase();
      const userTypeText = formData.toLowerCase();
      return itemName.indexOf(userTypeText) > -1;
    });

    if (filterList) {
      setjobslist(filterList);
    } else {
      setjobslist(joblist);
    }
  }, [formData]);

  return (
    <>
      <div className="ak-height-50 ak-height-lg-60"></div>
      <div className="container container-max-width-910">
        <div className="ak-height-35 ak-height-lg-35"></div>
        {/* <form method="POST"> */}
        <div className="d-flex gap-3">
          <input
            type="text"
            className="text-input-filed w-100"
            id="Search"
            name="search_job"
            value={formData || ""}
            placeholder="Job Search"
            onChange={handleInputChange}
          />
          {/* <button className="gray-round-btn w-25" type="submit">
            Job Search
          </button> */}
        </div>
        {/* </form> */}
        <div className="ak-height-30 ak-height-lg-30"></div>
        <div className="react-post">
          <h2 className="mb-3 fw-bolder">Recent posts</h2>
          <p>{jobslist?.length} Total Search Job List</p>
        </div>
        {/* <div className="ak-height-25 ak-height-lg-25"></div> */}
        <div>
          {jobslist?.map((job, index) => (
            <JobCard key={index} props={job} />
          ))}
        </div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
