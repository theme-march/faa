import React, { useCallback, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function TermsCondition() {
  const location = useLocation();

  // Function to parse the query parameters from the URL
  const getQueryParams = useCallback((search) => {
    return new URLSearchParams(search);
  }, []);

  const queryParams = getQueryParams(location.search);
  const title = queryParams.get("id");

  const termsRef = useRef(null);
  const privacyRef = useRef(null);
  const refundRef = useRef(null);

  useEffect(() => {
    const scrollToRef = (ref) => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    switch (title) {
      case "termsconditions":
        scrollToRef(termsRef);
        break;
      case "privacypolicy":
        scrollToRef(privacyRef);
        break;
      case "refundpolicy":
        scrollToRef(refundRef);
        break;
      default:
        // Handle unrecognized id, maybe redirect or display an error message
        console.warn(`Unrecognized id: ${title}`);
        break;
    }
  }, [title]);

  return (
    <div className="container">
      <div className="ak-height-60 ak-height-lg-60"></div>

      <div id="termsconditions" ref={termsRef}>
        <h2 className="ak-primary-color text-center my-5">
          Terms and Conditions
        </h2>
        <Link to="/about?id=Constitution" className="text-decoration-underline">
          Refers to the constitution
        </Link>
      </div>

      <div id="privacypolicy" ref={privacyRef}>
        <h2 className="ak-primary-color text-center mb-5">Privacy Policy</h2>
        <p>
          Finance Alumni Association (FAA) of Dhaka University operates the
          functional website,{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.faa-dubd.org"
            className="text-decoration-underline text-primary"
          >
            https://www.faa-dubd.org
          </a>{" "}
          to facilitate informative services on its activities as well as to
          receive member-subscriptions, donations, sponsorship fees, event
          registration fees, etc. This page informs you of our policies
          regarding the collection, use, and disclosure of personal data.
          Information Collection And Use Finance Alumni Association collect/use
          data which must needed to run its operation such as the
          Alumni/member/subscriber/donor/sponsors. Store Republic provide proper
          notification before collecting any data where users have the ability
          to allow/disallow permission to collect their information. Types of
          Data Collected Personal Data While using our Service, we may ask you
          to provide us with certain personally identifiable information that
          can be used to contact or identify you (“Personal Data”). Personally
          identifiable information may include, but is not limited to:
        </p>
        <ul>
          <li>• Email address</li>
          <li>• First name and last name</li>
          <li>• Phone number</li>
          <li>• Address</li>
        </ul>
      </div>

      <div id="refundpolicy" ref={refundRef}>
        <h2 className="ak-primary-color text-center my-5">Refund Policy</h2>
        <p>
          All types of payment including, but not limited to membership
          subscription, contribution, donation, advertisement received by the
          Association are non-refundable. However, if any payment is made to the
          Association in error, then the paying party should apply to the
          treasurer for a refund. Such refund shall be made expeditiously on a
          best effort basis.
        </p>
      </div>

      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
