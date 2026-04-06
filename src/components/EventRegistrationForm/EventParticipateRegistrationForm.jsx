import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddEventRegisterMutation,
  useGetEventDetailsIdQuery,
} from "../../features/events/eventsApiInject";
import { useGetPaymentSettingsQuery } from "../../features/payment/sslPaymentApiIn";
import {
  useGetMemberDetailsIdQuery,
  useGetMembersCategoryListQuery,
  useGetExpeirGenaralMembersListQuery,
  useGetMembersSessionListQuery,
} from "../../features/member/memberApiIn";
import batchPdf from "../../assets/Batchnumber.pdf";
import ErrorShow from "../UI/ErrorShow";
import HomeLoading from "../UI/HomeLoading";
import { getAuthMemberId } from "../../utils/authStorage";

const DEFAULT_MEMBER_OPTIONS = [
  { value: "Single", label: "Single", amount: 2000 },
  { value: "Spouse", label: "With Spouse", amount: 4000 },
];

const DEFAULT_GUEST_OPTIONS = [
  { value: "Single", label: "Student- BBA/MBA", amount: 500 },
  { value: "Spouse", label: "Student- EMBA/MPF", amount: 2000 },
];

const DEFAULT_TSHIRT_OPTIONS = [
  { value: "M", label: 'T- Shirt: M - Length 27" chest 38".' },
];

const DEFAULT_PAYMENT_OPTIONS = [
  { value: "ssl_commerz", label: "SSLCommerz" },
  { value: "cash", label: "Cash Payment (Admin Approval Required)" },
];

const TOAST_OPTIONS = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 2500,
};

function parseLines(raw) {
  if (!raw) return [];
  return String(raw)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseParticipationOptions(raw) {
  const lines = parseLines(raw);
  if (!lines.length) return null;

  const parsed = lines
    .map((line) => {
      const [labelPart, amountPart] = line.split("|").map((part) => part?.trim());
      const amount = Number(amountPart);
      if (!labelPart || Number.isNaN(amount)) return null;

      return {
        value: labelPart,
        label: labelPart,
        amount,
      };
    })
    .filter(Boolean);

  return parsed.length ? parsed : null;
}

function parseTShirtOptions(raw) {
  const lines = parseLines(raw);
  if (!lines.length) return null;

  const parsed = lines
    .map((line) => {
      const [sizePart, descPart] = line.split("|").map((part) => part?.trim());
      if (!sizePart || !descPart) return null;
      return { value: sizePart, label: descPart };
    })
    .filter(Boolean);

  return parsed.length ? parsed : null;
}

function normalizeEventPaymentOptions(event) {
  const raw = event?.payment_options || event?.payment_method_options || "";
  const values = parseLines(raw)
    .map((line) => line.toLowerCase())
    .map((line) => {
      if (line.includes("ssl")) return "ssl_commerz";
      if (line.includes("cash")) return "cash";
      return "";
    })
    .filter(Boolean);

  if (!values.length) return DEFAULT_PAYMENT_OPTIONS;

  const unique = Array.from(new Set(values));
  return unique.map((value) =>
    value === "cash"
      ? { value: "cash", label: "Cash Payment (Admin Approval Required)" }
      : { value: "ssl_commerz", label: "SSLCommerz" }
  );
}

function filterByAdminPaymentSettings(options, paymentSettings) {
  const sslEnabled = Boolean(paymentSettings?.result?.ssl_enabled);
  const cashEnabled = Boolean(paymentSettings?.result?.cash_enabled);

  return options.filter((opt) => {
    if (opt.value === "cash") return cashEnabled;
    if (opt.value === "ssl_commerz") return sslEnabled;
    return false;
  });
}

function formatAmount(value) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

function isEnabledFlag(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return normalized === "1" || normalized === "on" || normalized === "true" || normalized === "yes";
}

function isExpiredMember(member) {
  if (!member) return false;

  const statusText = String(
    member.member_status || member.membership_status || member.status_label || member.status || ""
  )
    .trim()
    .toLowerCase();

  if (statusText.includes("expired")) return true;

  const expireRaw = member.expire_date || member.expiry_date || member.expireDate || "";
  if (!expireRaw) return false;

  const expireDate = new Date(expireRaw);
  if (Number.isNaN(expireDate.getTime())) return false;
  return expireDate.getTime() < Date.now();
}

function getMemberCategoryMeta(member, categories) {
  const categoryId = String(member?.membership_category_id || "").trim();
  if (!categoryId || !Array.isArray(categories)) return null;

  const selected = categories.find((row) => String(row?.id || "").trim() === categoryId);
  if (!selected) return null;

  const membershipType = String(
    selected?.membership_type ||
      selected?.membership_validity_type ||
      selected?.membership_validity ||
      ""
  )
    .trim()
    .toLowerCase();

  const isLifetime = membershipType === "lifetime";

  return {
    name: String(selected?.category_name || "").trim(),
    isLifetime,
  };
}

function InputField({
  label,
  id,
  type = "text",
  register,
  field,
  validation = {},
  error,
  options = [],
  required = false,
  showBatchLink = false,
}) {
  return (
    <div className="col-md-6">
      <label htmlFor={id} className="form-label">
        {label}
        {required ? "*" : ""}
        {showBatchLink && (
          <Link to={batchPdf} className="text-danger ms-2" target="_blank">
            Click <span className="text-primary text-decoration-underline">here</span> to know your
            Batch Number
          </Link>
        )}
      </label>

      {type === "select" ? (
        <select className="text-input-filed type_2" id={id} {...register(field, validation)}>
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input className="text-input-filed type_2" type={type} id={id} {...register(field, validation)} />
      )}

      {error && (
        <p className="text-danger" style={{ fontSize: 13, marginTop: 4 }}>
          {error.message || "This field is required"}
        </p>
      )}
    </div>
  );
}

function PaymentTypeField({ register, error, options }) {
  return (
    <div className="col-12">
      <label className="form-label">Payment Method*</label>
      <div className="d-flex flex-wrap gap-3">
        {options.map((method) => (
          <div key={method.value} className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              id={`pay-${method.value}`}
              value={method.value}
              {...register("payment_type", { required: "Please select payment method" })}
            />
            <label className="form-check-label" htmlFor={`pay-${method.value}`}>
              {method.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-danger mt-1">{error.message}</p>}
    </div>
  );
}

function TermsAndConditions() {
  return (
    <div className="col-12">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="termsConditions" required />
        <label className="form-check-label" htmlFor="termsConditions">
          I have read and agree to the{" "}
          <Link to="/terms-condition?id=termsconditions" className="ak-primary-color text-decoration-underline">
            Terms & Conditions
          </Link>
          ,{" "}
          <Link to="/terms-condition?id=privacypolicy" className="ak-primary-color text-decoration-underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link to="/terms-condition?id=refundpolicy" className="ak-primary-color text-decoration-underline">
            Refund Policy
          </Link>
          .
        </label>
      </div>
    </div>
  );
}

export default function EventParticipateRegistrationForm({ props: eventId }) {
  const navigate = useNavigate();
  const authMemberId = getAuthMemberId();
  const isLoggedIn = Boolean(authMemberId);

  const { data: memberData, isLoading: memberLoading, isFetching: memberFetching } =
    useGetMemberDetailsIdQuery(
      { id: authMemberId, viewer_id: authMemberId },
      { skip: !isLoggedIn }
    );
  const { data: expiryMetaData } = useGetExpeirGenaralMembersListQuery(authMemberId, {
    skip: !isLoggedIn,
  });

  const { data: eventDetails, isLoading: eventLoading } = useGetEventDetailsIdQuery(eventId, {
    skip: !eventId,
  });

  const { data: batchSessionData } = useGetMembersSessionListQuery();
  const { data: categoryData } = useGetMembersCategoryListQuery();
  const { data: paymentSettings } = useGetPaymentSettingsQuery();
  const [addEventRegister] = useAddEventRegisterMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      organization_name: "",
      email_address: "",
      phone_number: "",
      session: "",
      student_id: "",
      participation_type: "",
      t_shirt_size: "",
      delivery_option: "",
      delivery_address: "",
      payment_type: "",
      cash_txn_reference: "",
    },
  });

  const participationType = useWatch({ control, name: "participation_type" });
  const tShirtSize = useWatch({ control, name: "t_shirt_size" });
  const deliveryOption = useWatch({ control, name: "delivery_option" });
  const selectedPaymentType = useWatch({ control, name: "payment_type" });

  const [membershipRenewAmount, setMembershipRenewAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const event = useMemo(() => eventDetails?.result?.[0] || null, [eventDetails]);
  const member = memberData?.result || null;
  const isMember = Boolean(memberData?.success);
  const categoryRows = categoryData?.result || [];
  const memberCategoryMeta = useMemo(
    () => getMemberCategoryMeta(member, categoryRows),
    [member, categoryRows]
  );

  const memberParticipationOptions = useMemo(
    () => parseParticipationOptions(event?.member_participation_options) || DEFAULT_MEMBER_OPTIONS,
    [event]
  );
  const guestParticipationOptions = useMemo(
    () => parseParticipationOptions(event?.guest_participation_options) || DEFAULT_GUEST_OPTIONS,
    [event]
  );
  const tShirtSizeOptions = useMemo(
    () => parseTShirtOptions(event?.t_shirt_size_options) || DEFAULT_TSHIRT_OPTIONS,
    [event]
  );
  const availablePaymentOptions = useMemo(() => {
    const eventOptions = normalizeEventPaymentOptions(event);
    return filterByAdminPaymentSettings(eventOptions, paymentSettings);
  }, [event, paymentSettings]);
  const tShirtEnabled = isEnabledFlag(event?.t_shirt_gift_status);
  const renewEnabled = isEnabledFlag(event?.membership_renew_status);
  const registrationAccessMode = event?.registration_access_mode || "both";
  const participationOptions = isMember ? memberParticipationOptions : guestParticipationOptions;
  const selectedOption = useMemo(
    () => participationOptions.find((opt) => opt.value === participationType),
    [participationOptions, participationType]
  );

  const accessDenied =
    (registrationAccessMode === "login_only" && !isLoggedIn) ||
    (registrationAccessMode === "guest_only" && isLoggedIn);
  const expiryMeta = Array.isArray(expiryMetaData?.data) ? expiryMetaData.data[0] : null;
  const expiredFromMeta = String(expiryMeta?.status || "").toLowerCase() === "expired";
  const memberExpired = isMember && (isExpiredMember(member) || expiredFromMeta);
  const memberApproved = Number(member?.admin_approval) === 1;
  const memberPaid = Number(member?.is_pay) === 1;
  const accessDeniedByMemberState =
    registrationAccessMode === "login_only" &&
    isMember &&
    (!memberApproved || !memberPaid || memberExpired);

  const batchSessionOptions = useMemo(
    () =>
      batchSessionData?.result?.map((row) => ({
        value: row.id,
        label: row.batch_session_name,
      })) || [],
    [batchSessionData]
  );

  useEffect(() => {
    if (eventLoading || memberFetching) return;

    if (isMember && member) {
      setValue("full_name", String(member.name || ""), { shouldDirty: false });
      setValue("organization_name", String(member.organization_name || ""), { shouldDirty: false });
      setValue("email_address", String(member.email || ""), { shouldDirty: false });
      setValue("phone_number", String(member.phone_number || ""), { shouldDirty: false });

      const isUnpaid = Number(member.is_pay) !== 1;
      const expiredMember = isExpiredMember(member) || expiredFromMeta;
      const renewableCategory = !memberCategoryMeta?.isLifetime;

      if (renewEnabled && renewableCategory && (isUnpaid || expiredMember)) {
        setMembershipRenewAmount(Number(event?.membership_renew_fees) || 0);
      } else {
        setMembershipRenewAmount(0);
      }
    } else {
      setMembershipRenewAmount(0);
    }
  }, [
    event,
    eventLoading,
    expiredFromMeta,
    isMember,
    member,
    memberCategoryMeta,
    memberFetching,
    renewEnabled,
    setValue,
  ]);

  useEffect(() => {
    if (!selectedOption) {
      setTotalAmount(0);
      return;
    }
    setTotalAmount(Number(selectedOption.amount || 0) + Number(membershipRenewAmount || 0));
  }, [selectedOption, membershipRenewAmount]);

  useEffect(() => {
    if (!participationType) {
      setValue("t_shirt_size", "");
      setValue("delivery_option", "");
      setValue("delivery_address", "");
    }
  }, [participationType, setValue]);

  useEffect(() => {
    if (!tShirtSize) {
      setValue("delivery_option", "");
      setValue("delivery_address", "");
    }
  }, [tShirtSize, setValue]);

  useEffect(() => {
    if (availablePaymentOptions.length > 0) {
      setValue("payment_type", availablePaymentOptions[0].value);
    } else {
      setValue("payment_type", "");
    }
  }, [availablePaymentOptions, setValue]);

  const onSubmit = async (values) => {
    if (accessDeniedByMemberState) {
      if (!memberApproved) {
        toast.info("Your membership is not approved yet. Please contact admin.", TOAST_OPTIONS);
        return;
      }
      if (!memberPaid) {
        toast.info("Your membership payment is pending. Please complete payment first.", TOAST_OPTIONS);
        return;
      }
      if (memberExpired) {
        toast.info("Your membership is expired. Please renew membership first.", TOAST_OPTIONS);
        return;
      }
      return;
    }

    if (!availablePaymentOptions.length) {
      toast.info("No payment method is enabled by admin.", TOAST_OPTIONS);
      return;
    }

    const payload = { ...values };
    payload.event_id = event?.id;
    payload.name = values.full_name;
    payload.pay_amount = totalAmount;
    payload.payment_type = values.payment_type || "ssl_commerz";
    payload.cash_txn_reference =
      (values.payment_type || "ssl_commerz") === "cash"
        ? String(values.cash_txn_reference || "").trim()
        : "";
    payload.membership_renew_fees = membershipRenewAmount > 0 ? membershipRenewAmount : 0;

    if (!tShirtEnabled) {
      payload.t_shirt_size = "";
      payload.delivery_option = "";
      payload.delivery_address = "";
    }

    if (isMember && member) {
      payload.member_id = member.id;
      payload.session = member.session;
      payload.member_category_id = String(member.membership_category_id || "");
      payload.member_type = memberCategoryMeta?.name || "Member";
    } else {
      payload.member_type = "Student/Guest";
      payload.member_category_id = "6";
    }

    payload.participation_type = selectedOption?.value || payload.participation_type;

    try {
      const response = await addEventRegister(payload);
      const body = response?.data;

      if (!body?.success && body?.message !== "Already event registered!") {
        toast.info(body?.message || "Registration failed", TOAST_OPTIONS);
        return;
      }

      if (payload.payment_type === "ssl_commerz") {
        if (body?.url) {
          window.location.replace(body.url);
          return;
        }
        toast.info("SSL payment URL not found. Please try again.", TOAST_OPTIONS);
        return;
      }

      if (body?.cash) {
        toast.success(body?.message || "Cash payment request submitted successfully.", TOAST_OPTIONS);
        if (isMember && member?.id) navigate(`/member-details/${member.id}`);
        return;
      }

      toast.success(body?.message || "Registration completed with cash payment.", TOAST_OPTIONS);
      if (isMember && member?.id) {
        navigate(`/member-details/${member.id}`);
      }
    } catch (error) {
      toast.error(error?.message || "Submission failed", TOAST_OPTIONS);
    }
  };

  if (eventLoading || (isLoggedIn && memberLoading && memberFetching)) {
    return <HomeLoading />;
  }

  if (!eventDetails?.success) {
    return <ErrorShow message="No event details found" />;
  }

  if (accessDenied || accessDeniedByMemberState) {
    return (
      <div className="alert alert-warning mt-4">
        {accessDeniedByMemberState
          ? !memberApproved
            ? "Your membership is not approved yet. You cannot participate in this login-only event right now."
            : !memberPaid
              ? "Your membership payment is pending. Please complete membership payment first."
              : "Your membership is expired. You cannot participate in this login-only event. Please renew first."
          : registrationAccessMode === "login_only"
          ? "This event is only available for logged-in members. Please sign in."
          : "This event is only available for guests (without login)."}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-60" />
      <h6 className="mb-3">Event Title: {event?.event_title}</h6>

      <form onSubmit={handleSubmit(onSubmit)} className="row g-3" autoComplete="on">
        {!isMember && (
          <>
            <InputField
              label="Student ID"
              id="inputStudentId"
              required
              register={register}
              field="student_id"
              validation={{ required: "Student ID is required" }}
              error={errors.student_id}
            />
            <InputField
              label="Batch number/ Session"
              id="inputSession"
              required
              register={register}
              field="session"
              type="select"
              validation={{ required: "Batch number/ Session is required" }}
              options={batchSessionOptions}
              error={errors.session}
              showBatchLink
            />
          </>
        )}

        <InputField
          label="Name"
          id="inputName"
          required
          register={register}
          field="full_name"
          validation={{
            required: "Name is required",
            minLength: { value: 3, message: "Name must be at least 3 characters" },
            maxLength: { value: 50, message: "Name cannot exceed 50 characters" },
          }}
          error={errors.full_name}
        />

        <InputField
          label="Organization Name"
          id="inputOrganization"
          required
          register={register}
          field="organization_name"
          validation={{
            required: "Organization Name is required",
            minLength: { value: 3, message: "At least 3 characters" },
            maxLength: { value: 100, message: "Cannot exceed 100 characters" },
          }}
          error={errors.organization_name}
        />

        <InputField
          label="Email Address"
          id="inputEmail"
          type="email"
          required
          register={register}
          field="email_address"
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          }}
          error={errors.email_address}
        />

        <InputField
          label="Phone Number"
          id="inputPhone"
          type="tel"
          required
          register={register}
          field="phone_number"
          validation={{
            required: "Phone number is required",
            minLength: { value: 10, message: "At least 10 digits" },
            maxLength: { value: 15, message: "Cannot exceed 15 digits" },
          }}
          error={errors.phone_number}
        />

        <InputField
          label="Participation Type"
          id="participationType"
          type="select"
          required
          register={register}
          field="participation_type"
          validation={{ required: "Please select a participation type" }}
          options={participationOptions.map((opt) => ({
            value: opt.value,
            label: `${opt.label} (${opt.amount} Taka)`,
          }))}
          error={errors.participation_type}
        />

        {tShirtEnabled && participationType && (
          <InputField
            label="T-Shirt Size"
            id="tShirtSize"
            type="select"
            required
            register={register}
            field="t_shirt_size"
            validation={{ required: "Please select a T-Shirt size" }}
            options={tShirtSizeOptions}
            error={errors.t_shirt_size}
          />
        )}

        {tShirtEnabled && participationType && tShirtSize && (
          <InputField
            label="Do you want to receive your gift at home?"
            id="deliveryOption"
            type="select"
            required
            register={register}
            field="delivery_option"
            validation={{ required: "Please select delivery option" }}
            options={[{ value: "from_home", label: "Yes" }]}
            error={errors.delivery_option}
          />
        )}

        {tShirtEnabled && participationType && tShirtSize && deliveryOption === "from_home" && (
          <>
            <div className="col-12" style={{ fontSize: 12 }}>
              <div style={{ fontWeight: "bold" }}>Delivery Address</div>
              <div>1. Pay Delivery Charge in cash on delivery: Dhaka - 60 TK</div>
              <div>2. Pay Delivery Charge in cash on delivery: Outside Dhaka - 110 TK</div>
            </div>
            <InputField
              label="Delivery Address"
              id="deliveryAddress"
              required
              register={register}
              field="delivery_address"
              validation={{ required: "Delivery address is required" }}
              error={errors.delivery_address}
            />
            <div className="col-12" style={{ color: "#a55252" }}>
              Please note you can&apos;t edit the address after payment.
            </div>
          </>
        )}

        <div className="col-12 mt-4">
          <h5 className="mb-3">Payment Details</h5>
          <div className="amount-breakdown p-3 border rounded bg-light">
            {isMember && membershipRenewAmount > 0 && (
              <p className="d-flex justify-content-between">
                <span>
                  <strong>Annual Membership:</strong>
                </span>
                <span>{formatAmount(membershipRenewAmount)} Taka</span>
              </p>
            )}
            {participationType && selectedOption && (
              <p className="d-flex justify-content-between">
                <span>
                  <strong>{isMember ? "Subscription fee" : "Student Subscription fee"}:</strong>
                </span>
                <span>+ {formatAmount(selectedOption.amount)} Taka</span>
              </p>
            )}
            <hr />
            <p className="d-flex justify-content-between text-success fw-bold">
              <span>Total:</span>
              <span>{formatAmount(totalAmount)} Taka</span>
            </p>
          </div>
        </div>

        <PaymentTypeField
          register={register}
          error={errors.payment_type}
          options={availablePaymentOptions}
        />
        {selectedPaymentType === "cash" ? (
          <div className="col-12">
            <label className="form-label" htmlFor="cashTxnReferenceEvent">
              Cash TXN/Reference Number*
            </label>
            <input
              id="cashTxnReferenceEvent"
              className="text-input-filed type_2"
              type="text"
              {...register("cash_txn_reference", {
                required: "Cash TXN/Reference Number is required for cash payment",
              })}
            />
            {errors.cash_txn_reference ? (
              <p className="text-danger mt-1">{errors.cash_txn_reference.message}</p>
            ) : null}
            {String(paymentSettings?.result?.cash_payment_notice || "").trim() ? (
              <p className="mt-2 mb-0" style={{ color: "#4a3b7a" }}>
                {paymentSettings.result.cash_payment_notice}
              </p>
            ) : null}
          </div>
        ) : null}
        {!availablePaymentOptions.length ? (
          <p className="text-danger mt-1">No payment method is enabled by admin.</p>
        ) : null}
        <TermsAndConditions />

        <div className="col-12 mt-4">
          <button type="submit" className="button-primary">
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
}
