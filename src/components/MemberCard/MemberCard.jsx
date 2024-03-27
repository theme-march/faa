import React from "react";
import member from "../../assets/member/member_1.jpg";
import DateFormat from "../DateFormat/DateFormat";
import { Link } from "react-router-dom";
export default function MemberCard({ props }) {
  return (
    <Link to={`/member-details/${props?.id}`}>
      <div className="col h-100">
        <div className="member-card  h-100">
          <img
            src={
              props?.member_image
                ? `/images/member/${props.member_image}`
                : member
            }
            alt="..."
            className="member-img"
          />
          <p className="member-name ak-primary-color">{props?.name}</p>
          {props?.hsc_passing_year && (
            <p className="member-name">
              <span className="ms-1"> HSC/Eqvelitent: </span>
              {props?.hsc_passing_year?.length > 10 ? (
                <DateFormat props={props?.hsc_passing_year} onlyYear={true} />
              ) : (
                props?.hsc_passing_year
              )}
            </p>
          )}
          {props?.admin_approval !== 0 && (
            <p className="member-title text-dark">
              {props?.membership_category_id == 2
                ? "Honorary Member"
                : props?.membership_category_id == 3
                ? "Life time Member"
                : props?.membership_category_id == 4
                ? "General Member"
                : "Abumni Member"}
            </p>
          )}
          <p className="member-title">
            {" "}
            {props?.admin_approval == 0 && "Registration pending"}
          </p>
        </div>
      </div>
    </Link>
  );
}
