import React from "react";
import { ButtonMore } from "../Button/Button";

export default function MilestoneProgram({ props }) {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-between gap-5">
        <div className="col-lg-5">
          <div>
            <h1>{props?.title}</h1>
            <div className="ak-height-25 ak-height-lg-20"></div>
            <p>{props?.details}</p>
            <div className="ak-height-25 ak-height-lg-20"></div>
            <p>{props?.details}</p>
            <div className="ak-height-25 ak-height-lg-20"></div>
            <ButtonMore to={props?.url}>VIEW MORE</ButtonMore>
          </div>
        </div>
        <div className="col-lg-6">
          <img src="milestone_1.jpg" className="w-100" alt="..." />
        </div>
      </div>
    </div>
  );
}
