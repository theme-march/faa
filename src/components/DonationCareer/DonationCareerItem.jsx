import React from "react";
import { ButtonPrimary } from "../Button/Button";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export default function DonationCareerItem() {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm border-1">
        <div className="card-body p-0">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="ms-2">Career Connection</h6>
            <ButtonPrimary>Donate</ButtonPrimary>
          </div>
          <div className="ak-border-width"></div>
          <div className="ak-height-30 ak-height-lg-20"></div>
          <div className="p-3">
            <img src="donner_1.png" alt="..." />
            <div className="ak-height-20 ak-height-lg-10"></div>
            <Link to={"/"} className="card-title fw-semibold">
              Career Connection
            </Link>
            <p className="card-text">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words
            </p>
            <div className="ak-height-20 ak-height-lg-10"></div>
            <Link to="/" className="arrow-icon-anim">
              Read More <IoIosArrowForward />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
