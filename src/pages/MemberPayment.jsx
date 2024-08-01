import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetMemberDetailsIdQuery } from "../features/member/memberApiIn";
import { useAddDonationRegisterMutation } from "../features/donation/donationApiInject";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

// Constants
const TOAST_OPTIONS = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 1000,
};

// Form Field Component
const FormField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  register,
  errors,
  required = true,
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
  /*   const loginUser = JSON.parse(localStorage.getItem("user"));
  console.log(loginUser); */
  const { id: userId } = useParams();

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
  } = useGetMemberDetailsIdQuery(userId);
  const [AddDonationRegister] = useAddDonationRegisterMutation();

  useEffect(() => {
    if (memberData?.success) {
      const { name, organization_name, email, phone_number, id } =
        memberData.result;

      setFormData({
        name,
        organization_name,
        email,
        phone_number,
        member_id: id,
      });
      setValue("name", name);
      setValue("organization_name", organization_name);
      setValue("email_address", email);
      setValue("phone_number", phone_number);
      setValue("member_id", id);
    }
  }, [memberData, setValue]);

  const onSubmit = async (data) => {
    try {
      const resp = await AddDonationRegister(data);
      if (resp.data.success) {
        toast.info("Payment completed", TOAST_OPTIONS);
        reset();
        navigate("/ssl/payment/register");
      } else {
        throw new Error("Payment not completed");
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
            register={register}
            errors={errors}
          />
          <RadioGroup
            options={[
              { label: "Bkash Payment", value: "bkash" },
              { label: "SSLCommerz", value: "ssl_commerz" },
              { label: "Visa", value: "visa" },
              { label: "Master-card", value: "mastercard" },
              { label: "American-express", value: "americanexpress" },
            ]}
            register={register}
            name="payment_type"
          />
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
        </div>
      </form>
      <div className="ak-height-100 ak-height-lg-60"></div>
    </div>
  );
}
