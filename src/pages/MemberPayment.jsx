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
      disabled={readOnly} // Use the readOnly prop here
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
  /*   const loginUser = JSON.parse(localStorage.getItem("user"));
  console.log(loginUser); */
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
    formState: { errors },
  } = useForm();

  const {
    data: memberData,
    isLoading,
    isError,
  } = useGetMemberDetailsIdQuery(userId);

  const { data: membership_category } = useGetMembersCategoryListQuery();

  const [memberPayment] = useMemberPaymentMutation();

  useEffect(() => {
    if (memberData?.success) {
      const {
        name,
        organization_name,
        email,
        phone_number,
        id,
        membership_category_id,
      } = memberData.result;

      const membership_category_p = membership_category.result.find(
        (category) => category.id == membership_category_id
      );

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
      setValue("pay_amount", membership_category_p.category_price);
    }
  }, [memberData, setValue, membership_category]);

  const onSubmit = async (data) => {
    try {
      const resp = await memberPayment(data);

      if (resp?.data?.success) {
        window.location.replace(resp?.data?.url);
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
            value={formData.pay_amount}
            register={register}
            errors={errors}
            readOnly={true}
            onChange={(e) =>
              setFormData({ ...formData, pay_amount: e.target.value })
            }
          />

          <RadioGroup
            options={[
              // { label: "Bkash Payment", value: "bkash" },
              { label: "SSLCommerz", value: "ssl_commerz" },
              // { label: "Visa", value: "visa" },
              // { label: "Master-card", value: "mastercard" },
              // { label: "American-express", value: "americanexpress" },
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
