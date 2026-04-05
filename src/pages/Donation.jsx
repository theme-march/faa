import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useSearchParams } from "react-router-dom";
import { useGetMemberDetailsIdQuery } from "../features/member/memberApiIn";
import { useGetMilestoneProgramQuery } from "../features/home/homeApiIn";
import {
  useDonationPaymentMutation,
  useGetPaymentSettingsQuery,
} from "../features/payment/sslPaymentApiIn";
import HomeLoading from "../components/UI/HomeLoading";
import { getAuthMemberId } from "../utils/authStorage";

const TOAST_OPTIONS = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 1500,
};

function InputField({
  label,
  id,
  type = "text",
  register,
  field,
  validation,
  error,
  errorMessage,
  disabled = false,
}) {
  return (
    <div className="col-md-6">
      <label htmlFor={id} className="form-label">
        {label}*
      </label>
      <input
        type={type}
        className="text-input-filed type_2"
        id={id}
        disabled={disabled}
        {...register(field, validation)}
      />
      {error ? <p className="text-danger">{errorMessage[error.type] || error.message}</p> : null}
    </div>
  );
}

function renderPaymentMethods(register, error, methods = []) {
  return methods.map((method, idx) => (
    <div key={idx} className="form-check form-check-inline">
      <input
        className="form-check-input custom-checkbox"
        type="radio"
        name="paymentMethod"
        id={method.value}
        value={method.value}
        {...register("payment_type", { required: true })}
      />
      <label className="form-check-label" htmlFor={method.value}>
        {method.label}
      </label>
      {error && idx === 0 ? <p className="text-danger">Payment method is required.</p> : null}
    </div>
  ));
}

function TermsAndConditions() {
  return (
    <div className="col-12">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="termsCheckbox" required />
        <label className="form-check-label" htmlFor="termsCheckbox">
          I have read and agree to the
          <Link to="/terms-condition?id=termsconditions" className="ak-primary-color text-decoration-underline">
            {" "}
            Terms & Conditions
          </Link>
          ,
          <Link to="/terms-condition?id=privacypolicy" className="ak-primary-color text-decoration-underline">
            {" "}
            Privacy Policy
          </Link>
          , and
          <Link to="/terms-condition?id=refundpolicy" className="ak-primary-color text-decoration-underline">
            {" "}
            Refund Policy
          </Link>
          .
        </label>
      </div>
    </div>
  );
}

export default function Donation() {
  const [searchParams] = useSearchParams();
  const programIdFromQuery = Number(searchParams.get("program_id")) || null;
  const typeFromQuery = String(searchParams.get("type") || "").toLowerCase();

  const authMemberId = getAuthMemberId();
  const isLoggedIn = Boolean(authMemberId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      donation_type: typeFromQuery === "program" ? "program" : "normal",
      program_id: programIdFromQuery || "",
      member_id: "",
      name: "",
      organization_name: "",
      email_address: "",
      phone_number: "",
      pay_amount: "",
      payment_type: "",
      cash_txn_reference: "",
    },
  });

  const donationType = watch("donation_type");
  const selectedProgramId = Number(watch("program_id")) || null;
  const selectedPaymentType = watch("payment_type");

  const { data: memberData, isLoading: memberLoading } = useGetMemberDetailsIdQuery(
    { id: authMemberId, viewer_id: authMemberId },
    { skip: !isLoggedIn }
  );

  const { data: programListData } = useGetMilestoneProgramQuery();

  const [donationPayment] = useDonationPaymentMutation();
  const { data: paymentSettings } = useGetPaymentSettingsQuery();

  const paymentMethodOptions = useMemo(() => {
    const sslEnabled = Boolean(paymentSettings?.result?.ssl_enabled);
    const cashEnabled = Boolean(paymentSettings?.result?.cash_enabled);
    const options = [];
    if (sslEnabled) options.push({ label: "SSLCommerz", value: "ssl_commerz" });
    if (cashEnabled)
      options.push({ label: "Cash Payment (Admin Approval Required)", value: "cash" });
    return options;
  }, [paymentSettings]);

  const programOptions = useMemo(
    () =>
      Array.isArray(programListData?.result)
        ? programListData.result.map((item) => ({
            value: String(item?.id),
            label: item?.title || `Program ${item?.id}`,
          }))
        : [],
    [programListData]
  );

  useEffect(() => {
    if (isLoggedIn && memberData?.success) {
      const member = memberData.result;
      setValue("name", member.name || "");
      setValue("organization_name", member.organization_name || "");
      setValue("email_address", member.email || "");
      setValue("phone_number", member.phone_number || "");
      setValue("member_id", String(member.id || ""));
    } else if (!isLoggedIn) {
      setValue("member_id", "guest");
    }
  }, [isLoggedIn, memberData, setValue]);

  useEffect(() => {
    if (paymentMethodOptions.length > 0) {
      setValue("payment_type", paymentMethodOptions[0].value);
    }
  }, [paymentMethodOptions, setValue]);

  useEffect(() => {
    if (programIdFromQuery) {
      setValue("program_id", String(programIdFromQuery));
      setValue("donation_type", "program");
    }
  }, [programIdFromQuery, setValue]);

  const onSubmit = async (values) => {
    if (!paymentMethodOptions.length) {
      toast.info("No payment method is enabled by admin.", TOAST_OPTIONS);
      return;
    }

    if (values.donation_type === "program" && !values.program_id) {
      toast.info("Please provide a program for program-wise donation.", TOAST_OPTIONS);
      return;
    }

    try {
      const payload = {
        ...values,
        donation_type: values.donation_type === "program" ? "program" : "normal",
        program_id: values.donation_type === "program" ? Number(values.program_id) : null,
        member_id: values.member_id || (isLoggedIn ? String(authMemberId) : "guest"),
        cash_txn_reference:
          (values.payment_type || "ssl_commerz") === "cash"
            ? String(values.cash_txn_reference || "").trim()
            : "",
      };
      const resp = await donationPayment(payload);
      if (resp?.data?.success) {
        if (resp?.data?.cash) {
          toast.success(resp?.data?.message || "Donation request submitted.", TOAST_OPTIONS);
          return;
        }
        window.location.replace(resp?.data?.url);
      } else {
        throw new Error(resp?.data?.message || "Payment not completed");
      }
    } catch (error) {
      toast.info(error.message, TOAST_OPTIONS);
    }
  };

  if (isLoggedIn && memberLoading) return <HomeLoading />;

  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-60" />
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3" autoComplete="on">
        <div className="col-12">
          <label className="form-label">Donation Type*</label>
          <div className="d-flex flex-wrap gap-4">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input custom-checkbox"
                type="radio"
                id="donationTypeNormal"
                value="normal"
                {...register("donation_type", { required: true })}
                disabled={Boolean(programIdFromQuery)}
              />
              <label className="form-check-label" htmlFor="donationTypeNormal">
                Normal Donation
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input custom-checkbox"
                type="radio"
                id="donationTypeProgram"
                value="program"
                {...register("donation_type", { required: true })}
              />
              <label className="form-check-label" htmlFor="donationTypeProgram">
                Program-wise Donation
              </label>
            </div>
          </div>
        </div>

        {donationType === "program" ? (
          <div className="col-12">
            <label className="form-label">Program*</label>
            <select
              className="text-input-filed type_2"
              {...register("program_id", { required: "Program is required for program-wise donation" })}
            >
              <option value="">Select Program</option>
              {programOptions.map((program) => (
                <option key={program.value} value={program.value}>
                  {program.label}
                </option>
              ))}
            </select>
            {errors.program_id ? <p className="text-danger">{errors.program_id.message}</p> : null}
          </div>
        ) : null}

        <InputField
          label="Name"
          id="inputName"
          error={errors.name}
          required
          register={register}
          field="name"
          validation={{ required: true, minLength: 3, maxLength: 50 }}
          errorMessage={{
            required: "Name is required",
            minLength: "Name must be at least 3 characters",
            maxLength: "Name cannot exceed 50 characters",
          }}
        />

        <InputField
          label="Organization Name"
          id="inputOrganization"
          error={errors.organization_name}
          required
          register={register}
          field="organization_name"
          validation={{ required: true, minLength: 3, maxLength: 100 }}
          errorMessage={{
            required: "Organization Name is required",
            minLength: "Organization Name must be at least 3 characters",
            maxLength: "Organization Name cannot exceed 100 characters",
          }}
        />

        <InputField
          label="Email Address"
          id="inputEmail"
          type="email"
          error={errors.email_address}
          required
          register={register}
          field="email_address"
          validation={{
            required: true,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          errorMessage={{
            required: "Email is required",
            pattern: "Invalid email format",
          }}
        />

        <InputField
          label="Phone Number"
          id="inputPhone"
          type="tel"
          error={errors.phone_number}
          required
          register={register}
          field="phone_number"
          validation={{
            required: true,
            minLength: { value: 10, message: "Phone number must be at least 10 digits" },
            maxLength: { value: 15, message: "Phone number must be less than 15 digits" },
          }}
          errorMessage={{ required: "Phone number is required" }}
        />

        <InputField
          label="Payment Amount"
          id="inputAmount"
          type="number"
          error={errors.pay_amount}
          required
          register={register}
          field="pay_amount"
          validation={{
            required: true,
            min: { value: 1, message: "Amount must be at least 1" },
          }}
          errorMessage={{
            required: "Payment amount is required",
            min: "Amount must be greater than 0",
          }}
        />

        <div className="col-12">{renderPaymentMethods(register, errors.payment_type, paymentMethodOptions)}</div>
        {selectedPaymentType === "cash" ? (
          <div className="col-12">
            <label className="form-label" htmlFor="cashTxnReferenceDonation">
              Cash TXN/Reference Number*
            </label>
            <input
              id="cashTxnReferenceDonation"
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
        {!paymentMethodOptions.length ? <p className="text-danger">No payment method is enabled by admin.</p> : null}

        <input type="hidden" {...register("member_id")} />

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
