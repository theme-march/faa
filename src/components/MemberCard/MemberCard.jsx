import React from "react";
import member from "../../assets/member/member_1.jpg";
export default function MemberCard({ props }) {
  return (
    <div className="col">
      <div className="member-card">
        <img src={member} alt="..." className="member-img" />
        <p className="member-name">{props.name}</p>
        <p className="member-title">Member</p>
      </div>
    </div>
  );
}
