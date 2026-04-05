import React from "react";
import { Link, useParams } from "react-router-dom";
import CommonHero from "../components/CommonHero/CommonHero";
import Shimmer from "../components/Shimmer/Shimmer";
import { useGetExecutiveCommitteeMemberDetailsQuery } from "../features/pageDetails/pageDetails";

const getExecutiveMemberImage = (image) => {
  const value = String(image || "").trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/")) return value;
  return `/images/executive_committee_images/${value}`;
};

export default function CommitteeMemberDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetExecutiveCommitteeMemberDetailsQuery(id);
  const member = data?.result;

  return (
    <>
      <CommonHero title="Executive Committee Member" />
      <div className="ak-height-80 ak-height-lg-50" />
      <div className="container">
        {isLoading && <Shimmer />}

        {!isLoading && error && (
          <p className="text-center text-danger">
            Failed to load committee member details.
          </p>
        )}

        {!isLoading && !error && !member && (
          <p className="text-center">Committee member not found.</p>
        )}

        {!isLoading && !error && member && (
          <div className="executive-member-details-card">
            <div className="executive-member-details-top">
              <img
                src={
                  getExecutiveMemberImage(member.image) ||
                  "https://via.placeholder.com/260x260?text=No+Image"
                }
                alt={member?.name || "Executive Member"}
                className="executive-member-details-image"
              />
              <div className="executive-member-details-head">
                <h2>{member?.name || "-"}</h2>
                <p>{member?.designation || "-"}</p>
                <div className="executive-member-details-meta">
                  <span>{member?.email || "-"}</span>
                  <span>{member?.phone || "-"}</span>
                </div>
              </div>
            </div>

            <div className="executive-member-details-bio">
              <h4>Profile</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: member?.bio || "<p>No profile information available.</p>",
                }}
              />
            </div>

            <div className="executive-member-details-actions">
              <Link to="/about?id=Executive%20Committee" className="btn-style-1">
                Back To About
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="ak-height-100 ak-height-lg-60" />
    </>
  );
}
