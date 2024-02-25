import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useGetMembersCategoryListQuery,
  useMemberRegisterMutation,
} from "../../features/member/memberApiIn";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const BatchSession = [
    "DUIBA001",
    "DUIBA002",
    "DUIBA003",
    "DUIBA004",
    "DUIBA005",
    "DUIBA006",
    "DUIBA007",
    "DUFIN 1990-1994",
    "DUFIN 1994-1998",
    "DUFIN 1998-2002",
    "DUFIN 2002-2006",
  ];

  const Occupations = [
    "None",
    "Service (Govt)",
    "Service (Private)",
    "Business",
    "Consultant",
    "Other",
  ];

  // const { data: membership_category_id } = useGetMembersCategoryListQuery();

  const membership_category_id = [
    {
      name: "Honorary Member For Life time (@Bulk amount)",
      value: 2,
    },
    {
      name: "Life time Member(@10k)",
      value: 3,
    },
    {
      name: "General Member(@1k)",
      value: 4,
    },
  ];

  const [memberRegister] = useMemberRegisterMutation();

  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
  };

  const onSubmit = async (data) => {
    let hsc_passing_year = data?.hsc_passing_year?.getFullYear().toString();
    const postData = {
      ...data,
      hsc_passing_year,
    };

    const formData = new FormData();
    Object.keys(postData).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      const resp = await memberRegister(formData);
      if (resp.data?.success) {
        toast.success("SignIn Successfully!", toastOptions);
        reset();
      } else {
        toast.info(resp?.data?.message || "An error occurred", toastOptions);
      }
    } catch (error) {
      toast.error("SignIn Data Not Submitted!", toastOptions);
    }

    // try {
    //   const resp = await memberRegister(postData);
    //   console.log(resp);
    //   if (resp.data.success === true) {
    //     toast.success("SingIn SuccessFully!", toastOptions);
    //
    //     reset();
    //   } else {
    //     if (resp?.data?.error?.name) {
    //       toast.info("SequelizeValidationError", toastOptions);
    //     } else {
    //       toast.info(resp?.data?.message, toastOptions);
    //     }
    //   }
    // } catch (error) {
    //   toast.error("SingIn DataNot Submit!", toastOptions);
    // }
  };

  return (
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
            "Name*"
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
          {errors.phone_number && errors.phone_number?.type === "required" ? (
            <p role="alert " className="text-danger">
              Phone Number is required
            </p>
          ) : (
            "Phone Number*"
          )}
        </label>
        <input
          className="text-input-filed type_2"
          id="inputNumber"
          type="number"
          {...register("phone_number", { required: true })}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputEmail" className="form-label">
          {errors.email?.type === "required" ? (
            <p role="alert " className="text-danger">
              Email Address is required
            </p>
          ) : (
            "Email*"
          )}
        </label>
        <input
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
          rules={{ required: "Date of Birth is required" }}
          render={({ field }) => (
            <>
              <label htmlFor="HSCPassingYear" className="form-label">
                {errors?.hsc_passing_year?.message ? (
                  <p role="alert " className="text-danger">
                    {errors?.hsc_passing_year?.message}
                  </p>
                ) : (
                  "HSC Passing Year*"
                )}
              </label>
              <div>
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy"
                  showYearPicker
                  // required
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
            "Select Batch number/ Session*"
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
              {BatchSession.map((batchNumber, i) => (
                <option value={batchNumber} key={i}>
                  {batchNumber}
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
            "Select Current Occupation*"
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
              {Occupations.map((occupation, i) => (
                <option value={occupation} key={i}>
                  {occupation}
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
            "Select Membership Category*"
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
              {membership_category_id?.map((member, i) => (
                <option value={member.value} key={i}>
                  {member.name}
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
            "Organization name"
          )}
        </label>
        <input
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
            "Designation name"
          )}
        </label>
        <input
          type="text"
          className="text-input-filed type_2"
          id="Designation"
          {...register("designation_name")}
        />
      </div>
      <div className="col-md-6">
        <label forhtml="MembershipImages" className="form-label">
          {errors._image?.type === "required" ? (
            <p role="alert " className="text-danger">
              Membership Images * is required
            </p>
          ) : (
            "Membership Images"
          )}
        </label>
        <input
          accept="image/*"
          className="text-input-filed type_2"
          id="MembershipImages"
          type="file"
          name="_image"
          onChange={(e) => {
            const selectedFiles = e.target.files;
            if (selectedFiles && selectedFiles.length > 0) {
              setValue("_image", selectedFiles[0]);
            }
          }}
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
                  "Password*"
                )}
              </label>
              <input
                id="Password"
                autoComplete="current-password"
                type="password"
                {...field}
                className="text-input-filed type_2"
              />
            </div>
          )}
        />
      </div>
      <div className="col-md-6 d-none">
        <label forhtml="membership_number" className="form-label">
          {errors.membership_number?.type === "required" ? (
            <p role="alert " className="text-danger">
              Membership number * is required
            </p>
          ) : (
            "Membership number"
          )}
        </label>
        <input
          type="text"
          disabled
          hidden
          value={"0"}
          className="text-input-filed type_2 "
          id="membership_number"
          {...register("membership_number")}
        />
      </div>
      <div className="col-12">
        <p className="mt-4">
          By creating an account, you agree to the Terms of Use and acknowledge
          our Privacy Policy.
        </p>
      </div>
      <div className="col-12">
        <button type="submit" className="button-primary">
          Apply
        </button>
      </div>
        
    </form>
  );
}
