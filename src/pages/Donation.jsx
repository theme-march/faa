import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddDonationRegisterMutation } from "../features/donation/donationApiInject";
import { useNavigate } from "react-router-dom";
import { useGetMemberDetailsIdQuery } from "../features/member/memberApiIn";

export default function Donation() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const { data: memberData } = useGetMemberDetailsIdQuery(loginUser?.id);
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

  const [AddDonationRegister] = useAddDonationRegisterMutation();

  const onSubmit = async (data) => {
    if (isChecked) {
      if (data) {
        const postData = {
          member_id: "",
          ...data,
        };
        const resp = await AddDonationRegister(postData);
        if (resp.data.success) {
          toast.success("Donation Registration Completed", toastOptions);
          reset();
        } else {
          toast.info("Donation Already Registration", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1200,
          });
        }
      } else {
        toast.info("User not found!", toastOptions);
      }
    } else {
      if (loginUser) {
        const { name, organization_name, email, phone_number, id } =
          memberData.result;

        const postData = {
          member_id: id.toString(),
          name,
          organization_name,
          email_address: email,
          phone_number,
          ...data,
        };
        if (postData) {
          const resp = await AddDonationRegister(postData);

          if (resp.data.success) {
            toast.success("Donation Registration Completed", toastOptions);
            reset();
          } else {
            toast.info("Donation Already Registration", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1200,
            });
          }
        } else {
          toast.info("User not found!", toastOptions);
        }
      } else {
        navigate("/singin");
      }
    }
  };

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
    reset();
  };

  return (
    <div className="container">
      <div className="ak-height-100 ak-height-lg-60"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
        className="row g-3"
      >
        <div className="col-12">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              name="donationType"
              id="memberRadio"
              checked={!isChecked}
              onChange={handleCheckboxClick}
            />
            <label className="form-check-label" htmlFor="memberRadio">
              Donate as a member
            </label>
          </div>
          {/*  <div className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              name="donationType"
              id="guestRadio"
              checked={isChecked}
              onChange={handleCheckboxClick}
            />
            <label className="form-check-label" htmlFor="guestRadio">
              Donate as a guest
            </label>
          </div> */}
        </div>

        {isChecked && (
          <>
            <div className="col-12">
              <label htmlFor="inputName" className="form-label">
                Name*
              </label>
              <input
                type="text"
                className="text-input-filed type_2"
                id="inputName"
                name="name"
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-danger">Name is required.</p>}
            </div>
            <div className="col-12">
              <label htmlFor="inputOrganization" className="form-label">
                Organization Name*
              </label>
              <input
                type="text"
                className="text-input-filed type_2"
                id="inputOrganization"
                {...register("organization_name", { required: true })}
              />
              {errors.organization_name && (
                <p className="text-danger">Organization Name is required.</p>
              )}
            </div>
            <div className="col-12">
              <label htmlFor="inputEmail" className="form-label">
                Email Address*
              </label>
              <input
                type="email"
                className="text-input-filed type_2"
                id="inputEmail"
                {...register("email_address", { required: true })}
              />
              {errors.email_address && (
                <p className="text-danger">Email Address is required.</p>
              )}
            </div>
            <div className="col-12">
              <label htmlFor="inputPhone" className="form-label">
                Phone Number*
              </label>
              <input
                type="tel"
                className="text-input-filed type_2"
                id="inputPhone"
                {...register("phone_number", { required: true })}
              />
              {errors.phone_number && (
                <p className="text-danger">Phone Number is required.</p>
              )}
            </div>
          </>
        )}
        <div className="col-12">
          <label htmlFor="inputAmount" className="form-label">
            Pay Amount*
          </label>
          <input
            type="number"
            className="text-input-filed type_2"
            id="inputAmount"
            {...register("pay_amount", { required: true })}
          />
          {errors.pay_amount && (
            <p className="text-danger">Pay Amount is required.</p>
          )}
        </div>
        <div className="col-12">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              name="paymentMethod"
              id="bkash"
              value="bkash"
              required
              {...register("payment_type", { required: true })}
            />
            <label className="form-check-label" htmlFor="bkash">
              Bkash Payment
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              name="paymentMethod"
              id="ssl_commerz"
              required
              value="ssl_commerz"
              {...register("payment_type", { required: true })}
            />
            <label className="form-check-label" htmlFor="ssl_commerz">
              SSLCommerz
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              name="paymentMethod"
              id="cash_payment"
              required
              value="cash_payment"
              {...register("payment_type", { required: true })}
            />
            <label className="form-check-label" htmlFor="cash_payment">
              Cash Payment
            </label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="termsCheckbox"
              required
            />
            <label className="form-check-label" htmlFor="termsCheckbox">
              I agree to the terms and conditions
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
