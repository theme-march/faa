import React from "react";
import { useForm } from "react-hook-form";

export default function EventSponsorRegistrationForm() {
  const {
    register,
    handleSubmit,
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
          type="text"
          className="text-input-filed type_2"
          id="inputName"
          {...register("name", { required: true })}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="distributorName" className="form-label">
          {errors.distributorName?.type === "required" ? (
            <p role="alert " className="text-danger">
              Distributor Name is required
            </p>
          ) : (
            "Distributor Name*"
          )}
        </label>
        <input
          type="text"
          className="text-input-filed type_2"
          id="distributorName"
          {...register("distributorName", { required: true })}
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
        <label htmlFor="inputAddress" className="form-label">
          {errors.address?.type === "required" ? (
            <p role="alert " className="text-danger">
              Address is required
            </p>
          ) : (
            "Address*"
          )}
        </label>
        <input
          type="text"
          className="text-input-filed type_2"
          id="inputAddress"
          {...register("address", { required: true })}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="Amount" className="form-label">
          {errors.amount?.type === "required" ? (
            <p role="alert " className="text-danger">
              Approximately Amount is required
            </p>
          ) : (
            "Approximately Amount*"
          )}
        </label>
        <input
          type="number"
          className="text-input-filed type_2"
          id="Amount"
          {...register("amount", { required: true })}
        />
      </div>
      <div className="col-12 mt-5">
        <button type="submit" className="button-primary">
          Next To Pay
        </button>
      </div>
    </form>
  );
}
