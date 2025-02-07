import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetMemberDetailsIdQuery } from "../features/member/memberApiIn";
import ErrorShow from "../components/UI/ErrorShow";
import DateFormat from "../components/DateFormat/DateFormat";
import demoImgMember from "../assets/member/member_1.jpg";
import MembershipCategorynNameFind from "../components/MemberCard/MembershipCategorynNameFind";
import HomeLoading from "../components/UI/HomeLoading";

export default function MemberDetails() {
  const loginUser = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();
  const {
    data: singalMember,
    isLoading,
    isError,
  } = useGetMemberDetailsIdQuery(id);

  let content = null;

  if (isLoading) {
    content = (
      <div>
        <HomeLoading />
        <div className="ak-height-80 ak-height-lg-30"></div>
      </div>
    );
  }

  if (isError) {
    content = <ErrorShow message={"There was an error"} />;
  }

  if (!isLoading && !isError && !singalMember?.success) {
    content = <ErrorShow message={"No data found"} />;
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
      is_pay,
      admin_approval,
      amount,
    } = singalMember?.result;
    content = (
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
            <RenderDetailRow label="Name" value={name} />
            <RenderDetailRow label="Address" value={address} />
            <RenderDetailRow label="Email" value={email} />
            <RenderDetailRow
              label="Membership Number"
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
            <MembershipCategorynNameFind
              label="Membership Category"
              id={membership_category_id}
            />

            <div className="d-flex gap-3 align-items-center p-2">
              <h6>Approval Status: </h6>
              <p>{admin_approval === 1 ? "Approved" : "Not Approved"}</p>
            </div>

            <div className="d-flex gap-3 align-items-center p-2">
              <h6>Payment Status: </h6>
              <p>
                {is_pay === 1 ? (
                  <span className="text-success">Paid</span>
                ) : (
                  <span className="text-danger">Unpaid</span>
                )}
              </p>
            </div>
            <div className="d-flex gap-2">
              {is_pay === 0 && (
                <Link
                  to={`/members-payment/${id}`}
                  className="button-primary mt-4"
                >
                  Renewal
                </Link>
              )}
              {loginUser && loginUser?.email === email && (
                <>
                  <Link
                    to={`/member-details-update/${id}`}
                    className="button-primary mt-4"
                  >
                    Profile Update
                  </Link>
                  <Link
                    to={`/member-password-update/${id}`}
                    className="button-primary mt-4"
                  >
                    Change Password
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="ak-height-80 ak-height-lg-30"></div>
      </div>
    );
  }
  return content;
}

function RenderDetailRow({ label, value }) {
  return (
    label &&
    value && (
      <div className="d-flex gap-3 align-items-center p-2">
        <h6>{label}:</h6>
        <p>{value}</p>
      </div>
    )
  );
}
