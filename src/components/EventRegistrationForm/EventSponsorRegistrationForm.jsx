import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useAddEventSponsorRegisterMutation,
  useGetEventDetailsIdQuery,
} from "../../features/events/eventsApiInject";
import { toast } from "react-toastify";
import ErrorShow from "../UI/ErrorShow";
import HomeLoading from "../UI/HomeLoading";
import { useGetMemberDetailsIdQuery } from "../../features/member/memberApiIn";
import { useMemberPaymentMutation } from "../../features/payment/sslPaymentApiIn";
import { Link } from "react-router-dom";

export default function EventSponsorRegistrationForm(props) {
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const eventId = props?.props;

  const {
    data: memberData,
    isLoading,
    isSuccess,
    isError,
  } = useGetMemberDetailsIdQuery(loginUser?.id, { skip: !loginUser });

  const {
    data: eventsDetailsData,
    isLoading: eventsisLoading,
    isError: eventsisError,
    isSuccess: eventsisSuccess,
  } = useGetEventDetailsIdQuery(eventId, { skip: !eventId });

  const [AddEventSponsorRegister, { data }] =
    useAddEventSponsorRegisterMutation();

  const [memberPayment] = useMemberPaymentMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
  };

  useEffect(() => {
    if (
      memberData?.success &&
      eventsDetailsData?.success &&
      isSuccess &&
      eventsisSuccess
    ) {
      const member = memberData.result;
      setValue("event_id", eventId);
      setValue("member_id", member.id);
      setValue("name", member.name);
      setValue("organization_name", member.organization_name);
      setValue("designation_name", member.designation_name);
      setValue("email_address", member.email);
      setValue("phone_number", member.phone_number);
      setValue("pay_amount", " ");
    } else if (!loginUser == true) {
      // Clear all input fields if user is not logged in
      reset({
        event_id: eventId,
        member_id: "",
        name: "",
        organization_name: "",
        designation_name: "",
        email_address: "",
        phone_number: "",
        pay_amount: "",
      });
    }
  }, [memberData, setValue, eventsDetailsData, !loginUser]);

  const onSubmit = async (data) => {
    const postData = {
      event_id: data.event_id,
      member_id: data.member_id,
      full_name: data.name,
      organization_name: data.organization_name,
      designation_name: data.designation_name,
      email: data.email_address,
      phone_number: data.phone_number,
      address: "member user",
    };

    try {
      const respAddEvent = await AddEventSponsorRegister(postData);

      if (
        respAddEvent?.data?.success === true ||
        (respAddEvent?.data?.success === false &&
          respAddEvent?.data?.message === "Already event registered !")
      ) {
        const resp = await memberPayment(data);

        if (resp?.data?.success) {
          window.location.replace(resp?.data?.url);
        } else {
          throw new Error("Payment not completed");
        }
      } else {
        toast.info(respAddEvent?.data?.message, toastOptions);
      }
    } catch (error) {
      toast.info(error.message, toastOptions);
    }
  };

  if (isLoading && eventsisLoading && loginUser && eventId)
    return <HomeLoading />;
  if (
    (!isLoading && isError && eventsisError && loginUser && !isSuccess) ||
    memberData?.success === false
  )
    return <ErrorShow message={"No data found"} />;

  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-60"></div>
      <h6 className="mb-3">
        Event Title: {eventsDetailsData?.result[0]?.event_title}
      </h6>
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
        {...register(field, validation)}
        disabled={disabled}
      />
      {error && <p className="text-danger">{errorMessage[error.type]}</p>}
    </div>
  );
}

function renderPaymentMethods(register, error) {
  const methods = ["SSLCommerz"];
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
