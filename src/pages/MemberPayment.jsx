import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { redirect } from "react-router-dom";
import {
  useGetMemberDetailsIdQuery,
  useGetMembersCategoryListQuery,
} from "../features/member/memberApiIn";
// import { useAddDonationRegisterMutation } from "../features/donation/donationApiInject";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";
import { useMemberPaymentMutation } from "../features/payment/sslPaymentApiIn";
import { useGetPaymentSettingsQuery } from "../features/payment/sslPaymentApiIn";
import { getAuthMemberId } from "../utils/authStorage";

// Constants
const TOAST_OPTIONS = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 1000,
};

const FormField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  register,
  errors,
  required = true,
  readOnly = false, // New prop to make the field read-only
}) => (
  <div className="col-12 mb-3">
    <label htmlFor={id} className="form-label">
      {label}*
    </label>
    <input
      type={type}
      className="text-input-filed type_2"
      id={id}
      value={value}
      {...register(id, { required })}
      onChange={onChange}
      readOnly={readOnly} // Use the readOnly prop here
    />
    {errors[id] && <p className="text-danger">{`${label} is required.`}</p>}
  </div>
);

// Radio Group Component
const RadioGroup = ({ options, register, name, required = true }) => (
  <div className="col-12 mb-3">
    {options.map((option) => (
      <div key={option.value} className="form-check form-check-inline">
        <input
          className="form-check-input custom-checkbox"
          type="radio"
          name={name}
          id={option.value}
          value={option.value}
          {...register(name, { required })}
        />
        <label className="form-check-label" htmlFor={option.value}>
          {option.label}
        </label>
      </div>
    ))}
  </div>
);

export default function MemberPayment() {
  const navigate = useNavigate();
  const authMemberId = getAuthMemberId();
  const { id: userId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    organization_name: "",
    email: "",
    phone_number: "",
    member_id: "",
    pay_amount: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const {
    data: memberData,
    isLoading,
    isError,
  } = useGetMemberDetailsIdQuery(
    { id: userId, viewer_id: authMemberId },
    { skip: !userId }
  );

  const { data: membership_category } = useGetMembersCategoryListQuery();
  const { data: paymentSettings } = useGetPaymentSettingsQuery();

  const [memberPayment] = useMemberPaymentMutation();
  const selectedPaymentType = watch("payment_type");
  const siteUrlFromSettings = String(paymentSettings?.result?.site_url || "").trim();

  const paymentMethodOptions = React.useMemo(() => {
    const sslEnabled = Boolean(paymentSettings?.result?.ssl_enabled);
    const cashEnabled = Boolean(paymentSettings?.result?.cash_enabled);

    const options = [];
    if (sslEnabled) options.push({ label: "SSLCommerz", value: "ssl_commerz" });
    if (cashEnabled)
      options.push({ label: "Cash Payment (Admin Approval Required)", value: "cash" });

    return options;
  }, [paymentSettings]);

  useEffect(() => {
    if (memberData?.success) {
      const {
        name,
        organization_name,
        email,
        phone_number,
        id,
      } = memberData.result;

      setFormData({
        name,
        organization_name,
        email,
        phone_number,
        member_id: id,
        pay_amount: "",
      });
      setValue("name", name);
      setValue("organization_name", organization_name);
      setValue("email_address", email);
      setValue("phone_number", phone_number);
      setValue("member_id", id);
    }
  }, [memberData, setValue]);

  useEffect(() => {
    if (!memberData?.success) return;

    const membershipCategoryId = memberData?.result?.membership_category_id;
    const categoryList = membership_category?.result || [];
    const matchedCategory = categoryList.find(
      (category) => String(category?.id) === String(membershipCategoryId)
    );

    const resolvedAmount = matchedCategory?.category_price ?? "";
    const normalizedAmount = String(resolvedAmount);

    setFormData((prev) => ({
      ...prev,
      pay_amount: normalizedAmount,
    }));
    setValue("pay_amount", normalizedAmount);
  }, [memberData, membership_category, setValue]);

  useEffect(() => {
    if (paymentMethodOptions.length > 0) {
      setValue("payment_type", paymentMethodOptions[0].value);
    }
  }, [paymentMethodOptions, setValue]);

  const onSubmit = async (data) => {
    if (!paymentMethodOptions.length) {
      toast.info("No payment method is enabled by admin.", TOAST_OPTIONS);
      return;
    }
    try {
      const payload = {
        ...data,
        payment_for: "membership",
        cash_txn_reference:
          (data.payment_type || "ssl_commerz") === "cash"
            ? String(data.cash_txn_reference || "").trim()
            : "",
      };

      const resp = await memberPayment(payload);

      if (resp?.data?.success) {
        if (data.payment_type === "cash" || resp?.data?.cash) {
          toast.success(
            resp?.data?.message || "Cash payment request submitted successfully.",
            TOAST_OPTIONS
          );
          navigate(`/member-details/${userId}`);
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

  if (isLoading) return <HomeLoading />;
  if (isError || !memberData?.success)
    return <ErrorShow message={"Item not found"} />;

  return (
    <div className="container">
      <div className="ak-height-100 ak-height-lg-60"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
        className="row g-3"
      >
        <div className="col-md-6">
          <FormField
            label="Name"
            id="name"
            value={formData.name}
            register={register}
            errors={errors}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <FormField
            label="Organization Name"
            id="organization_name"
            value={formData.organization_name}
            register={register}
            errors={errors}
            onChange={(e) =>
              setFormData({ ...formData, organization_name: e.target.value })
            }
          />
          <FormField
            label="Email Address"
            id="email_address"
            type="email"
            value={formData.email}
            register={register}
            errors={errors}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <FormField
            label="Phone Number"
            id="phone_number"
            type="tel"
            value={formData.phone_number}
            register={register}
            errors={errors}
            onChange={(e) =>
              setFormData({ ...formData, phone_number: e.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <FormField
            label="Payment Amount"
            id="pay_amount"
            type="number"
            value={formData.pay_amount}
            register={register}
            errors={errors}
            readOnly={true}
            onChange={(e) =>
              setFormData({ ...formData, pay_amount: e.target.value })
            }
          />

          <RadioGroup
            options={paymentMethodOptions}
            register={register}
            name="payment_type"
          />
          {selectedPaymentType === "cash" ? (
            <div className="col-12 mb-3">
              <label htmlFor="cash_txn_reference" className="form-label">
                Cash TXN/Reference Number*
              </label>
              <input
                type="text"
                className="text-input-filed type_2"
                id="cash_txn_reference"
                {...register("cash_txn_reference", {
                  required: "Cash TXN/Reference Number is required for cash payment",
                })}
              />
              {errors.cash_txn_reference ? (
                <p className="text-danger">{errors.cash_txn_reference.message}</p>
              ) : null}
              {String(paymentSettings?.result?.cash_payment_notice || "").trim() ? (
                <p className="mb-0" style={{ color: "#4a3b7a" }}>
                  {paymentSettings.result.cash_payment_notice}
                </p>
              ) : null}
            </div>
          ) : null}
          {!paymentMethodOptions.length ? (
            <p className="text-danger mt-1">
              No payment method is enabled by admin. Please contact support.
            </p>
          ) : null}
          <input type="hidden" {...register("member_id", { required: true })} />
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="termsCheckbox"
                required
              />
              <label className="form-check-label" htmlFor="termsCheckbox">
                I have read and agree the "
                <Link
                  to="/terms-condition?id=termsconditions"
                  className="ak-primary-color text-decoration-underline"
                >
                  Terms & Conditions
                </Link>
                ,{" "}
                <Link
                  to="/terms-condition?id=privacypolicy"
                  className="ak-primary-color text-decoration-underline"
                >
                  Privacy Policy{" "}
                </Link>
                and{" "}
                <Link
                  to="/terms-condition?id=refundpolicy"
                  className="ak-primary-color text-decoration-underline"
                >
                  Refund Policy{" "}
                </Link>
                " of Finanace Alumni Association Website{" "}
                <a
                  href={siteUrlFromSettings || "https://faa-dubd.org"}
                  target="_blank"
                  rel="noreferrer"
                >
                  {siteUrlFromSettings || "https://faa-dubd.org"}
                </a>
              </label>
            </div>
          </div>
          <div className="col-12 mt-5">
            <button type="submit" className="button-primary">
              Pay Now
            </button>
          </div>
        </div>
      </form>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
