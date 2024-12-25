import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetMemberDetailsIdQuery,
  useMemberUpdatePasswordMutation,
} from "../features/member/memberApiIn";
import ErrorShow from "../components/UI/ErrorShow";
import DateFormat from "../components/DateFormat/DateFormat";
import { toast } from "react-toastify";
import demoImgMember from "../assets/member/member_1.jpg";
import MembershipCategorynNameFind from "../components/MemberCard/MembershipCategorynNameFind";

export default function MemberDetails() {
  const { id } = useParams();
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const {
    data: singalMember,
    isLoading,
    isError,
  } = useGetMemberDetailsIdQuery(id);

  const [memberUpdatePassword] = useMemberUpdatePasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast.info("New And Confirm passwords do not match.", toastOptions);
      return;
    }

    try {
      // Assume a function `updatePassword` exists in your API utility
      const fromData = {
        member_id: id,
        current_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };

      const response = await memberUpdatePassword(fromData);

      if (response.data.success === true) {
        toast.success(response.data.message, toastOptions);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.info(response.data.message, toastOptions);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", toastOptions);
    }
  };

  if (isError) {
    return <ErrorShow message={"There was an error"} />;
  }

  if (!isLoading && !singalMember?.success) {
    return <ErrorShow message={"No data found"} />;
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

            {is_pay === 0 && (
              <Link
                to={`/members-payment/${id}`}
                className="button-primary mt-4"
              >
                Renewal
              </Link>
            )}
          </div>
        </div>

        {/* Password Update Section */}
        {loginUser.email === email &&
          parseInt(loginUser.id) === parseInt(id) && (
            <div className="password-update mt-5">
              <h5 className="mb-4 text-uppercase">Update Password</h5>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePasswordUpdate();
                }}
              >
                <div className="form-group mb-3">
                  <label>Old Password</label>
                  <div className="input-group flex-nowrap">
                    <input
                      type={showPassword.old ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="text-input-filed type_2"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => togglePasswordVisibility("old")}
                    >
                      {showPassword.old ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="form-group  mb-3">
                  <label>New Password</label>
                  <div className="input-group flex-nowrap">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="form-control text-input-filed type_2"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => togglePasswordVisibility("new")}
                    >
                      {showPassword.new ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label>Confirm New Password</label>
                  <div className="input-group flex-nowrap">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="text-input-filed type_2"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => togglePasswordVisibility("confirm")}
                    >
                      {showPassword.confirm ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <button type="submit" className="button-primary mt-3">
                  Update Password
                </button>
              </form>
            </div>
          )}
        <div className="ak-height-80 ak-height-lg-30"></div>
      </div>
    );
  }
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
