import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DateFormat from "../DateFormat/DateFormat";
import { ButtonMore } from "../Button/Button";
import MembershipCategorynNameFind from "./MembershipCategorynNameFind";

const MemberCard = ({ props }) => {
  const { id, name, hsc_passing_year, admin_approval, membership_category_id } =
    props;
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (id) navigate(`/member-details/${id}`);
  }, [id, navigate]);
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className="col h-100">
        <div className="member-card text-center h-100">
          <p className="member-name ak-primary-color ak-font-18">
            {name || "N/A"}
          </p>
          {hsc_passing_year && (
            <p className="member-name">
              <span className="ms-1 ak-font-16">HSC/Equivalent: </span>
              {hsc_passing_year.length > 10 ? (
                <DateFormat props={hsc_passing_year} onlyYear={true} />
              ) : (
                hsc_passing_year
              )}
            </p>
          )}
          {admin_approval !== 0 && membership_category_id && (
            <MembershipCategorynNameFind id={membership_category_id} />
          )}
          <ButtonMore to={`/member-details/${id}`}>
            <span className="details-btn">Details</span>
          </ButtonMore>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MemberCard);
