import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddEventSponsorRegisterMutation,
  useGetEventDetailsIdQuery,
} from "../../features/events/eventsApiInject";
import { useGetMemberDetailsIdQuery } from "../../features/member/memberApiIn";
import { useGetPaymentSettingsQuery } from "../../features/payment/sslPaymentApiIn";
import ErrorShow from "../UI/ErrorShow";
import HomeLoading from "../UI/HomeLoading";
import { getAuthMemberId } from "../../utils/authStorage";

const TOAST_OPTIONS = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 2500,
};

const DEFAULT_PAYMENT_OPTIONS = [
  { value: "ssl_commerz", label: "SSLCommerz" },
  { value: "cash", label: "Cash Payment (Admin Approval Required)" },
];

function getEnabledPaymentOptions(paymentSettings) {
  const sslEnabled = Boolean(paymentSettings?.result?.ssl_enabled);
  const cashEnabled = Boolean(paymentSettings?.result?.cash_enabled);

  return DEFAULT_PAYMENT_OPTIONS.filter((option) => {
    if (option.value === "ssl_commerz") return sslEnabled;
    if (option.value === "cash") return cashEnabled;
    return false;
  });
}

function InputField({
  label,
  id,
  type = "text",
  register,
  field,
  validation = {},
  error,
  required = false,
}) {
  return (
    <div className="col-md-6">
      <label htmlFor={id} className="form-label">
        {label}
        {required ? "*" : ""}
      </label>
      <input type={type} className="text-input-filed type_2" id={id} {...register(field, validation)} />
      {error ? (
        <p className="text-danger" style={{ fontSize: 13, marginTop: 4 }}>
          {error.message || "This field is required"}
        </p>
      ) : null}
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
      {error ? <p className="text-danger mt-1">{error.message}</p> : null}
    </div>
  );
}

function TermsAndConditions() {
  return (
    <div className="col-12">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="termsCheckboxSponsor" required />
        <label className="form-check-label" htmlFor="termsCheckboxSponsor">
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

export default function EventSponsorRegistrationForm({ props: eventId }) {
  const navigate = useNavigate();
  const authMemberId = getAuthMemberId();
  const isLoggedIn = Boolean(authMemberId);

  const { data: memberData, isLoading: memberLoading, isFetching: memberFetching } =
    useGetMemberDetailsIdQuery(
      {
        id: authMemberId,
        viewer_id: authMemberId,
      },
      { skip: !isLoggedIn }
    );

  const { data: eventDetails, isLoading: eventLoading } = useGetEventDetailsIdQuery(eventId, {
    skip: !eventId,
  });

  const { data: paymentSettings } = useGetPaymentSettingsQuery();
  const [addEventSponsorRegister] = useAddEventSponsorRegisterMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      organization_name: "",
      email_address: "",
      phone_number: "",
      pay_amount: "",
      payment_type: "",
      cash_txn_reference: "",
    },
  });

  const member = memberData?.result || null;
  const selectedPaymentType = watch("payment_type");
  const availablePaymentOptions = useMemo(
    () => getEnabledPaymentOptions(paymentSettings),
    [paymentSettings]
  );

  useEffect(() => {
    if (availablePaymentOptions.length > 0) {
      setValue("payment_type", availablePaymentOptions[0].value);
    } else {
      setValue("payment_type", "");
    }
  }, [availablePaymentOptions, setValue]);

  useEffect(() => {
    if (!member) return;
    setValue("name", String(member.name || ""), { shouldDirty: false });
    setValue("organization_name", String(member.organization_name || ""), { shouldDirty: false });
    setValue("email_address", String(member.email || ""), { shouldDirty: false });
    setValue("phone_number", String(member.phone_number || ""), { shouldDirty: false });
  }, [member, setValue]);

  const onSubmit = async (values) => {
    if (!availablePaymentOptions.length) {
      toast.info("No payment method is enabled by admin.", TOAST_OPTIONS);
      return;
    }

    const payload = {
      event_id: eventId,
      member_id: member?.id || "",
      full_name: values.name,
      organization_name: values.organization_name,
      designation_name: member?.designation_name || "",
      email_address: values.email_address,
      email: values.email_address,
      phone_number: values.phone_number,
      address: "sponsor registration",
      pay_amount: Number(values.pay_amount || 0),
      payment_type: values.payment_type || "ssl_commerz",
      cash_txn_reference:
        (values.payment_type || "ssl_commerz") === "cash"
          ? String(values.cash_txn_reference || "").trim()
          : "",
    };

    try {
      const response = await addEventSponsorRegister(payload);
      const body = response?.data;

      if (!body?.success) {
        toast.info(body?.message || "Sponsor registration failed.", TOAST_OPTIONS);
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

      toast.success(body?.message || "Cash payment request submitted successfully.", TOAST_OPTIONS);
      if (member?.id) {
        navigate(`/member-details/${member.id}`);
      }
    } catch (error) {
      toast.error(error?.message || "Submission failed.", TOAST_OPTIONS);
    }
  };

  if (eventLoading || (isLoggedIn && memberLoading && memberFetching)) {
    return <HomeLoading />;
  }

  if (!eventDetails?.success) {
    return <ErrorShow message="No event details found" />;
  }

  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-60" />
      <h6 className="mb-3">Event Title: {eventDetails?.result?.[0]?.event_title}</h6>

      <form onSubmit={handleSubmit(onSubmit)} className="row g-3" autoComplete="on">
        <InputField
          label="Name"
          id="inputName"
          required
          register={register}
          field="name"
          validation={{
            required: "Name is required",
            minLength: { value: 3, message: "Name must be at least 3 characters" },
            maxLength: { value: 50, message: "Name cannot exceed 50 characters" },
          }}
          error={errors.name}
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
          label="Payment Amount"
          id="inputAmount"
          type="number"
          required
          register={register}
          field="pay_amount"
          validation={{
            required: "Payment amount is required",
            min: { value: 1, message: "Amount must be greater than 0" },
          }}
          error={errors.pay_amount}
        />

        <PaymentTypeField register={register} error={errors.payment_type} options={availablePaymentOptions} />
        {selectedPaymentType === "cash" ? (
          <div className="col-12">
            <label className="form-label" htmlFor="cashTxnReferenceSponsor">
              Cash TXN/Reference Number*
            </label>
            <input
              id="cashTxnReferenceSponsor"
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

      <div className="ak-height-100 ak-height-lg-60" />
    </div>
  );
}
