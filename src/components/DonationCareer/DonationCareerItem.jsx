import React from "react";
import { ButtonPrimary } from "../Button/Button";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export default function DonationCareerItem({ props }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm border-1">
        <div className="card-body p-0">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="ms-2">{props?.title}</h6>
            <ButtonPrimary to={`/donation/${props?.id}`}>Donate</ButtonPrimary>
          </div>
          <div className="ak-border-width"></div>
          <div className="ak-height-30 ak-height-lg-20"></div>
          <div className="p-3">
            <img
              src={`http://localhost:3000/donation_career/${props?.image}`}
              alt="..."
            />
            <div className="ak-height-20 ak-height-lg-10"></div>
            <Link
              to={`/donation/${props?.id}`}
              className="card-title fw-semibold"
            >
              {props?.title}
            </Link>
            <p
              className="card-text"
              dangerouslySetInnerHTML={{ __html: props?.details }}
            />
            <div className="ak-height-20 ak-height-lg-10"></div>
            <Link to={`/donation/${props?.id}`} className="arrow-icon-anim">
              Read More <IoIosArrowForward />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
