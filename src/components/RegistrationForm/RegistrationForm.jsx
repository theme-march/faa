import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useMemberRegisterMutation } from "../../features/member/memberApiIn";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
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
  ];
  const [memberRegister] = useMemberRegisterMutation();

  const onSubmit = async (data) => {
    const resp = await memberRegister(data);
    console.log("Form submitted successfully:", resp);
    try {
      if (resp.data.success === true) {
        toast.success("SingIn SuccessFully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        reset();
      } else {
        toast.info("User Allready Register!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("SingIn DataNot Submit!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };
  return (
    <form
      className="row g-3"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="on"
      method="POST"
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

      <div className="col-12">
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
      <div className="col-12">
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
      <div className="col-12">
        <p className="mt-4">
          By creating an account, you agree to the Terms of Use and acknowledge
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
