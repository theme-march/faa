import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetMemberDetailsIdQuery } from "../features/member/memberApiIn";
import { useGetExpeirGenaralMembersListQuery } from "../features/member/memberApiIn";
import { useGetMembersCategoryListQuery } from "../features/member/memberApiIn";
import ErrorShow from "../components/UI/ErrorShow";
import DateFormat from "../components/DateFormat/DateFormat";
import demoImgMember from "../assets/member/member_1.jpg";
import MembershipCategorynNameFind from "../components/MemberCard/MembershipCategorynNameFind";
import HomeLoading from "../components/UI/HomeLoading";
import { getAuthMemberId } from "../utils/authStorage";

function pickArray(source, keys = []) {
  for (const key of keys) {
    const value = source?.[key];
    if (Array.isArray(value)) return value;
  }
  return [];
}

function getAdminBaseUrl() {
  return (import.meta.env.VITE_ADMIN_BASE_URL || "http://localhost:3000").replace(/\/+$/, "");
}

function getMemberImageCandidates(memberImage) {
  if (!memberImage) return [demoImgMember];

  if (memberImage.startsWith("http://") || memberImage.startsWith("https://")) {
    return [memberImage, demoImgMember];
  }

  const adminBase = getAdminBaseUrl();
  const raw = String(memberImage).replace(/\\/g, "/").trim();
  const cleaned = raw.replace(/^\/+/, "").replace(/^public\//i, "");
  const fileName = cleaned.split("/").pop() || cleaned;

  const candidateSet = new Set([
    `${adminBase}/member/${fileName}`,
    `${adminBase}/images/member/${fileName}`,
    `${adminBase}/${cleaned}`,
    raw.startsWith("/") ? raw : `/${cleaned}`,
  ]);

  return [...candidateSet, demoImgMember];
}

function normalizeMoney(value) {
  if (value === null || value === undefined || value === "") return "-";
  const asNumber = Number(String(value).replace(/,/g, ""));
  if (Number.isNaN(asNumber)) return `BDT ${value}`;
  return `BDT ${asNumber.toLocaleString()}`;
}

function normalizeStatus(value) {
  return String(value || "PENDING").toUpperCase();
}

function toTitleCase(value) {
  return String(value || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function isExpiredByDate(expireDate) {
  if (!expireDate) return false;
  const parsedDate = new Date(expireDate);
  if (Number.isNaN(parsedDate.getTime())) return false;
  return parsedDate.getTime() < Date.now();
}

function parseValidDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function toNumberOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function deriveLatestPaymentDate(result = {}, expiryInfo = null) {
  const directCandidates = [
    result?.last_payment_date,
    result?.lastPaymentDate,
    result?.payment_last_date,
    expiryInfo?.last_payment_date,
    result?.tx_tran_date,
  ];

  const collectionCandidates = [
    ...(Array.isArray(result?.paid_event_registrations) ? result.paid_event_registrations : []),
    ...(Array.isArray(result?.sponsor_contributions) ? result.sponsor_contributions : []),
    ...(Array.isArray(result?.donation_contributions) ? result.donation_contributions : []),
  ].flatMap((row) => [
    row?.tx_tran_date,
    row?.registration_date,
    row?.created_date,
    row?.created_at,
  ]);

  const allCandidates = [...directCandidates, ...collectionCandidates]
    .map(parseValidDate)
    .filter(Boolean);

  if (!allCandidates.length) return null;
  return new Date(Math.max(...allCandidates.map((d) => d.getTime())));
}

function deriveApprovedDate(result = {}, expiryInfo = null, latestPaymentDate = null) {
  if (Number(result?.admin_approval) !== 1) {
    return null;
  }

  const directCandidates = [
    result?.approved_at,
    result?.approved_date,
    expiryInfo?.approved_date,
  ]
    .map(parseValidDate)
    .filter(Boolean);

  if (directCandidates.length) {
    return new Date(Math.max(...directCandidates.map((d) => d.getTime())));
  }

  if (latestPaymentDate) {
    return latestPaymentDate;
  }

  return parseValidDate(result?.created_at);
}

function isLifetimeMember(result = {}) {
  const membershipNumber = String(result?.membership_number || "").toUpperCase();
  const membershipCategoryName = String(
    result?.membership_category_name || result?.membership_category || ""
  ).toLowerCase();

  return membershipNumber.startsWith("LM") || membershipCategoryName.includes("lifetime");
}

function getCategoryValidity(categoryList, categoryId) {
  const rows = Array.isArray(categoryList) ? categoryList : [];
  const selected = rows.find((row) => String(row?.id) === String(categoryId));
  if (!selected) return { isLifetime: null, durationDays: null };

  let membershipType = String(
    selected?.membership_type || selected?.membership_validity_type || ""
  ).toLowerCase();
  let durationDays =
    toNumberOrNull(selected?.membership_duration_days) ??
    toNumberOrNull(selected?.duration_days) ??
    toNumberOrNull(selected?.membership_validity_days);

  const categoryTitle = selected?.category_title;
  if (categoryTitle) {
    try {
      const parsedMeta = typeof categoryTitle === "string" ? JSON.parse(categoryTitle) : categoryTitle;
      const metaType = String(parsedMeta?.membership_type || "").toLowerCase();
      if (metaType) membershipType = metaType;
      durationDays =
        toNumberOrNull(parsedMeta?.membership_duration_days) ??
        toNumberOrNull(parsedMeta?.duration_days) ??
        durationDays;
    } catch (_) {
      // Keep fallback values when category_title is not JSON
    }
  }

  const validityText = String(selected?.membership_validity || "").toLowerCase();
  const categoryName = String(selected?.category_name || "").toLowerCase();
  const isLifetime =
    membershipType.includes("lifetime") ||
    validityText.includes("lifetime") ||
    categoryName.includes("lifetime");

  return { isLifetime, durationDays };
}

function getEntryPassUrl(row = {}) {
  const adminBase = getAdminBaseUrl();
  const registrationId = row?.id;
  const invoiceUrl = String(row?.invoice_url || "");

  if (!registrationId) return "#";

  // API invoice URL returns 403 for member in some environments;
  // use public invoice page URL instead.
  if (invoiceUrl.includes("/api/v1/event-registration-invoice/")) {
    return `${adminBase}/event-registration/invoice/${registrationId}`;
  }

  if (invoiceUrl.startsWith("http://") || invoiceUrl.startsWith("https://")) {
    return invoiceUrl;
  }

  if (invoiceUrl.startsWith("/event-registration/invoice/")) {
    return `${adminBase}${invoiceUrl}`;
  }

  return `${adminBase}/event-registration/invoice/${registrationId}`;
}

function DetailCard({ label, value, full = false }) {
  if (!label && !value) return null;
  return (
    <div className={`member-info-card ${full ? "full" : ""}`}>
      <div className="label">{label}</div>
      <div className="value">{value || "-"}</div>
    </div>
  );
}

function SectionCard({ title, filters, children }) {
  return (
    <section className="member-section-card">
      <div className="member-section-header">
        <h3>{title}</h3>
        <div className="member-section-filters">{filters}</div>
      </div>
      {children}
    </section>
  );
}

export default function MemberDetails() {
  const { id } = useParams();

  const viewerId = getAuthMemberId();
  const { data, isLoading, isError, error } = useGetMemberDetailsIdQuery({
    id,
    viewer_id: viewerId,
  });
  const { data: categoryMeta } = useGetMembersCategoryListQuery();
  const { data: expiryMeta } = useGetExpeirGenaralMembersListQuery(id, {
    skip: !id,
  });

  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [eventStatusFilter, setEventStatusFilter] = useState("all");
  const [eventDateFilter, setEventDateFilter] = useState("");

  const [sponsorEventFilter, setSponsorEventFilter] = useState("all");
  const [sponsorOrgFilter, setSponsorOrgFilter] = useState("all");
  const [sponsorStatusFilter, setSponsorStatusFilter] = useState("all");

  const [donationStatusFilter, setDonationStatusFilter] = useState("all");
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [profileImageIndex, setProfileImageIndex] = useState(0);

  const result = data?.result || {};
  const {
    id: memberId,
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
    membership_duration_days,
    is_pay,
    admin_approval,
    last_payment_date,
    expire_date,
    member_status,
  } = result;
  const expiryInfo = Array.isArray(expiryMeta?.data) ? expiryMeta.data[0] : null;
  const isApproved = Number(result?.admin_approval) === 1;
  const isPaid = Number(result?.is_pay) === 1;

  const latestPaymentDate = deriveLatestPaymentDate(result, expiryInfo);
  const approvedDate = deriveApprovedDate(result, expiryInfo, latestPaymentDate);
  const resolvedApprovedDate = approvedDate || null;
  const resolvedLastPaymentDate = isPaid
    ? expiryInfo?.last_payment_date ||
      last_payment_date ||
      result?.lastPaymentDate ||
      result?.payment_last_date ||
      null
    : null;

  const explicitExpireDate =
    expiryInfo?.expire_date || expire_date || result?.expiry_date || result?.expireDate || null;
  const categoryValidity = getCategoryValidity(categoryMeta?.result, membership_category_id);
  const fallbackLifetimeMember = isLifetimeMember(result);
  const lifetimeMember = categoryValidity?.isLifetime ?? fallbackLifetimeMember;
  const effectiveDurationDays =
    categoryValidity?.durationDays ??
    toNumberOrNull(membership_duration_days) ??
    365;

  const computedExpireDate =
    !lifetimeMember && approvedDate && effectiveDurationDays > 0
      ? new Date(new Date(approvedDate).getTime() + effectiveDurationDays * 24 * 60 * 60 * 1000)
      : null;

  const resolvedExpireDate = isApproved
    ? lifetimeMember
      ? "Lifetime"
      : explicitExpireDate || computedExpireDate || null
    : null;

  const isExpiredByResolvedDate = isExpiredByDate(resolvedExpireDate);
  const resolvedMemberStatus = !isApproved
    ? "Not Approved"
    : !isPaid
      ? "Unpaid"
      : String(member_status || result?.status_label || result?.membership_status || expiryInfo?.status || "")
          .toLowerCase()
          .includes("expired") || isExpiredByResolvedDate
        ? "Expired"
        : "Active";

  const isOwner =
    !!viewerId && String(viewerId) === String(memberId || id);

  const profileImageCandidates = useMemo(
    () => getMemberImageCandidates(member_image),
    [member_image]
  );

  useEffect(() => {
    setProfileImageIndex(0);
  }, [member_image]);

  const paidEvents = pickArray(result, [
    "paid_event_registrations",
    "event_registrations",
    "my_paid_event_registrations",
  ]);
  const sponsorContributions = pickArray(result, [
    "sponsor_contributions",
    "event_wise_sponsor_contribution",
    "my_sponsor_contributions",
  ]);
  const donations = pickArray(result, [
    "donation_contributions",
    "donations",
    "my_donations",
    "donation_history",
    "donation_list",
  ]);

  const eventTypes = Array.from(
    new Set(paidEvents.map((e) => String(e?.event_type || "").toLowerCase()).filter(Boolean))
  );
  const eventStatuses = Array.from(
    new Set(
      paidEvents
        .map((e) => normalizeStatus(e?.tx_status || e?.status))
        .filter(Boolean)
    )
  );

  const sponsorEvents = Array.from(
    new Set(sponsorContributions.map((s) => String(s?.event_title || "")).filter(Boolean))
  );
  const sponsorOrgs = Array.from(
    new Set(
      sponsorContributions
        .map((s) => String(s?.sponsor_name || s?.organization_name || ""))
        .filter(Boolean)
    )
  );
  const sponsorStatuses = Array.from(
    new Set(
      sponsorContributions
        .map((s) => normalizeStatus(s?.payment_status || s?.tx_status))
        .filter(Boolean)
    )
  );

  const donationStatuses = Array.from(
    new Set(
      donations
        .map((d) => normalizeStatus(d?.tx_status || d?.payment_status))
        .filter(Boolean)
    )
  );

  const filteredEvents = useMemo(
    () =>
      paidEvents.filter((event) => {
        const eventType = String(event?.event_type || "").toLowerCase();
        const status = normalizeStatus(event?.tx_status || event?.status);
        const createdDate = String(event?.registration_date || event?.created_date || "");

        if (eventTypeFilter !== "all" && eventType !== eventTypeFilter) return false;
        if (eventStatusFilter !== "all" && status !== eventStatusFilter) return false;
        if (eventDateFilter && !createdDate.includes(eventDateFilter)) return false;
        return true;
      }),
    [paidEvents, eventTypeFilter, eventStatusFilter, eventDateFilter]
  );

  const filteredSponsors = useMemo(
    () =>
      sponsorContributions.filter((item) => {
        const eventTitle = String(item?.event_title || "");
        const org = String(item?.sponsor_name || item?.organization_name || "");
        const status = normalizeStatus(item?.payment_status || item?.tx_status);

        if (sponsorEventFilter !== "all" && eventTitle !== sponsorEventFilter) return false;
        if (sponsorOrgFilter !== "all" && org !== sponsorOrgFilter) return false;
        if (sponsorStatusFilter !== "all" && status !== sponsorStatusFilter) return false;
        return true;
      }),
    [sponsorContributions, sponsorEventFilter, sponsorOrgFilter, sponsorStatusFilter]
  );

  const filteredDonations = useMemo(
    () =>
      donations.filter((item) => {
        const status = normalizeStatus(item?.tx_status || item?.payment_status);
        return donationStatusFilter === "all" ? true : status === donationStatusFilter;
      }),
    [donations, donationStatusFilter]
  );
  const programWiseDonations = useMemo(
    () =>
      filteredDonations.filter(
        (item) => String(item?.donation_type || "").toLowerCase() === "program"
      ),
    [filteredDonations]
  );
  const normalDonations = useMemo(
    () =>
      filteredDonations.filter(
        (item) => String(item?.donation_type || "").toLowerCase() !== "program"
      ),
    [filteredDonations]
  );

  const isExpired = String(resolvedMemberStatus || "").toLowerCase().includes("expired");
  const isUnpaid = Number(is_pay) !== 1;
  const showRenewalButton = isApproved && isExpired;
  const showPaymentButton = isUnpaid;

  if (isLoading) {
    return (
      <div>
        <HomeLoading />
        <div className="ak-height-80 ak-height-lg-30" />
      </div>
    );
  }

  if (isError) {
    const apiErrorMessage =
      error?.data?.message || error?.error || "There was an error while loading profile.";
    return <ErrorShow message={apiErrorMessage} />;
  }
  if (!data?.success) return <ErrorShow message={data?.message || "No data found"} />;

  return (
    <div className="container member-profile-page">
      <div className="ak-height-80 ak-height-lg-30" />

      <div className="member-profile-wrapper">
        <div className="member-profile-left">
          <img
            src={profileImageCandidates[profileImageIndex] || demoImgMember}
            className="member-profile-image"
            alt={name || "member"}
            onError={() => {
              setProfileImageIndex((prev) => {
                const next = prev + 1;
                return next < profileImageCandidates.length ? next : prev;
              });
            }}
          />

          <div className="member-payment-card">
            <p>
              <strong>Last Payment:</strong>{" "}
              {resolvedLastPaymentDate ? <DateFormat props={resolvedLastPaymentDate} /> : "-"}
            </p>
            <p>
              <strong>Approved Date:</strong>{" "}
              {resolvedApprovedDate ? <DateFormat props={resolvedApprovedDate} /> : "-"}
            </p>
            <p>
              <strong>Expire Date:</strong>{" "}
              {resolvedExpireDate
                ? lifetimeMember && String(resolvedExpireDate).toLowerCase() === "lifetime"
                  ? "Lifetime"
                  : <DateFormat props={resolvedExpireDate} />
                : "-"}
            </p>
            <p className="mt-2">
              <strong>Membership Duration (Days):</strong>{" "}
              {isApproved ? (lifetimeMember ? "Lifetime" : effectiveDurationDays) : "-"}
            </p>
            <span
              className={`member-status-chip ${
                String(resolvedMemberStatus).toLowerCase() === "active"
                  ? "active"
                  : String(resolvedMemberStatus).toLowerCase() === "expired"
                    ? "expired"
                    : "pending"
              }`}
            >
              {resolvedMemberStatus}
            </span>
          </div>

          {isOwner ? (
            <div className="member-profile-actions">
              {showRenewalButton ? (
                <Link to={`/members-payment/${id}`} className="button-primary">
                  Renewal
                </Link>
              ) : null}
              {showPaymentButton ? (
                <Link to={`/members-payment/${id}`} className="button-primary">
                  Payment
                </Link>
              ) : null}
              <Link to={`/member-details-update/${id}`} className="button-primary">
                Profile Update
              </Link>
              <Link to={`/member-password-update/${id}`} className="button-primary">
                Change Password
              </Link>
            </div>
          ) : null}
        </div>

        <div className="member-profile-right">
          <div className="member-header-row">
            <h2>{name || "Member"}</h2>
            <div className="member-chips">
              <span className={`member-chip ${admin_approval === 1 ? "ok" : "warn"}`}>
                {admin_approval === 1 ? "APPROVED" : "NOT APPROVED"}
              </span>
              <span className={`member-chip ${is_pay === 1 ? "ok" : "warn"}`}>
                {is_pay === 1 ? "PAID" : "UNPAID"}
              </span>
            </div>
          </div>

          <div className="member-info-grid">
            <DetailCard label="Membership Number" value={membership_number} />
            <DetailCard
              label="HSC Passing Year"
              value={
                String(hsc_passing_year || "").length > 10 ? (
                  <DateFormat props={hsc_passing_year} onlyYear={true} />
                ) : (
                  hsc_passing_year
                )
              }
            />
            <DetailCard label="Session" value={session} />
            <DetailCard label="Occupation" value={occupation} />
            <DetailCard label="Organization" value={organization_name} />
            <div className="member-info-card">
              <div className="label">Membership Category</div>
              <div className="value">
                <MembershipCategorynNameFind id={membership_category_id} />
              </div>
            </div>
            <DetailCard label="Email" value={email} full />
            <DetailCard label="Phone Number" value={phone_number} full />
            <DetailCard label="Address" value={address} full />
          </div>
        </div>
      </div>

      {isOwner ? (
        <>
          <SectionCard
            title="My Paid Event Registrations"
            filters={
              <>
                <select value={eventTypeFilter} onChange={(e) => setEventTypeFilter(e.target.value)}>
                  <option value="all">All Event Type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {toTitleCase(type)}
                    </option>
                  ))}
                </select>
                <input type="date" value={eventDateFilter} onChange={(e) => setEventDateFilter(e.target.value)} />
                <select value={eventStatusFilter} onChange={(e) => setEventStatusFilter(e.target.value)}>
                  <option value="all">All Payment Status</option>
                  {eventStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </>
            }
          >
            <div className="table-responsive">
              <table className="table member-data-table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Registration Date</th>
                    <th>Paid Amount</th>
                    <th>Status</th>
                    <th>Entry Status</th>
                    <th>Entry Password</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.length ? (
                    filteredEvents.map((row) => (
                      <tr key={row?.id}>
                        <td>{row?.event_title || "-"}</td>
                        <td>{row?.registration_date || "-"}</td>
                        <td>{normalizeMoney(row?.pay_amount)}</td>
                        <td>
                          <span className="table-chip ok">{normalizeStatus(row?.tx_status || row?.status)}</span>
                        </td>
                        <td>
                          <span
                            className={`table-chip ${
                              normalizeStatus(row?.entry_status) === "ENTERED" ? "ok" : "warn"
                            }`}
                          >
                            {normalizeStatus(row?.entry_status || "NOT_ENTERED")}
                          </span>
                        </td>
                        <td>{row?.entry_passcode || "-"}</td>
                        <td>
                          <div className="d-flex gap-2 flex-wrap">
                            <button
                              type="button"
                              className="btn btn-sm btn-primary"
                              onClick={() => setSelectedDetails({ type: "event", data: row })}
                            >
                              View Details
                            </button>
                            <a
                              href={getEntryPassUrl(row)}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-outline-secondary"
                            >
                              Download Entry Pass
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center">
                        No paid event registrations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <SectionCard
            title="My Event-wise Sponsor Contribution"
            filters={
              <>
                <select value={sponsorEventFilter} onChange={(e) => setSponsorEventFilter(e.target.value)}>
                  <option value="all">All Events</option>
                  {sponsorEvents.map((eventTitle) => (
                    <option key={eventTitle} value={eventTitle}>
                      {eventTitle}
                    </option>
                  ))}
                </select>
                <select value={sponsorOrgFilter} onChange={(e) => setSponsorOrgFilter(e.target.value)}>
                  <option value="all">All Sponsors</option>
                  {sponsorOrgs.map((org) => (
                    <option key={org} value={org}>
                      {org}
                    </option>
                  ))}
                </select>
                <select value={sponsorStatusFilter} onChange={(e) => setSponsorStatusFilter(e.target.value)}>
                  <option value="all">All Status</option>
                  {sponsorStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </>
            }
          >
            <div className="table-responsive">
              <table className="table member-data-table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Sponsor Name</th>
                    <th>Contribution Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSponsors.length ? (
                    filteredSponsors.map((row) => (
                      <tr key={row?.id}>
                        <td>{row?.event_title || "-"}</td>
                        <td>{row?.sponsor_name || row?.organization_name || "-"}</td>
                        <td>{normalizeMoney(row?.paid_amount)}</td>
                        <td>
                          <span className="table-chip ok">
                            {normalizeStatus(row?.payment_status || row?.tx_status)}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => setSelectedDetails({ type: "sponsor", data: row })}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No sponsor contribution records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <SectionCard
            title="My Program-wise Donations"
            filters={
              <select value={donationStatusFilter} onChange={(e) => setDonationStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                {donationStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            }
          >
            <div className="table-responsive">
              <table className="table member-data-table">
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {programWiseDonations.length ? (
                    programWiseDonations.map((row) => (
                      <tr key={row?.id}>
                        <td>{row?.program_title || "-"}</td>
                        <td>{row?.created_date || row?.tx_tran_date || "-"}</td>
                        <td>{normalizeMoney(row?.pay_amount)}</td>
                        <td>{row?.payment_type || "-"}</td>
                        <td>
                          <span className="table-chip ok">
                            {normalizeStatus(row?.tx_status || row?.payment_status)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No program-wise donation records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <SectionCard
            title="My Normal Donations"
            filters={
              <select value={donationStatusFilter} onChange={(e) => setDonationStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                {donationStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            }
          >
            <div className="table-responsive">
              <table className="table member-data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {normalDonations.length ? (
                    normalDonations.map((row) => (
                      <tr key={row?.id}>
                        <td>{row?.created_date || row?.tx_tran_date || "-"}</td>
                        <td>{normalizeMoney(row?.pay_amount)}</td>
                        <td>{row?.payment_type || "-"}</td>
                        <td>
                          <span className="table-chip ok">
                            {normalizeStatus(row?.tx_status || row?.payment_status)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No normal donation records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </>
      ) : null}

      {selectedDetails ? (
        <div className="member-details-modal-backdrop" onClick={() => setSelectedDetails(null)}>
          <div className="member-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="member-details-modal-header">
              <h5>{selectedDetails.type === "event" ? "Event Details" : "Sponsor Details"}</h5>
              <button type="button" onClick={() => setSelectedDetails(null)} aria-label="Close details modal">
                x
              </button>
            </div>
            <div className="member-details-modal-body">
              {Object.entries(selectedDetails.data || {}).map(([key, value]) => (
                <div className="detail-row" key={key}>
                  <span>{toTitleCase(key)}</span>
                  <span>{String(value ?? "-")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="ak-height-80 ak-height-lg-30" />
    </div>
  );
}
