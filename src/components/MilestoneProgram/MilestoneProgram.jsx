import React from "react";
import { ButtonMore } from "../Button/Button";

export default function MilestoneProgram() {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-between gap-5">
        <div className="col-lg-5">
          <div>
            <h1>Milestone Program</h1>
            <div className="ak-height-25 ak-height-lg-20"></div>
            <p>
              <strong>History:</strong> is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's stan.
              text of the printing and typesetting
            </p>
            <div className="ak-height-25 ak-height-lg-20"></div>
            <p>
              <strong>Mission, Vision, and Values:</strong> is simply dummy text
              of the printing and typesetting industry. Lorem Ipsum has been the
              industry's stan. text of the printing and typesetting
            </p>
            <div className="ak-height-25 ak-height-lg-20"></div>
            <ButtonMore to={"/"}>VIEW MORE</ButtonMore>
          </div>
        </div>
        <div className="col-lg-6">
          <img src="milestone_1.jpg" className="w-100" alt="..." />
        </div>
      </div>
    </div>
  );
}
