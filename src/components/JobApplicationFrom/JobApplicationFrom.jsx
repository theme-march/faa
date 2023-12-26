import React from "react";
import { useForm, Controller } from "react-hook-form";
export default function JobApplicationFrom() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <form
      className="row g-3"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="on"
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
        <label htmlFor="inputEmail" className="form-label">
          {errors.mail?.type === "required" ? (
            <p role="alert " className="text-danger">
              Email Address is required
            </p>
          ) : (
            "Email*"
          )}
        </label>
        <input
          type="email"
          className="text-input-filed type_2"
          id="inputEmail"
          {...register("mail", { required: true })}
          aria-invalid={errors.mail ? "true" : "false"}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputNumber" className="form-label">
          {errors.number && errors.number?.type === "required" ? (
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
          {...register("number", { required: true })}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="batchNumberId" className="form-label">
          {errors.batchNumber?.message ? (
            <p role="alert " className="text-danger">
              Select Batch number/ Session* is required
            </p>
          ) : (
            "Select Batch number/ Session*"
          )}
        </label>
        <Controller
          name="batchNumber"
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
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          )}
        />
      </div>
      <div className="col-12">
        <label htmlFor="Message" className="form-label">
          <p role="alert">Message</p>
        </label>
        <textarea
          type="massages"
          className="text-input-filed type_2"
          id="Message"
          rows={3}
          {...register("massages")}
        />
      </div>
      <div className="col-12">
        <div htmlFor="file" className="form-label">
          <p role="alert">Attach CV/Resume</p>
        </div>
        <input type="file" id="file" {...register("file")} />
      </div>
      <div className="col-12 mt-5">
        <button type="submit" className="button-primary">
          Next To Pay
        </button>
      </div>
    </form>
  );
}
