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
  // Fetch Member Details
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

  // Fetch Occupation List
  const {
    data: Occupations,
    isLoading: isOccupationLoading,
    isError: isOccupationError,
    error: occupationError,
  } = useGetMembersOccupationListQuery();

  // Fetch Membership Categories
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
    const postData = {
      ...data,
    };
    const formData = new FormData();
    Object.keys(postData).forEach((key) => {
      formData.append(key, data[key]);
      console.log(data[key]);
    });

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
      } = singalMember.result;

      // Extract only the year

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

      // Pre-fill form values
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
    }
  }, [singalMember, id, setValue]);

  // Handle loading states
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

  // Handle API errors
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
              <h3 className="card-title text-center col-md-6 align-md-self-end mb-5">
                Update Member Information
              </h3>
            </div>
            <form
              onSubmit={handleSubmit(onSubmitInfo)}
              method="POST"
              encType="multipart/form-data"
              className="row g-4"
            >
              {/* ImageUploadComponent */}
              <div className="col-md-6">
                <ImageUploadComponent
                  errors={errors}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  setError={setError}
                />
              </div>

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
                        <option value={batchNumber.batch_session_name} key={i}>
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

              {updateLoadingBtn ? (
                <button type="submit" disabled className="btn-success">
                  Updating........
                </button>
              ) : (
                <button type="submit" className="button-primary">
                  Update Information
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="ak-height-80 ak-height-lg-30"></div>
    </div>
  );
}
