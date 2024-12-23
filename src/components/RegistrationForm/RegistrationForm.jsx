import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  useGetMembersCategoryListQuery,
  useGetMembersOccupationListQuery,
  useGetMembersSessionListQuery,
  useMemberRegisterMutation,
} from "../../features/member/memberApiIn";
import ImageUploadComponent from "../ImageUploadComponent/ImageCompression";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import batchPdf from "../../assets/Batchnumber.pdf";

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [userId, setUserId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { data: BatchSession } = useGetMembersSessionListQuery();

  const { data: Occupations } = useGetMembersOccupationListQuery();

  const { data: membership_category_id } = useGetMembersCategoryListQuery();

  const [memberRegister] = useMemberRegisterMutation();

  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
  };

  const onSubmit = async (data) => {
    let hsc_passing_year = data?.hsc_passing_year;

    const postData = {
      ...data,
      membership_number: "0",
      hsc_passing_year,
    };

    const formData = new FormData();
    Object.keys(postData).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      const resp = await memberRegister(formData);
      setIsModalOpen(true);

      if (resp.data?.success) {
        setUserId(resp?.data?.result?.id);
        reset();
      } else {
        setUserId(null);
      }
    } catch (error) {
      toast.error("Sign In Data Not Submitted!", toastOptions);
    }
  };

  return (
    <>
      <form
        className="row g-3"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
        method="POST"
        encType="multipart/form-data"
      >
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">
            {errors.name?.type === "required" ? (
              <p role="alert " className="text-danger">
                Name is required
              </p>
            ) : (
              <p>
                Name <span className="text-danger">*</span>
              </p>
            )}
          </label>
          <input
            type="name"
            name="name"
            className="text-input-filed type_2"
            id="inputName"
            {...register("name", { required: true })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputNumber" className="form-label">
            {errors?.phone_number?.message ? (
              <p role="alert " className="text-danger">
                Phone Number is required
              </p>
            ) : (
              <p>
                Phone Number With country code{" "}
                <span className="text-danger">*</span>
              </p>
            )}
          </label>
          <Controller
            name="phone_number"
            control={control}
            rules={{ required: "Please select country code" }}
            defaultValue=""
            render={({ field }) => (
              <PhoneInput
                {...field}
                country={"bd"}
                placeholder="Enter Phone Number"
                inputClass="form-select text-input-filed type_2"
              />
            )}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail" className="form-label">
            {errors.email?.type === "required" ? (
              <p role="alert " className="text-danger">
                Email Address is required
              </p>
            ) : (
              <p>
                Email <span className="text-danger">*</span>
              </p>
            )}
          </label>
          <input
            name="email"
            type="email"
            autoComplete="current-email"
            className="text-input-filed type_2"
            id="inputEmail"
            {...register("email", { required: true })}
            aria-invalid={errors.mail ? "true" : "false"}
          />
        </div>
        <div className="col-md-6">
          <Controller
            control={control}
            name="hsc_passing_year"
            rules={{ required: "HSC / Equivalent Passing Year " }}
            render={({ field }) => (
              <>
                <label htmlFor="HSCPassingYear" className="form-label">
                  {errors?.hsc_passing_year?.message ? (
                    <p role="alert " className="text-danger">
                      {errors?.hsc_passing_year?.message}
                    </p>
                  ) : (
                    "HSC / Equivalent Passing Year"
                  )}
                </label>
                <div>
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy"
                    showYearPicker
                    className="text-input-filed type_2"
                  />
                </div>
              </>
            )}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="batchNumberId" className="form-label">
            {errors.session?.message ? (
              <p role="alert " className="text-danger">
                Select Batch number/ Session* is required
              </p>
            ) : (
              <p>
                Select Batch number/ Session{" "}
                <span className="text-danger">*</span>
                <Link
                  to={batchPdf}
                  className="text-danger d-inline me-3"
                  target="_blank"
                >
                  Click{" "}
                  <span className="text-decoration-underline text-primary">
                    here
                  </span>{" "}
                  to know your Batch Number
                </Link>
              </p>
            )}
          </label>
          <Controller
            name="session"
            control={control}
            defaultValue=""
            rules={{ required: "Please select an option" }}
            render={({ field }) => (
              <select
                {...field}
                id="batchNumberId"
                className="form-select text-input-filed type_2"
              >
                <option value="" disabled hidden>
                  Select an option
                </option>
                {BatchSession?.result?.map((batchNumber, i) => (
                  <option value={batchNumber.batch_session_name} key={i}>
                    {batchNumber.batch_session_name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
        <div className="col-md-6">
          <label forhtml="occupationId" className="form-label">
            {errors.occupation?.message ? (
              <p role="alert " className="text-danger">
                Select Current Occupation* is required
              </p>
            ) : (
              <p>
                Select Current Occupation <span className="text-danger">*</span>
              </p>
            )}
          </label>
          <Controller
            name="occupation"
            control={control}
            defaultValue=""
            rules={{ required: "Please select an option" }}
            render={({ field }) => (
              <select
                {...field}
                id="occupationId"
                className="form-select text-input-filed type_2"
              >
                <option value="" disabled hidden>
                  Select an option
                </option>
                {Occupations?.result?.map((occupation, i) => (
                  <option value={occupation.occupation_name} key={i}>
                    {occupation.occupation_name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
        <div className="col-md-6">
          <label forhtml="membershipId" className="form-label">
            {errors.membership_type?.message ? (
              <p role="alert " className="text-danger">
                Select Membership Category* is required
              </p>
            ) : (
              <p>
                Select Membership Category<span className="text-danger">*</span>
              </p>
            )}
          </label>
          <Controller
            name="membership_category_id"
            control={control}
            defaultValue=""
            rules={{ required: "Please select an option" }}
            render={({ field }) => (
              <select
                {...field}
                id="membershipId"
                className="form-select text-input-filed type_2"
              >
                <option value="" disabled hidden>
                  Select an option
                </option>
                {membership_category_id?.result?.map((member, i) => (
                  <option value={member.id} key={i}>
                    {member.category_name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
        <div className="col-md-6">
          <label forhtml="Organization" className="form-label">
            {errors.organization_name?.type === "required" ? (
              <p role="alert " className="text-danger">
                Organization name* is required
              </p>
            ) : (
              <p>
                Organization name<span className="text-danger">*</span>
              </p>
            )}
          </label>
          <input
            name="organization_name"
            type="text"
            className="text-input-filed type_2"
            id="Organization"
            {...register("organization_name")}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="Designation" className="form-label">
            {errors.designation_name?.type === "required" ? (
              <p role="alert " className="text-danger">
                Designation name* is required
              </p>
            ) : (
              <p>
                Designation name<span className="text-danger">*</span>
              </p>
            )}
          </label>
          <input
            name="designation_name"
            type="text"
            className="text-input-filed type_2"
            id="Designation"
            {...register("designation_name")}
          />
        </div>
        <div className="col-md-6">
          <ImageUploadComponent
            errors={errors}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
          />
        </div>
        <div className="col-md-6">
          <Controller
            name="password" // The name of your form field
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            render={({ field }) => (
              <div>
                <label htmlFor="Password" className="form-label">
                  {errors.password?.message ? (
                    <p role="alert " className="text-danger">
                      {errors.password.message}
                    </p>
                  ) : (
                    <p>
                      Password <span className="text-danger">*</span>
                    </p>
                  )}
                </label>
                <div className="input-group flex-nowrap">
                  <input
                    id="Password"
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    className="text-input-filed type_2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-outline-secondary"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            )}
          />
        </div>
        <div className="col-md-6">
          <label forhtml="member_address" className="form-label">
            {errors.address?.type === "required" ? (
              <p role="alert " className="text-danger">
                Address is required
              </p>
            ) : (
              "Your Address"
            )}
          </label>
          <input
            type="text"
            name="address"
            className="text-input-filed type_2 "
            id="member_address"
            {...register("address")}
          />
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
        <div className="col-12">
          <button type="submit" className="button-primary">
            Apply
          </button>
        </div>
      </form>

      {/* Modal */}
      <Modal
        show={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onHide={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="m-0 p-0"
        centered
      >
        <Modal.Header closeButton>
          {userId && isModalOpen ? (
            <Modal.Title>Membership Apply Successfully!</Modal.Title>
          ) : (
            <Modal.Title>Membership Email Already Registered!</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <div>
            {userId && isModalOpen ? (
              <>
                <p>Membership Apply Successfully!. Please Pay Your fees</p>
                <Link
                  to={`/members-payment/${userId}`}
                  className="button-primary mt-4"
                >
                  Pay Your Fees
                </Link>
              </>
            ) : (
              <>
                <p>
                  Membership Email Already Registered!. Please Add Your New
                  Email Or Sign In
                </p>
                <Link to={`/singin`} className="button-primary mt-4">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-sm" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
