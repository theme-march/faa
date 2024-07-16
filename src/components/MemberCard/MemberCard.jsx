import React from "react";
import member from "../../assets/member/member_1.jpg";
import DateFormat from "../DateFormat/DateFormat";
import { Link, useNavigate } from "react-router-dom";
import { ButtonMore } from "../Button/Button";
export default function MemberCard({ props }) {
  const navigator = useNavigate();

  const handerClick = (id) => {
    navigator(`/member-details/${id}`);
  };

  return (
    <div onClick={() => handerClick(props.id)} className="cursor-pointer">
      <div className="col h-100">
        <div className="member-card text-center  h-100">
          {/*  <img
            src={
              props?.member_image
                ? `/images/member/${props.member_image}`
                : member
            }
            alt="..."
            className="member-img"
          /> */}
          <p className="member-name ak-primary-color member-name ak-font-18">
            {props?.name}
          </p>
          {props?.hsc_passing_year && (
            <p className="member-name">
              <span className="ms-1 ak-font-16"> HSC/Eqvelitent: </span>
              {props?.hsc_passing_year?.length > 10 ? (
                <DateFormat props={props?.hsc_passing_year} onlyYear={true} />
              ) : (
                props?.hsc_passing_year
              )}
            </p>
          )}
          {props?.admin_approval !== 0 && (
            <p className="member-title text-dark mb-2 ak-font-16">
              {props?.membership_category_id == 2
                ? "Honorary Member"
                : props?.membership_category_id == 3
                ? "Life time Member"
                : props?.membership_category_id == 4
                ? "General Member"
                : "Registration Member"}
            </p>
          )}

          <ButtonMore to={`/member-details/${props?.id}`}>
            <span className="details-btn">Details</span>
          </ButtonMore>
        </div>
      </div>
    </div>
  );
}
