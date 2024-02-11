import React, { useEffect, useState } from "react";
import JobCard from "../components/ApplyJob/JobCard";
import { useGetJobsListQuery } from "../features/jobList/jobApiInject";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

export default function Career() {
  const [formData, setFormData] = useState("");
  const [jobsList, setjobslist] = useState([]);

  const { data: jobsListFetchData, isLoading, isError } = useGetJobsListQuery();

  let content = null;
  if (isLoading) {
    content = [1, 2, 3, 4, 5, 6].map((event, i) => <HomeLoading key={i} />);
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"There was a error"} />;
  }

  if (!isLoading && !isError && jobsListFetchData?.result.length < 0) {
    content = <ErrorShow message={"No data found"} />;
  }

  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };

  useEffect(() => {
    if (!isLoading && !isError && jobsListFetchData?.result.length > 0) {
      const filterList = jobsListFetchData?.result?.filter((item) => {
        const itemName = item.job_title.toLowerCase();
        const userTypeText = formData.toLowerCase();
        return itemName.indexOf(userTypeText) > -1;
      });

      if (filterList) {
        setjobslist(filterList);
      } else {
        setjobslist(jobsListFetchData);
      }
    }
  }, [formData, jobsListFetchData]);

  if (jobsList.length > 0) {
    content = jobsList?.map((job, index) => (
      <JobCard key={index} props={job} />
    ));
  }

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
          <p>{jobsList?.length} Total Search Job List</p>
        </div>
        <div>{content}</div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
