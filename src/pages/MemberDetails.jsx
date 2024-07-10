import React from "react";
import { useParams } from "react-router-dom";
import { useGetMemberDetailsIdQuery } from "../features/member/memberApiIn";
import ErrorShow from "../components/UI/ErrorShow";
import DateFormat from "../components/DateFormat/DateFormat";

import demoImgMember from "../assets/member/member_1.jpg";

export default function MemberDetails() {
  const { id } = useParams();
  const {
    data: singalMember,
    isLoading,
    isError,
  } = useGetMemberDetailsIdQuery(id);

  if (isError) {
    return <ErrorShow message={"There was an error"} />;
  }

  if (!isLoading && !singalMember?.success) {
    return <ErrorShow message={"No data found"} />;
  }

  const loginUser = JSON.parse(localStorage.getItem("user"));

  if (loginUser?.admin_approval !== 1) {
    return (
      <div className="container">
        <div className="ak-height-80 ak-height-lg-30"></div>
        <h2 className="text-center">You are not an approved member </h2>
      </div>
    );
  }

  if (!isLoading && singalMember?.success) {
    const {
      address,
      email,
      hsc_passing_year,
      member_image,
      name,
      occupation,
      organization_name,
      phone_number,
      session,
      membership_category_id,
      membership_number,
    } = singalMember.result;

    return (
      <div className="container">
        <div className="ak-height-80 ak-height-lg-30"></div>
        <div className="row d-flex justify-content-between">
          <div className="col-md-4">
            {member_image ? (
              <img
                src={`/images/member/${member_image}`}
                className="col-12"
                alt="member"
              />
            ) : (
              <img src={demoImgMember} className="col-12" alt="member" />
            )}
          </div>
          <div className="col-md-7">
            <div className="ak-height-lg-30"></div>
            <RenderDetailRow label="Address" value={address} />
            <RenderDetailRow label="Name" value={name} />
            <RenderDetailRow label="Email" value={email} />
            <RenderDetailRow
              label="Membership number"
              value={membership_number}
            />
            <RenderDetailRow
              label="HSC Passing Year"
              value={
                hsc_passing_year?.length > 10 ? (
                  <DateFormat props={hsc_passing_year} onlyYear={true} />
                ) : (
                  hsc_passing_year
                )
              }
            />
            <RenderDetailRow label="Session" value={session} />
            <RenderDetailRow label="Occupation" value={occupation} />
            <RenderDetailRow label="Organization" value={organization_name} />
            <RenderDetailRow label="Phone Number" value={phone_number} />
          </div>
        </div>
        <div className="ak-height-80 ak-height-lg-30"></div>
      </div>
    );
  }
}

function RenderDetailRow({ label, value }) {
  return (
    label &&
    value && (
      <div className="d-flex gap-3 align-items-center  p-2">
        <h6>{label}:</h6>
        <p>{value}</p>
      </div>
    )
  );
}
