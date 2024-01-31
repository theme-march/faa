import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Donation() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
  };

  const onSubmit = (data) => {
    if (data) {
      toast.success("SignIn Successfully!", toastOptions);

      reset();
    } else {
      toast.info("User not found!", toastOptions);
    }
  };

  // State to track the checkbox's checked status
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox click
  const handleCheckboxClick = () => {
    // Update the isChecked state
    setIsChecked(!isChecked);
  };

  return (
    <div className="container">
      <div className="ak-height-100 ak-height-lg-60"></div>
      <form
        action="POST"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
        className="row g-3"
      >
        <div className="col-12">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              checked={!isChecked}
              onChange={handleCheckboxClick}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Donate as a member
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              checked={isChecked}
              onChange={handleCheckboxClick}
            />
            <label className="form-check-label" htmlFor="inlineRadio3">
              Donate as a guest
            </label>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="inputNameMember" className="form-label">
            {errors.member_name?.type === "required" ? (
              <p role="alert " className="text-danger">
                Name*
              </p>
            ) : (
              "Name*"
            )}
          </label>
          <input
            type="name"
            className="text-input-filed type_2"
            id="inputNameMember"
            required
            {...register("member_name", { required: true })}
          />
        </div>
        {isChecked && (
          <>
            <div className="col-12">
              <label htmlFor="inputOrganization" className="form-label">
                {errors.organization_name?.type === "required" ? (
                  <p role="alert " className="text-danger">
                    Organization Name
                  </p>
                ) : (
                  "Organization Name*"
                )}
              </label>
              <input
                type="number"
                className="text-input-filed type_2"
                id="inputOrganization"
                {...register("organization_name")}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputEmail" className="form-label">
                {errors.email?.type === "required" ? (
                  <p role="alert " className="text-danger">
                    Email Address
                  </p>
                ) : (
                  "Email Address*"
                )}
              </label>
              <input
                type="email"
                className="text-input-filed type_2"
                id="inputEmail"
                required
                {...register("email", { required: true })}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputPhone" className="form-label">
                {errors.phone_number?.type === "required" ? (
                  <p role="alert " className="text-danger">
                    Phone Number
                  </p>
                ) : (
                  "Phone Number*"
                )}
              </label>
              <input
                type="number"
                className="text-input-filed type_2"
                id="inputPhone"
                required
                {...register("phone_number", { required: true })}
              />
            </div>
          </>
        )}
        <div className="col-12">
          <label htmlFor="inputAmount" className="form-label">
            {errors.pay_amount?.type === "required" ? (
              <p role="alert " className="text-danger">
                Pay Amount*
              </p>
            ) : (
              "Pay Amount*"
            )}
          </label>
          <input
            type="number"
            className="text-input-filed type_2"
            id="inputAmount"
            required
            {...register("pay_amount", { required: true })}
          />
        </div>
        <div className="col-12">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              name="inlineRadioOptions"
              id="bkash"
              required
              value="bkash"
              {...register("payment")}
            />
            <label className="form-check-label" htmlFor="bkash">
              Bkash Payment
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              name="inlineRadioOptions"
              id="ssl_commerz"
              value="ssl_commerz"
              required
              {...register("payment")}
            />
            <label className="form-check-label" htmlFor="ssl_commerz">
              SSLCommerz
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              name="inlineRadioOptions"
              id="cash_payment"
              required
              value="cash_payment"
              {...register("payment")}
            />
            <label className="form-check-label" htmlFor="cash_payment">
              Cash payment
            </label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              name="check_btn"
              id="check_btn"
              required
              value="check_btn"
              {...register("check_btn")}
            />
            <label className="form-check-label" htmlFor="check_btn">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum
            </label>
          </div>
        </div>
        <div className="col-12 mt-5">
          <button type="submit" className="button-primary">
            Pay Now
          </button>
        </div>
      </form>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
