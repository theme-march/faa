import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import CommonHero from "../components/CommonHero/CommonHero";
import usePagesDetails from "../hook/usePagesDetails";
import Shimmer from "../components/Shimmer/Shimmer";
import {
  useGetAboutUsMessageQuery,
  useGetExecutiveCommitteeMembersQuery,
} from "../features/pageDetails/pageDetails";
import { useLocation, useNavigate } from "react-router-dom";

const getExecutiveMemberImage = (image) => {
  const value = String(image || "").trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/")) return value;
  return `/images/executive_committee_images/${value}`;
};

const toTitleCase = (value) => {
  return String(value || "")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const normalizeDesignationKey = (designation) => {
  const value = String(designation || "").trim().toLowerCase();
  if (!value) return "";
  if (value.includes("vice president")) return "Vice President";
  if (value.includes("president") && !value.includes("vice")) return "President";
  if (value.includes("general secretary")) return "General Secretary";
  if (value.includes("joint secretary")) return "Joint Secretary";
  if (value.includes("treasurer")) return "Treasurer";
  if (value.includes("organizing secretary")) return "Organizing Secretary";
  if (value.includes("media and publication")) return "Media and Publication Secretary";
  if (value.includes("cultural secretary")) return "Cultural Secretary";
  if (value.includes("social welfare secretary")) return "Social Welfare Secretary";
  if (value.includes("professional development secretary")) return "Professional Development Secretary";
  if (value === "member" || value.endsWith(" member")) return "Executive Members";
  if (value.includes("immediate past president")) return "Immediate Past President";
  if (value.includes("ex-officio")) return "Ex-officio Member";
  return toTitleCase(value);
};

const isFeaturedCommitteeOrder = (member) => {
  const order = Number(member?.display_order);
  return order === 1 || order === 2;
};

export default function About() {
  const navigate = useNavigate();
  const pagesDetails = usePagesDetails();
  const [allSection, setAllSection] = useState({});
  const { data, error, isLoading } = useGetAboutUsMessageQuery();
  const {
    data: executiveCommitteeData,
    isLoading: committeeLoading,
    error: committeeError,
  } = useGetExecutiveCommitteeMembersQuery();
  const location = useLocation();
  const [fetchError, setFetchError] = useState(null);
  const executiveSectionRef = useRef(null);

  // This function will parse the query parameters from the URL
  const getQueryParams = useCallback((search) => {
    return new URLSearchParams(search);
  }, []);

  const queryParams = useMemo(
    () => getQueryParams(location.search),
    [location.search, getQueryParams]
  );
  const title = queryParams.get("id"); // Get the 'id' query parameter
  const EXECUTIVE_MENU_TITLE = "Executive Committee";

  const pageMenuItems = useMemo(() => {
    const rows = Array.isArray(pagesDetails?.result) ? pagesDetails.result : [];
    return rows.filter(
      (item) =>
        String(item?.title || "")
          .trim()
          .toLowerCase() !== EXECUTIVE_MENU_TITLE.toLowerCase()
    );
  }, [pagesDetails?.result]);

  const handler = useCallback(
    (title) => {
      try {
        if (
          String(title || "")
            .trim()
            .toLowerCase() === EXECUTIVE_MENU_TITLE.toLowerCase()
        ) {
          setAllSection({
            title: EXECUTIVE_MENU_TITLE,
            details: "",
            _isExecutiveOnly: true,
          });
          requestAnimationFrame(() => {
            executiveSectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          });
          return;
        }

        const content = pagesDetails?.result?.find(
          (element) => element.title === title
        );
        setAllSection(content);
        if (
          String(title || "")
            .toLowerCase()
            .includes("executive committee")
        ) {
          requestAnimationFrame(() => {
            executiveSectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          });
        }
      } catch (err) {
        setFetchError("An error occurred while fetching the page details.");
        console.error(err);
      }
    },
    [pagesDetails]
  );

  useEffect(() => {
    try {
      if (!allSection?.title && pageMenuItems?.length > 0) {
        const normalizedQueryTitle = String(title || "")
          .trim()
          .toLowerCase();
        if (normalizedQueryTitle === EXECUTIVE_MENU_TITLE.toLowerCase()) {
          setAllSection({
            title: EXECUTIVE_MENU_TITLE,
            details: "",
            _isExecutiveOnly: true,
          });
          return;
        }

        const initialSection = pageMenuItems?.find(
          (element) =>
            String(element?.title || "")
              .trim()
              .toLowerCase() === normalizedQueryTitle
        );
        const targetSection = initialSection || pageMenuItems[0];
        setAllSection(targetSection);
      }
    } catch (err) {
      setFetchError("An error occurred while initializing the section.");
      console.error(err);
    }
  }, [allSection, pageMenuItems, title]);

  let content;
  if (isLoading) {
    content = <Shimmer />;
  } else if (error || fetchError) {
    content = <div>Error loading data: {error?.message || fetchError}</div>;
  } else if (pageMenuItems?.length > 0) {
    const menuItems = [
      ...pageMenuItems,
      { id: "executive-committee", title: EXECUTIVE_MENU_TITLE, _isExecutiveOnly: true },
    ];
    content = menuItems.map((page) => (
      <div
        key={page.id}
        className={`cursor-pointer ak-primary-color-hover about-nav-item ${
          allSection?.title === page.title ? "is-active" : ""
        }`}
      >
        <p onClick={() => handler(page.title)}>{page.title}</p>
      </div>
    ));
  }

  const committeeMembers = useMemo(() => {
    const rows = Array.isArray(executiveCommitteeData?.result)
      ? [...executiveCommitteeData.result]
      : [];
    return rows.sort((a, b) => {
      const orderA = Number(a?.display_order ?? 999999);
      const orderB = Number(b?.display_order ?? 999999);
      if (orderA !== orderB) return orderA - orderB;
      return Number(a?.id ?? 0) - Number(b?.id ?? 0);
    });
  }, [executiveCommitteeData]);

  const committeeSectionTitle = useMemo(() => {
    const directTitleCandidates = [
      executiveCommitteeData?.committee_title,
      executiveCommitteeData?.executive_committee_title,
      executiveCommitteeData?.title,
      executiveCommitteeData?.name,
      executiveCommitteeData?.meta?.committee_title,
      executiveCommitteeData?.meta?.title,
      executiveCommitteeData?.data?.committee_title,
      executiveCommitteeData?.data?.title,
    ];

    const rowTitleCandidates = Array.isArray(executiveCommitteeData?.result)
      ? [
          executiveCommitteeData?.result?.[0]?.committee_title,
          executiveCommitteeData?.result?.[0]?.executive_committee_title,
          executiveCommitteeData?.result?.[0]?.title,
        ]
      : [];

    const resolvedTitle = [...directTitleCandidates, ...rowTitleCandidates].find(
      (value) => String(value || "").trim().length > 0
    );

    return resolvedTitle || "FAA Executive Committee 2025-27";
  }, [executiveCommitteeData]);

  const leadMember = committeeMembers[0];
  const SecretaryGeneral = committeeMembers[1];
  const restMembers = committeeMembers.slice(2);

  const designationSummary = useMemo(() => {
    const order = [
      "President",
      "General Secretary",
      "Vice President",
      "Joint Secretary",
      "Treasurer",
      "Organizing Secretary",
      "Media and Publication Secretary",
      "Cultural Secretary",
      "Social Welfare Secretary",
      "Professional Development Secretary",
      "Executive Members",
      "Immediate Past President",
      "Ex-officio Member",
    ];
    const orderMap = new Map(order.map((item, index) => [item, index]));
    const counts = new Map();

    committeeMembers.forEach((member) => {
      const key = normalizeDesignationKey(member?.designation);
      if (!key) return;
      counts.set(key, (counts.get(key) || 0) + 1);
    });

    return Array.from(counts.entries())
      .map(([designation, count]) => ({ designation, count }))
      .sort((a, b) => {
        const aIndex = orderMap.has(a.designation)
          ? orderMap.get(a.designation)
          : Number.MAX_SAFE_INTEGER;
        const bIndex = orderMap.has(b.designation)
          ? orderMap.get(b.designation)
          : Number.MAX_SAFE_INTEGER;
        if (aIndex !== bIndex) return aIndex - bIndex;
        return a.designation.localeCompare(b.designation);
      });
  }, [committeeMembers]);

  const isExecutiveCommitteeSelected = useMemo(() => {
    return (
      allSection?._isExecutiveOnly ||
      String(allSection?.title || "")
        .toLowerCase()
        .includes("executive committee")
    );
  }, [allSection?._isExecutiveOnly, allSection?.title]);

  return (
    <>
      <CommonHero title="About Us" />
      <div className="ak-height-100 ak-height-lg-60"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-2 order-md-0 order-2">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-3">{content}</div>
            </div>
          </div>
          <div className="col-md-10 order-md-0 order-1">
            {data?.result?.map((elem, index) => (
              <div key={index}>
                <div className="about-pages-section-one">
                  <div className="profiles">
                    <div>
                      <img
                        src={`/images/about_us_message_image/${elem?.image}`}
                        alt="Dr. Mahmood Osman Imam"
                        className="about_us_message_image"
                      />
                      <p className="fw-bold mt-2">{elem?.name}</p>
                      <p className="ak-primary-color fw-semibold">
                        {elem?.designation}
                      </p>
                    </div>
                  </div>
                  <div className="profiles-desp">
                    <p
                      className="ak-font-22 fst-italic"
                      dangerouslySetInnerHTML={{
                        __html: elem?.message,
                      }}
                    />
                  </div>
                </div>
                <div className="ak-height-50 ak-height-lg-50"></div>
              </div>
            ))}
          </div>
          <div className="mb-5 order-md-0 order-3">
            {!isExecutiveCommitteeSelected && (
              <>
                <h2 className="ak-primary-color text-center mb-4">
                  {allSection?.title}
                </h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: allSection?.details,
                  }}
                />
              </>
            )}

            <div className="ak-height-60 ak-height-lg-40" />

            <div
              className="executive-committee-section"
              ref={executiveSectionRef}
              style={{ display: isExecutiveCommitteeSelected ? "block" : "none" }}
            >
              <h2 className="executive-committee-title">{committeeSectionTitle}</h2>

              {committeeLoading && <Shimmer />}

              {!committeeLoading && committeeError && (
                <p className="text-danger text-center">
                  Failed to load executive committee members.
                </p>
              )}

              {!committeeLoading &&
                !committeeError &&
                committeeMembers.length === 0 && (
                  <p className="text-center">No executive committee member found.</p>
                )}

              {!committeeLoading &&
                !committeeError &&
                committeeMembers.length > 0 && (
                  <>
                    {leadMember  && SecretaryGeneral ? (
                    
                      <div className="executive-committee-lead-row gap-4 mb-5">
                        <button
                          type="button"
                          className={`executive-member-card ${
                            isFeaturedCommitteeOrder(leadMember)
                              ? "executive-member-card--featured"
                              : ""
                          }`}
                          onClick={() => navigate(`/committee-member/${leadMember.id}`)}
                        >
                          <img
                            src={
                              getExecutiveMemberImage(leadMember.image) ||
                              "https://via.placeholder.com/220x220?text=No+Image"
                            }
                            alt={leadMember?.name || "Executive Member"}
                            className="executive-member-image"
                          />
                          <h4 className="executive-member-name">{leadMember?.name}</h4>
                          <p className="executive-member-designation">
                            {leadMember?.designation}
                          </p>
                        </button>
                         <button
                          type="button"
                          className={`executive-member-card ${
                            isFeaturedCommitteeOrder(SecretaryGeneral)
                              ? "executive-member-card--featured"
                              : ""
                          }`}
                          onClick={() => navigate(`/committee-member/${SecretaryGeneral.id}`)}
                        >
                          <img
                            src={
                              getExecutiveMemberImage(SecretaryGeneral.image) ||
                              "https://via.placeholder.com/220x220?text=No+Image"
                            }
                            alt={SecretaryGeneral?.name || "Executive Member"}
                            className="executive-member-image"
                          />
                          <h4 className="executive-member-name">{SecretaryGeneral?.name}</h4>
                          <p className="executive-member-designation">
                            {SecretaryGeneral?.designation}
                          </p>
                        </button>
                      </div>
                    ) : null}

                    {restMembers.length > 0 ? (
                      <div className="executive-committee-grid">
                        {restMembers.map((member) => (
                          <button
                            type="button"
                            key={member.id}
                            className={`executive-member-card ${
                              isFeaturedCommitteeOrder(member)
                                ? "executive-member-card--featured"
                                : ""
                            }`}
                            onClick={() => navigate(`/committee-member/${member.id}`)}
                          >
                            <img
                              src={
                                getExecutiveMemberImage(member.image) ||
                                "https://via.placeholder.com/220x220?text=No+Image"
                              }
                              alt={member?.name || "Executive Member"}
                              className="executive-member-image"
                            />
                            <h4 className="executive-member-name">{member?.name}</h4>
                            <p className="executive-member-designation">
                              {member?.designation}
                            </p>
                          </button>
                        ))}
                      </div>
                    ) : null}

                    {designationSummary.length > 0 ? (
                      <div className="executive-committee-summary">
                        <p className="executive-summary-title">
                          The EC consisting of the following officials:
                        </p>
                        <div className="executive-summary-list">
                          {designationSummary.map((item, index) => (
                            <div className="executive-summary-item" key={item.designation}>
                              <span className="executive-summary-index">{index + 1}.</span>
                              <span className="executive-summary-name">{item.designation}</span>
                              <span className="executive-summary-count">{item.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </>
  );
}
