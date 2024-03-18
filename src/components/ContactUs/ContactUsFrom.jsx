import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddContactMutation } from "../../features/contact/contactApiIn";

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

  const [addContact] = useAddContactMutation();

  const onSubmit = async (data) => {
    try {
      const resp = await addContact(data);
      if (resp.data.success) {
        toast.success("Massages sent successfully", toastOptions);
        reset();
      } else {
        toast.info("Massages not sent", toastOptions);
      }
    } catch (error) {
      toast.error("Server Error problem", toastOptions);
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
          required
          name="name"
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
          required
          name="email"
          type="email"
          className="text-input-filed type_2"
          id="inputEmail"
          {...register("email", { required: true })}
          aria-invalid={errors.email ? "true" : "false"}
        />
      </div>
      <div className="col-12">
        <label htmlFor="inputNumber" className="form-label">
          {errors.text && errors.text?.type === "required" ? (
            <p role="alert " className="text-danger">
              Phone Number is required
            </p>
          ) : (
            "Phone Number*"
          )}
        </label>
        <input
          required
          name="phone_number"
          className="text-input-filed type_2"
          id="inputNumber"
          type="text"
          {...register("phone_number", { required: true })}
        />
      </div>
      <div className="col-12">
        <label htmlFor="Message" className="form-label">
          <p role="alert">Message</p>
        </label>
        <textarea
          required
          type="text"
          name="message"
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
