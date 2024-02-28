import React from "react";
import { useForm } from "react-hook-form";
import { useAddEventRegisterMutation } from "../../features/events/eventsApiInject";
import { toast } from "react-toastify";
import ErrorShow from "../UI/ErrorShow";
import HomeLoading from "../UI/HomeLoading";
import { useGetMemberDetailsIdQuery } from "../../features/member/memberApiIn";

export default function EventParticipateRegistrationForm(props) {
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const eventId = props?.props;
  const {
    data: loginUserData,
    isLoading,
    isSuccess,
    isError,
  } = useGetMemberDetailsIdQuery(loginUser?.id);

  const [AddEventRegister] = useAddEventRegisterMutation();
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

  const onSubmit = async (data) => {
    try {
      if (loginUser) {
        if (loginUserData.success) {
          const {
            id,
            name,
            organization_name,
            designation_name,
            email,
            phone_number,
          } = loginUserData?.result;

          const postData = {
            event_id: eventId,
            member_id: id,
            full_name: name,
            organization_name,
            designation_name,
            email,
            phone_number,
            address: "member user",
          };
          if (postData) {
            const response = await AddEventRegister(postData);
            if (response?.data?.success) {
              toast.success("Event Registration Completed", toastOptions);
              reset();
            } else {
              toast.info(response?.data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1200,
              });
            }
          }
        }
      }
      if (!loginUser) {
        const postData = { event_id: eventId, ...data, member_id: "" };
        if (postData) {
          const response = await AddEventRegister(postData);
          if (response?.data?.success) {
            toast.success("Event Registration Completed", toastOptions);
            reset();
          } else {
            toast.info(response?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1200,
            });
          }
        }
      }
    } catch (error) {
      toast.error("Error processing event registration", toastOptions);
    }
  };

  const renderForm = () => (
    <form
      className="row g-3"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="on"
      action="POST"
    >
      <div className="col-md-6" re={true}>
        <label htmlFor="inputName" className="form-label">
          {errors.full_name?.type === "required" ? (
            <p role="alert " className="text-danger">
              Name /ID/Batch*
            </p>
          ) : (
            "Name /ID/Batch*"
          )}
        </label>
        <input
          type="text"
          className="text-input-filed type_2"
          id="inputName"
          re
          {...register("full_name", { required: true })}
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
          className="text-input-filed type_2"
          id="inputEmail"
          {...register("email", { required: true })}
          aria-invalid={errors.email ? "true" : "false"}
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
          type="phone_number"
          {...register("phone_number", { required: true })}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="organizationName" className="form-label">
          {errors.organization_name &&
          errors.organization_name.type === "required" ? (
            <p role="alert " className="text-danger">
              Organization Name is required
            </p>
          ) : (
            "Organization Name*"
          )}
        </label>
        <input
          className="text-input-filed type_2"
          id="organizationName"
          type="text"
          {...register("organization_name")}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="distributor_name" className="form-label">
          {errors.distributor_name &&
          errors.distributor_name.type === "required" ? (
            <p role="alert " className="text-danger">
              Distributor Name is required
            </p>
          ) : (
            "Distributor Name*"
          )}
        </label>
        <input
          className="text-input-filed type_2"
          id="distributor_name"
          type="text"
          {...register("distributor_name")}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="address" className="form-label">
          {errors.address && errors.address.type === "required" ? (
            <p role="alert " className="text-danger">
              address Name is required
            </p>
          ) : (
            "address*"
          )}
        </label>
        <input
          className="text-input-filed type_2"
          id="address"
          type="text"
          {...register("address")}
        />
      </div>
      <div className="col-12 mt-5">
        <button type="submit" className="button-primary">
          Next To Pay
        </button>
      </div>
    </form>
  );

  if (!loginUser) {
    return renderForm();
  }

  if (loginUser) {
    if (isError) {
      return <ErrorShow message={"There was an error"} />;
    }
    if (isLoading) {
      return <HomeLoading />;
    }
    if (
      !isLoading &&
      !isError &&
      isSuccess &&
      loginUserData?.success === true &&
      loginUser
    ) {
      return (
        <div className="col-12 mt-5">
          <button
            type="submit"
            className="button-primary"
            onClick={handleSubmit(onSubmit)}
          >
            Next To Pay
          </button>
        </div>
      );
    }
  }
}
