import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  useGetMemberDetailsIdQuery,
  useGetMembersCategoryListQuery,
  useGetMembersOccupationListQuery,
  useGetMembersSessionListQuery,
  useUpdateMemberInfoMutation,
} from "../features/member/memberApiIn";
import ErrorShow from "../components/UI/ErrorShow";
import { toast } from "react-toastify";
import batchPdf from "../assets/Batchnumber.pdf";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";
import demoImgMember from "../assets/member/member_1.jpg";

import ImageUploadComponent from "../components/ImageUploadComponent/ImageCompression";
import HomeLoading from "../components/UI/HomeLoading";

export default function MemberDetailsUpdate() {
  const { id } = useParams();

  const loginUser = JSON.parse(localStorage.getItem("user"));

  if (Number(loginUser?.id) !== Number(id))
    return (
      <>
        <ErrorPages />
      </>
    );

  const {
    data: singalMember,
    isLoading: isMemberLoading,
    isError: isMemberError,
    error: memberError,
  } = useGetMemberDetailsIdQuery(id);

  const {
    data: BatchSession,
    isLoading: isSessionLoading,
    isError: isSessionError,
    error: sessionError,
  } = useGetMembersSessionListQuery();

  const {
    data: Occupations,
    isLoading: isOccupationLoading,
    isError: isOccupationError,
    error: occupationError,
  } = useGetMembersOccupationListQuery();

  const {
    data: membership_category,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    error: categoryError,
  } = useGetMembersCategoryListQuery();

  const [updateMemberInfo, { isLoading: updateLoadingBtn }] =
    useUpdateMemberInfoMutation();

  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmitInfo = async (data) => {
    const postData = { ...data };
    const formData = new FormData();
    Object.keys(postData).forEach((key) => {
      formData.append(key, postData[key]);
    });

    console.log(data);

    try {
      const response = await updateMemberInfo(formData);
      if (response.data.success) {
        toast.success("Information updated successfully!", toastOptions);
      } else {
        toast.error(response.data.message || "Failed to update.", toastOptions);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", toastOptions);
    }
  };

  useEffect(() => {
    if (singalMember?.result) {
      const {
        address,
        email,
        name,
        occupation,
        organization_name,
        phone_number,
        session,
        hsc_passing_year,
        member_image,
        designation_name,
        membership_category_id,
        linkedin_link,
        facebook_link,
        twitter_link,
        blood_group,
        gender,
        date_of_birth,
      } = singalMember.result;

      let hsc_passing_year_only;
      if (hsc_passing_year instanceof Date) {
        hsc_passing_year_only = hsc_passing_year.getFullYear();
      } else if (
        typeof hsc_passing_year === "string" ||
        typeof hsc_passing_year === "number"
      ) {
        const date = new Date(hsc_passing_year);
        hsc_passing_year_only = !isNaN(date) ? date.getFullYear() : null;
      } else {
        hsc_passing_year_only = "";
      }

      setValue("id", id);
      setValue("name", name);
      setValue("address", address);
      setValue("email", email);
      setValue("phone_number", phone_number);
      setValue("occupation", occupation);
      setValue("organization_name", organization_name);
      setValue("designation_name", designation_name);
      setValue("membership_category_id", membership_category_id);
      setValue("session", session);
      setValue("hsc_passing_year", hsc_passing_year_only);
      setValue("linkedin_link", linkedin_link);
      setValue("facebook_link", facebook_link);
      setValue("twitter_link", twitter_link);
      setValue("blood_group", blood_group);
      setValue("gender", gender);
      setValue("date_of_birth", date_of_birth ? new Date(date_of_birth) : null);
    }
  }, [singalMember, id, setValue]);

  if (
    isMemberLoading ||
    isSessionLoading ||
    isOccupationLoading ||
    isCategoryLoading
  ) {
    return (
      <div>
        <HomeLoading />
        <div className="ak-height-80 ak-height-lg-30"></div>
      </div>
    );
  }

  if (
    isMemberError ||
    isSessionError ||
    isOccupationError ||
    isCategoryError ||
    !singalMember?.success
  ) {
    return (
      <ErrorShow
        message={
          memberError?.data?.message ||
          sessionError?.data?.message ||
          occupationError?.data?.message ||
          categoryError?.data?.message ||
          "An error occurred while fetching data."
        }
      />
    );
  }

  return (
    <div className="container">
      <div className="ak-height-80 ak-height-lg-30"></div>
      <div className="row">
        <div className="col-12">
          <div className="card-body">
            <div className="row d-flex align-items-center flex-column-reverse flex-md-column">
              <div className="col-md-3 mb-5">
                {singalMember?.result?.member_image ? (
                  <img
                    src={`/images/member/${singalMember?.result?.member_image}`}
                    className="col-6 col-md-12"
                    alt="member"
                  />
                ) : (
                  <img
                    src={demoImgMember}
                    className="col-6 col-md-12"
                    alt="memberDemo"
                  />
                )}
              </div>
              <h3 className="text-uppercase text-center col-md-6 ak-bold align-md-self-end mb-5 ak-font-42">
                Update Your Profile
              </h3>
            </div>
            <form
              onSubmit={handleSubmit(onSubmitInfo)}
              method="POST"
              encType="multipart/form-data"
              className="row g-4"
            >
              <div className="row g-4">
                <div className="col-md-12">
                  <h2 className="col-12">Change Your Member Information</h2>
                </div>

                <div className="col-md-6">
                  <ImageUploadComponent
                    errors={errors}
                    setValue={setValue}
                    clearErrors={clearErrors}
                    setError={setError}
                  />
                </div>

                {/* Existing fields */}
                {/* name */}
                <div className="col-md-6">
                  <label htmlFor="inputName" className="form-label">
                    {errors.name?.type === "required" ? (
                      <p role="alert " className="text-danger">
                        Name is required
                      </p>
                    ) : (
                      <p>Name</p>
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

                {/* email */}
                <div className="col-md-6">
                  <label htmlFor="inputEmail" className="form-label">
                    {errors.email?.type === "required" ? (
                      <p role="alert " className="text-danger">
                        Email Address is required
                      </p>
                    ) : (
                      <p>Email</p>
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

                {/* phone_number */}
                <div className="col-md-6">
                  <label htmlFor="inputNumber" className="form-label">
                    {errors?.phone_number?.message ? (
                      <p role="alert " className="text-danger">
                        Phone Number is required
                      </p>
                    ) : (
                      <p>Phone Number With country code</p>
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

                {/* hsc_passing_year */}
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

                {/* session / BatchNumber */}
                <div className="col-md-6">
                  <label htmlFor="batchNumberId" className="form-label">
                    {errors.session?.message ? (
                      <p role="alert " className="text-danger">
                        Select Batch number/ Session* is required
                      </p>
                    ) : (
                      <p>
                        Select Batch number/ Session
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
                          <option
                            value={batchNumber.batch_session_name}
                            key={i}
                          >
                            {batchNumber.batch_session_name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                {/* membership_type */}
                <div className="col-md-6">
                  <label forhtml="membershipId" className="form-label">
                    {errors.membership_type?.message ? (
                      <p role="alert " className="text-danger">
                        Select Membership Category* is required
                      </p>
                    ) : (
                      <p>Select Membership Category</p>
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
                        {membership_category?.result?.map((member, i) => (
                          <option value={member.id} key={i}>
                            {member.category_name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                {/* occupation */}
                <div className="col-md-6">
                  <label forhtml="occupationId" className="form-label">
                    {errors.occupation?.message ? (
                      <p role="alert " className="text-danger">
                        Select Current Occupation* is required
                      </p>
                    ) : (
                      <p>Select Current Occupation</p>
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

                {/* organization_name */}
                <div className="col-md-6">
                  <label forhtml="Organization" className="form-label">
                    {errors.organization_name?.type === "required" ? (
                      <p role="alert " className="text-danger">
                        Organization name* is required
                      </p>
                    ) : (
                      <p>Organization name</p>
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

                {/* designation_name */}
                <div className="col-md-6">
                  <label htmlFor="Designation" className="form-label">
                    {errors.designation_name?.type === "required" ? (
                      <p role="alert " className="text-danger">
                        Designation name* is required
                      </p>
                    ) : (
                      <p>Designation name</p>
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

                {/* member_address */}
                <div className="col-md-12">
                  <label forhtml="member_address" className="form-label">
                    {errors.address?.type === "required" ? (
                      <p role="alert " className="text-danger">
                        Address is required
                      </p>
                    ) : (
                      "Your Address"
                    )}
                  </label>
                  <textarea
                    type="text"
                    name="address"
                    className="text-input-filed type_2 "
                    id="member_address"
                    {...register("address")}
                    rows="3"
                  ></textarea>
                </div>
              </div>

              {/* New Fields Start Here */}
              <div className="row g-4">
                <div className="col-md-12">
                  <h2 className="col-12">
                    {(singalMember?.result?.blood_group &&
                      singalMember?.result?.linkedin_link &&
                      singalMember?.result?.facebook_link) !== ""
                      ? "Add"
                      : "Change"}{" "}
                    Your Personal Information
                  </h2>
                </div>

                {/* LinkedIn Link */}
                <div className="col-md-6">
                  <label htmlFor="linkedinLink" className="form-label">
                    LinkedIn Profile Link
                  </label>
                  <input
                    name="linkedin_link"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="text-input-filed type_2"
                    id="linkedinLink"
                    {...register("linkedin_link")}
                  />
                </div>

                {/* Facebook Link */}
                <div className="col-md-6">
                  <label htmlFor="facebookLink" className="form-label">
                    Facebook Profile Link
                  </label>
                  <input
                    name="facebook_link"
                    type="url"
                    placeholder="https://facebook.com/yourprofile"
                    className="text-input-filed type_2"
                    id="facebookLink"
                    {...register("facebook_link")}
                  />
                </div>

                {/* Twitter Link */}
                <div className="col-md-6">
                  <label htmlFor="twitterLink" className="form-label">
                    Twitter Profile Link
                  </label>
                  <input
                    name="twitter_link"
                    type="url"
                    placeholder="https://x.com/yourprofile"
                    className="text-input-filed type_2"
                    id="twitterLink"
                    {...register("twitter_link")}
                  />
                </div>

                {/* Blood Group */}
                <div className="col-md-6">
                  <label htmlFor="bloodGroup" className="form-label">
                    Blood Group
                  </label>
                  <Controller
                    name="blood_group"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select
                        {...field}
                        id="bloodGroup"
                        className="form-select text-input-filed type_2"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    )}
                  />
                </div>

                {/* Gender */}
                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select
                        {...field}
                        id="gender"
                        className="form-select text-input-filed type_2"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    )}
                  />
                </div>

                {/* Date of Birth */}
                <div className="col-md-6">
                  <CustomDatePicker
                    control={control}
                    name="date_of_birth"
                    label="Date of Birth"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-12">
                {updateLoadingBtn ? (
                  <button type="submit" disabled className="btn-success">
                    Updating...
                  </button>
                ) : (
                  <button type="submit" className="button-primary">
                    Update Information
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="ak-height-80 ak-height-lg-60"></div>
    </div>
  );
}

const CustomDatePicker = ({ control, name, label }) => {
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
  }) => (
    <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-2">
      <button
        type="button"
        onClick={decreaseMonth}
        className="btn btn-outline-secondary btn-sm"
      >
        ‹
      </button>

      <div className="d-flex align-items-center gap-2">
        <select
          value={date.getFullYear()}
          onChange={({ target: { value } }) => changeYear(value)}
          className="form-select form-select-sm text-input-filed type_2"
          style={{ width: "90px" }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={date.getMonth()}
          onChange={({ target: { value } }) => changeMonth(value)}
          className="form-select form-select-sm text-input-filed type_2"
          style={{ width: "110px" }}
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={increaseMonth}
        className="btn btn-outline-secondary btn-sm"
      >
        ›
      </button>
    </div>
  );

  return (
    <div className="col-12 mb-3">
      <label htmlFor={name} className="form-label fw-semibold mb-2">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            {...field}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="yyyy-MM-dd"
            renderCustomHeader={renderCustomHeader}
            aria-labelledby={name}
            showPopperArrow={false}
            placeholderText="Select a date"
            className="text-input-filed type_2"
          />
        )}
      />
    </div>
  );
};
