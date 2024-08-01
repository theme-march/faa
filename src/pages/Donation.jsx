import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddDonationRegisterMutation } from "../features/donation/donationApiInject";
import { Link, useNavigate } from "react-router-dom";
import { useGetMemberDetailsIdQuery } from "../features/member/memberApiIn";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

export default function Donation() {
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    name: "",
    organization_name: "",
    email: "",
    phone_number: "",
    member_id: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const {
    data: memberData,
    isLoading,
    isError,
  } = useGetMemberDetailsIdQuery(loginUser?.id);

  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
  };

  const [AddDonationRegister] = useAddDonationRegisterMutation();

  useEffect(() => {
    if (memberData?.success) {
      setFormData({
        name: memberData.result.name,
        organization_name: memberData.result.organization_name,
        email: memberData.result.email,
        phone_number: memberData.result.phone_number,
        member_id: memberData.result.id,
      });

      // Set the values for react-hook-form
      setValue("name", memberData.result.name);
      setValue("organization_name", memberData.result.organization_name);
      setValue("email_address", memberData.result.email);
      setValue("phone_number", memberData.result.phone_number);
      setValue("member_id", memberData.result.id);
    }
  }, [memberData, setValue]);

  const onSubmit = async (data) => {
    if (data) {
      const resp = await AddDonationRegister(data);

      if (resp.data.success) {
        toast.success("Donation Registration Completed", toastOptions);
        reset();
        navigate("/ssl/register");
      } else {
        toast.info("Donation not sent!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1200,
        });
      }
    } else {
      toast.info("Donation data missing!", toastOptions);
    }
  };

  if (isLoading) {
    return <HomeLoading />;
  }

  if (!isLoading && isError) {
    return <ErrorShow message={"Item not found"} />;
  }

  if (!isLoading && !isError && memberData?.success === false) {
    return <ErrorShow message={"No data found"} />;
  }

  return (
    <div className="container">
      <div className="ak-height-100 ak-height-lg-60"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
        className="row g-3"
      >
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">
            Name*
          </label>
          <input
            type="text"
            className="text-input-filed type_2"
            id="inputName"
            name="name"
            value={formData.name}
            {...register("name", { required: true })}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-danger">Name is required.</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="inputOrganization" className="form-label">
            Organization Name*
          </label>
          <input
            type="text"
            className="text-input-filed type_2"
            id="inputOrganization"
            value={formData.organization_name}
            {...register("organization_name", { required: true })}
            onChange={(e) =>
              setFormData({ ...formData, organization_name: e.target.value })
            }
          />
          {errors.organization_name && (
            <p className="text-danger">Organization Name is required.</p>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail" className="form-label">
            Email Address*
          </label>
          <input
            type="email"
            className="text-input-filed type_2"
            id="inputEmail"
            value={formData.email}
            {...register("email_address", { required: true })}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email_address && (
            <p className="text-danger">Email Address is required.</p>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPhone" className="form-label">
            Phone Number*
          </label>
          <input
            type="tel"
            className="text-input-filed type_2"
            id="inputPhone"
            value={formData.phone_number}
            {...register("phone_number", { required: true })}
            onChange={(e) =>
              setFormData({ ...formData, phone_number: e.target.value })
            }
          />
          {errors.phone_number && (
            <p className="text-danger">Phone Number is required.</p>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="inputAmount" className="form-label">
            Payment Amount*
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
              id="visa"
              required
              value="visa"
              {...register("payment_type", { required: true })}
            />
            <label className="form-check-label" htmlFor="visa">
              Visa
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              name="paymentMethod"
              id="mastercard"
              required
              value="mastercard"
              {...register("payment_type", { required: true })}
            />
            <label className="form-check-label" htmlFor="mastercard">
              Master-card
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input custom-checkbox"
              type="radio"
              name="paymentMethod"
              id="americanexpress"
              required
              value="americanexpress"
              {...register("payment_type", { required: true })}
            />
            <label className="form-check-label" htmlFor="americanexpress">
              American-express
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
              I have read and agree the "
              <Link
                to="/terms-condition?id=termsconditions"
                className="ak-primary-color text-decoration-underline"
              >
                Terms & Condition
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
              <Link to={"https://faa-dubd.org"}>https://faa-dubd.org</Link>
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
