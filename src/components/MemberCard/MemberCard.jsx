import React from "react";
import member from "../../assets/member/member_1.jpg";
export default function MemberCard({ props }) {
  return (
    <div className="col">
      <div className="member-card">
        <img
          src={
            props.member_image
              ? `http://174.138.171.172:3000/member/${props.member_image}`
              : member
          }
          alt="..."
          className="member-img"
        />
        <p className="member-name">{props?.name}</p>
        <p className="member-title">
          {props?.membership_category_id == 2
            ? "Honorary Member"
            : props?.membership_category_id == 3
            ? "Life time Member"
            : "General Member"}
        </p>
      </div>
    </div>
  );
}
