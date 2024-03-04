import React, { useEffect, useState } from "react";
import JobCard from "../components/ApplyJob/JobCard";
import { useGetJobsListQuery } from "../features/jobList/jobApiInject";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

export default function Career() {
  const [formData, setFormData] = useState("");
  const [jobsList, setJobsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: jobsListFetchData, isLoading, isError } = useGetJobsListQuery();

  useEffect(() => {
    if (jobsListFetchData?.result) {
      setJobsList(jobsListFetchData.result);
    }
  }, [jobsListFetchData]);

  const handleInputChange = (e) => {
    setCurrentPage(1);
    setFormData(e.target.value);
  };

  const filteredJobs = jobsList.filter((job) =>
    job.job_title.toLowerCase().includes(formData.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  let content = null;
  if (isLoading) {
    content = Array.from({ length: itemsPerPage }, (_, i) => (
      <HomeLoading key={i} />
    ));
  } else if (isError) {
    content = <ErrorShow message={"There was a error"} />;
  } else if (filteredJobs.length === 0) {
    content = <ErrorShow message={"No data found"} />;
  } else {
    content = currentJobs.map((job, index) => (
      <JobCard key={index} props={job} />
    ));
  }

  return (
    <>
      <div className="ak-height-50 ak-height-lg-60"></div>
      <div className="container container-max-width-910">
        <div className="ak-height-35 ak-height-lg-35"></div>
        <div className="d-flex gap-3">
          <input
            type="text"
            className="text-input-filed w-100"
            id="Search"
            name="search_job"
            value={formData}
            placeholder="Job Search"
            onChange={handleInputChange}
          />
        </div>
        <div className="ak-height-30 ak-height-lg-30"></div>
        <div className="react-post">
          <h2 className="mb-3 fw-bolder">Recent posts</h2>
          <p>{filteredJobs.length} Total Search Job List</p>
        </div>
        <div>{content}</div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredJobs.length}
          paginate={paginate}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
  nextPage,
  prevPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="pagination my-4">
        <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
          <button onClick={prevPage} className="page-link">
            prev
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item${currentPage === number ? " active" : ""}`}
          >
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li
          className={`page-item${
            currentPage === totalPages ? " disabled" : ""
          }`}
        >
          <button onClick={nextPage} className="page-link">
            next
          </button>
        </li>
      </ul>
    </nav>
  );
};
