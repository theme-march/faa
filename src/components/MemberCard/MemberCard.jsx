import React from "react";
import member from "../../assets/member/member_1.jpg";
import DateFormat from "../DateFormat/DateFormat";
export default function MemberCard({ props }) {
  return (
    <div className="col">
      <div className="member-card  h-100">
        <img
          src={
            props.member_image
              ? `http://174.138.171.172:3000/member/${props.member_image}`
              : member
          }
          alt="..."
          className="member-img"
        />
        <p className="member-name ak-primary-color">{props?.name}</p>
        <p className="member-name">
          <span className="ms-1"> HSC/Eqvelitent: </span>
          {props?.hsc_passing_year.length > 10 ? (
            <DateFormat props={props?.hsc_passing_year} onlyYear={true} />
          ) : (
            props?.hsc_passing_year
          )}
        </p>
        {props.admin_approval !== 0 && (
          <p className="member-title">
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
  );
}
