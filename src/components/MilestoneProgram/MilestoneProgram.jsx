import React from "react";
import { ButtonMore } from "../Button/Button";

export default function MilestoneProgram({ props }) {
  const { details, title, url } = props?.details;
  return (
    <div className="container">
      <div className="row align-items-center justify-content-between gap-5">
        <div className="col-lg-5">
          <div>
            <h2>{title}</h2>
            <div className="ak-height-25 ak-height-lg-20"></div>
            <p dangerouslySetInnerHTML={{ __html: details }} />
            <div className="ak-height-25 ak-height-lg-20"></div>
            <ButtonMore to={url}>VIEW MORE</ButtonMore>
          </div>
        </div>
        <div className="col-lg-6">
          <img
            src={`http://174.138.171.172:3000/home_page_image/${props?.media_data[1].image}`}
            className="w-100"
            alt="..."
          />
        </div>
      </div>
    </div>
  );
}
