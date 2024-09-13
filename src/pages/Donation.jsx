import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useGetMemberDetailsIdQuery } from "../features/member/memberApiIn";
import { useMemberPaymentMutation } from "../features/payment/sslPaymentApiIn";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

export default function Donation() {
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    data: memberData,
    isLoading,
    isError,
  } = useGetMemberDetailsIdQuery(loginUser?.id);
  const [memberPayment] = useMemberPaymentMutation();

  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
  };

  useEffect(() => {
    if (memberData?.success) {
      const member = memberData.result;
      setValue("name", member.name);
      setValue("organization_name", member.organization_name);
      setValue("email_address", member.email);
      setValue("phone_number", member.phone_number);
      setValue("member_id", member.id);
    }
  }, [memberData, setValue]);

  const onSubmit = async (data) => {
    try {
      const resp = await memberPayment(data);
      if (resp?.data?.success) {
        window.location.replace(resp?.data?.url);
      } else {
        throw new Error("Payment not completed");
      }
    } catch (error) {
      toast.info(error.message, toastOptions);
    }
    console.log(data);
  };

  if (isLoading) return <HomeLoading />;
  if (isError || memberData?.success === false)
    return <ErrorShow message={"No data found"} />;

  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-60"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row g-3"
        autoComplete="on"
      >
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
            minLength: {
              value: 10,
              message: "Phone number must be at least 10 digits",
            },
            maxLength: {
              value: 15,
              message: "Phone number must be less than 15 digits",
            },
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

        <div className="col-12">
          {renderPaymentMethods(register, errors.payment_type)}
        </div>

        <TermsAndConditions />

        <div className="col-12 mt-4">
          <button type="submit" className="button-primary">
            Pay Now
          </button>
        </div>
      </form>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}

// InputField Component with validation and error handling
function InputField({
  label,
  id,
  type = "text",
  register,
  field,
  validation,
  error,
  errorMessage,
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
        {...register(field, validation)}
      />
      {error && <p className="text-danger">{errorMessage[error.type]}</p>}
    </div>
  );
}

// Render payment methods with validation
function renderPaymentMethods(register, error) {
  const methods = [
    "Bkash",
    "SSLCommerz",
    "Visa",
    "Mastercard",
    "American Express",
  ];
  return methods.map((method, idx) => (
    <div key={idx} className="form-check form-check-inline">
      <input
        className="form-check-input custom-checkbox"
        type="radio"
        name="paymentMethod"
        id={method.toLowerCase()}
        value={method.toLowerCase()}
        {...register("payment_type", { required: true })}
      />
      <label className="form-check-label" htmlFor={method.toLowerCase()}>
        {method}
      </label>
      {error && idx === 0 && (
        <p className="text-danger">Payment method is required.</p>
      )}
    </div>
  ));
}

// Terms and Conditions Component
function TermsAndConditions() {
  return (
    <div className="col-12">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="termsCheckbox"
          required
        />
        <label className="form-check-label" htmlFor="termsCheckbox">
          I have read and agree to the
          <Link
            to="/terms-condition?id=termsconditions"
            className="ak-primary-color text-decoration-underline"
          >
            {" "}
            Terms & Conditions
          </Link>
          ,
          <Link
            to="/terms-condition?id=privacypolicy"
            className="ak-primary-color text-decoration-underline"
          >
            {" "}
            Privacy Policy
          </Link>
          , and
          <Link
            to="/terms-condition?id=refundpolicy"
            className="ak-primary-color text-decoration-underline"
          >
            {" "}
            Refund Policy
          </Link>
          .
        </label>
      </div>
    </div>
  );
}
