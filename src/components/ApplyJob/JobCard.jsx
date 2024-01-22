import React from "react";
import job_1 from "../../assets/job_1.jpg";

export default function JobCard() {
  return (
    <div className="job-card">
      <div className="left-side">
        <div className="job-img">
          <img src={job_1} alt="job_1" />
        </div>
        <div className="job-desp">
          <p>One Bank Ltd</p>
          <h5>Head of Treasury</h5>
          <p>
            The Google logo appears in numerous settings to identify the search
            engine company. Google has used several logos over its history
          </p>
          <p>
            <span>Experience:</span> Years of experience 20
          </p>
        </div>
      </div>
      <div className="right-side">
        <button className="button-primary mb-md-5 mb-2">Apply Now</button>
        <div className="d-flex align-items-center gap-2 justify-content-md-end">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="15"
              viewBox="0 0 11 15"
              fill="none"
            >
              <path
                d="M5.70176 0.5C2.20117 0.5 0.451172 3.125 0.451172 5.75C0.451172 8.375 5.70176 14.5 5.70176 14.5C5.70176 14.5 10.9512 8.375 10.9512 5.75C10.9512 3.125 9.20117 0.5 5.70176 0.5ZM5.70117 7.5C4.73459 7.5 3.95117 6.71658 3.95117 5.75C3.95117 4.78342 4.73459 4 5.70117 4C6.66776 4 7.45117 4.78342 7.45117 5.75C7.45117 6.71658 6.66776 7.5 5.70117 7.5Z"
                fill="#3D3D4E"
              />
            </svg>
          </div>
          <p>Dhaka, Bangladesh</p>
        </div>
        <div className="d-flex gap-3 justify-content-md-end">
          <p>
            <span className="fw-semibold ak-black-color">Posted:</span> 2 Days
            ago,
          </p>
          <p>
            <span className="fw-semibold ak-black-color">Deadline:</span>{" "}
            30/12/2024
          </p>
        </div>
      </div>
    </div>
  );
}
