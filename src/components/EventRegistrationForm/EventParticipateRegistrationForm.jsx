import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import {
  useAddEventRegisterMutation,
  useGetEventDetailsIdQuery,
} from "../../features/events/eventsApiInject";
import {
  useGetMemberDetailsIdQuery,
  useGetMembersSessionListQuery,
} from "../../features/member/memberApiIn";

import ErrorShow from "../UI/ErrorShow";
import HomeLoading from "../UI/HomeLoading";
import batchPdf from "../../assets/Batchnumber.pdf";

export default function EventParticipateRegistrationForm({ props: eventId }) {
  const loginUser = JSON.parse(localStorage.getItem("user"));

  // API Queries and Mutations
  const { data: memberData, isLoading: memberLoading } =
    useGetMemberDetailsIdQuery(loginUser?.id, { skip: !loginUser });
  const { data: eventDetails, isLoading: eventLoading } =
    useGetEventDetailsIdQuery(eventId, { skip: !eventId });
  const [addEventRegister] = useAddEventRegisterMutation();

  // Form configuration
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // State for breakdown
  const [participationType, setParticipationType] = useState(""); // Single or Spouse
  const [tshirtSize, setTShirtSize] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState("from_event");
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [membershipRenewAmount, setMembershipRenewAmount] = useState(0); // Member Renew Amount
  const [totalAmount, setTotalAmount] = useState(0);

  // Toast options
  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
  };

  const { data: BatchSession } = useGetMembersSessionListQuery();

  const BatchSessionOptions = BatchSession?.result?.map((batchNumber) => ({
    value: batchNumber.id,
    label: `${batchNumber.batch_session_name}`,
  }));

  // Update breakdown based on member data
  useEffect(() => {
    if (memberData?.success && eventDetails?.success) {
      const member = memberData.result;
      setValue("event_id", eventId);
      setValue("member_id", member.id);
      setValue("session", member.session);
      setValue("full_name", member.name);
      setValue("organization_name", member.organization_name);
      setValue("designation_name", member.designation_name);
      setValue("email_address", member.email);
      setValue("phone_number", member.phone_number);
      setValue("pay_amount", eventDetails?.result[0]?.event_fees);

      // Set Member Renew Amount
      if (member.membership_category_id === "3") {
        setMembershipRenewAmount(0);
      } else if (member.membership_category_id === "4") {
        if (member.is_pay) {
          setMembershipRenewAmount(0);
        } else {
          setMembershipRenewAmount(
            Number(eventDetails?.result[0]?.membership_renew_fees)
          );
        }
      }
    } else {
      // Fallback values when memberData is undefined
      reset({
        event_id: eventId,
        member_id: "",
        student_id: "",
        session: "",
        full_name: "",
        organization_name: "",
        designation_name: "",
        email_address: "",
        phone_number: "",
        pay_amount: eventDetails?.result[0]?.event_fees,
      });
      setMembershipRenewAmount(0); // Default for undefined member data
    }
  }, [
    memberData,
    eventDetails,
    setValue,
    reset,
    loginUser,
    eventId,
    BatchSession,
  ]);

  const handleTShirtSizeChange = (value) => {
    setTShirtSize(value);
  };

  // Helper function for calculation
  const calculateTotalAmount = (
    participationType,
    membershipRenewAmount,
    memberData,
    deliveryCharge = 0
  ) => {
    let participationAmount = 0;

    if (memberData) {
      if (participationType === "Single") {
        participationAmount = Number(
          eventDetails?.result[0]?.member_single_fees
        );
      } else if (participationType === "Spouse") {
        participationAmount = Number(
          Number(eventDetails?.result[0]?.member_single_fees) +
            Number(eventDetails?.result[0]?.member_spouse_fees)
        );
      }
    } else {
      if (participationType === "Single") {
        participationAmount = Number(
          eventDetails?.result[0]?.student_single_fees
        );
      } else if (participationType === "Spouse") {
        // participationAmount = Number(
        //   Number(eventDetails?.result[0]?.student_single_fees) +
        //     Number(eventDetails?.result[0]?.student_spouse_fees)
        // );
          participationAmount = Number(
              eventDetails?.result[0]?.student_spouse_fees
          );
      }
    }

    return membershipRenewAmount + participationAmount + deliveryCharge;
  };

  const handleReset = () => {
    reset({
      t_shirt_size: "", // Reset T-Shirt size
      delivery_address: "", // Reset Delivery Address
      delivery_charge: "", // Reset Delivery Charge
      delivery_option: "", // Reset Delivery Option
    });

    // Reset additional states if needed
    setTShirtSize(null);
    setDeliveryOption("from_event");
    setDeliveryCharge(0);
    setTotalAmount(0);
  };

  // Event Handlers
  const handleParticipationChange = (value) => {
    if (!value) {
      handleReset();
      setParticipationType(value);
    } else {
      setParticipationType(value);

      // Recalculate total with the updated participation type and existing delivery charge
      const total = calculateTotalAmount(
        value,
        membershipRenewAmount,
        memberData,
        deliveryCharge
      );
      setTotalAmount(total);
    }
  };

  const handleDeliveryOptionChange = (value) => {
    if (!value || value === "from_event") {
      reset({
        delivery_charge: "", // Reset Delivery Charge
      });
    }
    setDeliveryOption(value);

    // Reset delivery charge to ensure consistency
    setDeliveryCharge(0);

    // Recalculate total amount without delivery charge
    const total = calculateTotalAmount(
      participationType,
      membershipRenewAmount,
      memberData,
      0
    );
    setTotalAmount(total);
  };

  const handleDeliveryChargeChange = (value) => {
    const charge = Number(value);
    setDeliveryCharge(charge);

    // Recalculate total with the updated delivery charge
    const total = calculateTotalAmount(
      participationType,
      membershipRenewAmount,
      memberData,
      charge
    );
    setTotalAmount(total);
  };

  const onSubmit = async (data) => {
    try {
      data.event_id = eventDetails?.result[0]?.id;
      if (memberData?.success) {
        const member = memberData.result;
        data.session = member.session;
        if (participationType === "Single") {
          data.member_single_fees = eventDetails?.result[0]?.member_single_fees;
        } else if (participationType === "Spouse") {
          data.member_single_fees = eventDetails?.result[0]?.member_single_fees;
          data.member_spouse_fees = eventDetails?.result[0]?.member_spouse_fees;
        }
        if (member.membership_category_id === "3") {
          data.member_type = "Life Time Member";
          data.member_category_id = member.membership_category_id;
        } else if (member.membership_category_id === "4") {
          data.membership_renew_fees =
            eventDetails?.result[0]?.membership_renew_fees;
          data.member_type = "General Member";
          data.member_category_id = member.membership_category_id;
        } else {
          data.member_type = "Student/Guest";
          data.member_category_id = "6";
        }
      } else {
        if (participationType === "Single") {
          data.student_single_fees =
            eventDetails?.result[0]?.student_single_fees;
        } else if (participationType === "Spouse") {
          data.student_single_fees =
            eventDetails?.result[0]?.student_single_fees;
          data.student_spouse_fees =
            eventDetails?.result[0]?.student_spouse_fees;
        }
        data.member_type = "Student/Guest";
        data.member_category_id = "6";
      }

      data.pay_amount = totalAmount;
      const registerResponse = await addEventRegister(data);

      if (
        registerResponse?.data?.success ||
        registerResponse?.data?.message === "Already event registered!"
      ) {
        window.location.replace(registerResponse.data.url);
      } else {
        toast.info(registerResponse?.data?.message, toastOptions);
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  if (memberLoading || eventLoading) return <HomeLoading />;
  if (!eventDetails?.success)
    return <ErrorShow message="No event details found" />;

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-60"></div>
      <h6 className="mb-3">
        Event Title: {eventDetails?.result[0]?.event_title}
      </h6>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row g-3"
        autoComplete="on"
      >
        {/* Input Fields */}
        {!memberData ? (
          <>
            <InputField
              label="Student ID"
              id="inputName"
              required
              register={register}
              field="student_id"
              validation={{ required: true }}
              errorMessage={{
                required: "Student ID is required",
              }}
              error={errors.student_id}
            />

            <InputField
              label="Batch number/ Session"
              id="inputName"
              required
              register={register}
              field="session"
              type="select"
              validation={{ required: true }}
              options={BatchSessionOptions}
              errorMessage={{
                required: "Batch number/ Session is required",
              }}
              error={errors.session}
            />
          </>
        ) : null}
        <InputField
          label="Name"
          id="inputName"
          required
          register={register}
          field="full_name"
          validation={{ required: true, minLength: 3, maxLength: 50 }}
          errorMessage={{
            required: "Name is required",
            minLength: "Name must be at least 3 characters",
            maxLength: "Name cannot exceed 50 characters",
          }}
          error={errors.full_name}
        />

        <InputField
          label="Organization Name"
          id="inputOrganization"
          required
          register={register}
          field="organization_name"
          validation={{ required: true, minLength: 3, maxLength: 100 }}
          errorMessage={{
            required: "Organization Name is required",
            minLength: "Organization Name must be at least 3 characters",
            maxLength: "Organization Name cannot exceed 100 characters",
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
            required: true,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          }}
          errorMessage={{
            required: "Email is required",
            pattern: "Invalid email format",
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
            required: true,
            minLength: {
              value: 10,
              message: "Phone number must be at least 10 digits",
            },
            maxLength: {
              value: 15,
              message: "Phone number cannot exceed 15 digits",
            },
          }}
          errorMessage={{ required: "Phone number is required" }}
          error={errors.phone_number}
        />

        {memberData ? (
          <InputField
            label="Participation Type"
            id="participationType"
            type="select"
            register={register}
            field="participation_type"
            validation={{ required: true }}
            options={[
              {
                value: "Single",
                label: `Single (${eventDetails?.result[0]?.member_single_fees} Taka)`,
              },
              {
                value: "Spouse",
                // label: `Spouse (Single ${eventDetails?.result[0]?.member_single_fees} + Spouse ${eventDetails?.result[0]?.member_spouse_fees} Taka)`,
                label: `With Spouse (${
                  Number(eventDetails?.result[0]?.member_single_fees) +
                  Number(eventDetails?.result[0]?.member_spouse_fees)
                } Taka)`,
              },
            ]}
            onChange={(e) => handleParticipationChange(e.target.value)}
            errorMessage={{ required: "Please select a participation type" }}
            error={errors.participation_type}
          />
        ) : (
          <InputField
            label="Participation Type"
            id="participationType"
            type="select"
            register={register}
            field="participation_type"
            validation={{ required: true }}
            options={[
              //removing Single option 27/12/24
              /*   {
                value: "Single",
                label: `Single (${eventDetails?.result[0]?.student_single_fees} Taka)`,
              }, */

              // Single option changes and updates Student Option
              {
                value: "Single",
                label: `Student- BBA/MBA (${eventDetails?.result[0]?.student_single_fees} Taka)`,
              },

              {
                value: "Spouse",
                label: `Student- EMBA/MPF (${Number(
                  eventDetails?.result[0]?.student_spouse_fees
                )} Taka)`,
              },

              // removing the with Spouse option
              /* {
                value: "Spouse",
                // label: `Spouse (Single ${eventDetails?.result[0]?.student_single_fees} + Spouse ${eventDetails?.result[0]?.student_spouse_fees} Taka)`,
                label: `Spouse(${
                  Number(eventDetails?.result[0]?.student_single_fees) +
                  Number(eventDetails?.result[0]?.student_spouse_fees)
                } Taka)`
              }, */
            ]}
            onChange={(e) => handleParticipationChange(e.target.value)}
            errorMessage={{ required: "Please select a participation type" }}
            error={errors.participation_type}
          />
        )}

        {/* Gift details */}
        {participationType ? (
          <>
            <InputField
              label="T-Shirt Size"
              id="tShirtSize"
              type="select"
              register={register}
              field="t_shirt_size"
              validation={{ required: true }}
              options={[
                {
                  value: "S",
                  label: 'T- Shirt: S - Length 26" chest 36".',
                },
                {
                  value: "M",
                  label: 'T- Shirt: M - Length 27" chest 38".',
                },
                {
                  value: "L",
                  label: 'T- Shirt: L - Length 28" chest: 40".',
                },
                {
                  value: "XL",
                  label: 'T- Shirt: XL - Length 29" chest 42"',
                },
                {
                  value: "2XL",
                  label: 'T- Shirt: 2XL - Length 30" chest 44"',
                },
                {
                  value: "3XL",
                  label: 'T- Shirt: 3XL - Length 31" chest 46"',
                },
                {
                  value: "4XL",
                  label: 'T- Shirt: 4XL - Length 32" chest 48"',
                },
                {
                  value: "5XL",
                  label: 'T- Shirt: 5XL - Length 33" chest 50"',
                },
              ]}
              onChange={(e) => handleTShirtSizeChange(e.target.value)}
              errorMessage={{ required: "Please select a T-Shirt size" }}
              error={errors.t_shirt_size}
            />
             {tshirtSize ? (
              <>
                <InputField
                  label="Do you want to receive your gift at home?"
                  id="deliveryOption"
                  type="select"
                  register={register}
                  field="delivery_option"
                  validation={{ required: true }}
                  options={[
                    // { value: "from_event", label: "No" },
                    { value: "from_home", label: "Yes" },
                  ]}
                  errorMessage={{ required: "Please select delivery option" }}
                  onChange={(e) => handleDeliveryOptionChange(e.target.value)}
                  error={errors.delivery_option}
                />
                {deliveryOption === "from_home" ? (
                  <>
                    {/*<InputField*/}
                    {/*   label="Delivery Charge"*/}
                    {/*   id="deliveryCharge"*/}
                    {/*   type="select"*/}
                    {/*   register={register}*/}
                    {/*   field="delivery_charge"*/}
                    {/*   validation={{required: true}}*/}
                    {/*   options={[*/}
                    {/*       {value: "60", label: "For Dhaka (60 TK)"},*/}
                    {/*       {value: "110", label: "Outside Dhaka (110 TK)"},*/}
                    {/*   ]}*/}
                    {/*   onChange={(e) => handleDeliveryChargeChange(e.target.value)}*/}
                    {/*   errorMessage={{required: "Please select a delivery charge"}}*/}
                    {/*   error={errors.delivery_charge}*/}
                    {/*/>*/}
                    <div style={{ fontSize: 12 }}>
                      <div style={{ fontWeight: "bold" }}>Delivery Address</div>
                      <div>
                        1. Pay Delivery Charge in cash on delivery: Dhaka - 60
                        TK
                      </div>
                      <div>
                        2. Pay Delivery Charge in cash on delivery: Outside
                        Dhaka - 110 TK
                      </div>
                    </div>
                    <InputField
                      label="Delivery Address"
                      id="deliveryAddress"
                      required
                      register={register}
                      field="delivery_address"
                      validation={{ required: true }}
                      errorMessage={{
                        required: "Delivery address is required",
                      }}
                      error={errors.delivery_address}
                    />
                    <div style={{ color: "#a55252" }}>
                      Please note you can't edit the address after pay
                    </div>
                  </>
                ) : null}
              </>
            ) : null}
          </>
        ) : null}

        {/* Membership Amount Breakdown */}
        <div className="col-12 mt-4">
          <h5 className="text-primary">Payment Details</h5>
          <div className="amount-breakdown p-3 border rounded bg-light">
            {memberData ? (
              <p className="d-flex justify-content-between">
                <span>
                  <strong>Annual Membership:</strong>
                </span>
                <span>{membershipRenewAmount.toFixed(2)} Taka</span>
              </p>
            ) : null}

            {participationType === "Single" && memberData && (
              <p className="d-flex justify-content-between">
                <span>
                  <strong>Subscription fee:</strong>
                </span>
                <span>
                  + {eventDetails?.result[0]?.member_single_fees} Taka
                </span>
              </p>
            )}
            {participationType === "Single" && !memberData && (
              <p className="d-flex justify-content-between">
                <span>
                  <strong>Student Subscription fee:</strong>
                </span>
                <span>
                  + {eventDetails?.result[0]?.student_single_fees} Taka
                </span>
              </p>
            )}
            {participationType === "Spouse" && memberData && (
              <>
                <p className="d-flex justify-content-between">
                  <span>
                    <strong>Subscription fee:</strong>
                  </span>
                  <span>
                    + {eventDetails?.result[0]?.member_single_fees} Taka
                  </span>
                </p>
                <p className="d-flex justify-content-between">
                  <span>
                    <strong>With Spouse:</strong>
                  </span>
                  <span>
                    + {eventDetails?.result[0]?.member_spouse_fees} Taka
                  </span>
                </p>
              </>
            )}
            {participationType === "Spouse" && !memberData && (
              <>
                <p className="d-flex justify-content-between">
                  <span>
                    <strong>Student Subscription fee:</strong>
                  </span>
                  <span>
                    + {eventDetails?.result[0]?.student_spouse_fees} Taka
                  </span>
                </p>
                {/*<p className="d-flex justify-content-between">*/}
                {/*  <span>*/}
                {/*    <strong>With Spouse:</strong>*/}
                {/*  </span>*/}
                {/*  <span>*/}
                {/*    + {eventDetails?.result[0]?.student_spouse_fees} Taka*/}
                {/*  </span>*/}
                {/*</p>*/}
              </>
            )}

            {deliveryCharge > 0 && (
              <p className="d-flex justify-content-between">
                <span>
                  <strong>Delivery Charge:</strong>
                </span>
                <span>+ {deliveryCharge.toFixed(2)} Taka</span>
              </p>
            )}

            <hr />
            <p className="d-flex justify-content-between text-success fw-bold">
              <span>Total:</span>
              <span>{formatAmount(totalAmount)} Taka</span>
            </p>
          </div>
        </div>

        <TermsAndConditions />

        {/* Submit Button */}
        <div className="col-12 mt-4">
          <button type="submit" className="button-primary">
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
}

// InputField Component
function InputField({
  label,
  id,
  type = "text",
  register,
  field,
  validation,
  error,
  errorMessage,
  options,
  onChange,
}) {
  return (
    <div className="col-md-6">
      <label htmlFor={id} className="form-label">
        {label}*{" "}
        {field === "session" && (
          <Link
            to={batchPdf}
            className="text-danger d-inline me-3"
            target="_blank"
          >
            Click{" "}
            <span className="text-decoration-underline text-primary">here</span>{" "}
            to know your Batch Number
          </Link>
        )}
      </label>
      {type === "select" ? (
        <select
          className="text-input-filed type_2"
          id={id}
          {...register(field, validation)}
          onChange={onChange}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="text-input-filed type_2"
          id={id}
          {...register(field, validation)}
        />
      )}
      {error && <p className="text-danger">{errorMessage[error.type]}</p>}
    </div>
  );
}

// Terms and Conditions Component
function TermsAndConditions() {
  return (
    <div className="col-12">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="termsConditions"
          required
        />
        <label className="form-check-label" htmlFor="termsConditions">
          I agree to the terms and conditions.
        </label>
      </div>
    </div>
  );
}
