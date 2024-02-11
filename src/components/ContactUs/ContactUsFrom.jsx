import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ContactUsFrom() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
  };

  const onSubmit = (data) => {
    if (data) {
      toast.success("SignIn Successfully!", toastOptions);
      reset();
    } else {
      toast.info("User not found!", toastOptions);
    }
  };
  return (
    <form
      className="row g-3"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="on"
    >
      <div className="col-12">
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
          className="text-input-filed type_2"
          id="inputEmail"
          {...register("email", { required: true })}
          aria-invalid={errors.email ? "true" : "false"}
        />
      </div>
      <div className="col-12">
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
      <div className="col-12">
        <label htmlFor="Message" className="form-label">
          <p role="alert">Message</p>
        </label>
        <textarea
          type="text"
          className="text-input-filed type_2"
          id="Message"
          {...register("message")}
        />
      </div>
      <div className="col-12 mt-5">
        <button type="submit" className="button-primary">
          Send Message
        </button>
      </div>
    </form>
  );
}
