import React from "react";
import { useForm } from "react-hook-form";
import { useGetMemberDetailsIdQuery } from "../../features/member/memberApiIn";
import HomeLoading from "../UI/HomeLoading";
import ErrorShow from "../UI/ErrorShow";
import { useAddEventRegisterMutation } from "../../features/events/eventsApiInject";
import { toast } from "react-toastify";

export default function EventSponsorRegistrationForm({ props }) {
  let content = null;
  const loginUser = JSON.parse(localStorage.getItem("user"));

  const {
    data: loginUserData,
    isLoading,
    isSuccess,
    isError,
  } = useGetMemberDetailsIdQuery(loginUser?.id);
  const [AddEventRegister, { data }] = useAddEventRegisterMutation();

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
    const postData = {
      ...data,
      event_id: props.toString(),
    };
    try {
      const resp = await AddEventRegister(postData);

      if (resp.data.success) {
        toast.success("EventSponsor Registration Completed", toastOptions);
        reset();
      } else {
        toast.info("EventSponsor Already Registration", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1200,
        });
      }
    } catch (e) {
      toast.error("Error EventSponsor Registration ", toastOptions);
    }
  };
  if (isLoading) {
    content = <HomeLoading />;
  }

  if (!isLoading && isError) {
    content = <ErrorShow message={"There was a error"} />;
  }

  if (!isLoading && !isError && loginUserData?.success === false) {
    content = (
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
                Organization Name* is required
              </p>
            ) : (
              "Organization Name*"
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
            {errors.distributor_name?.type === "required" ? (
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
            {...register("distributor_name", { required: true })}
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
            type="number"
            {...register("phone_number", { required: true })}
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

  if (!isLoading && !isError && isSuccess && loginUserData?.success === true) {
    const { email, phone_number, organization_name, name, id } =
      loginUserData.result;
    content = (
      <form
        className="row g-3"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
        method="POST"
      >
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">
            {errors.full_name?.type === "required" ? (
              <p role="alert " className="text-danger">
                Name* is required
              </p>
            ) : (
              "Full Name*"
            )}
          </label>
          <input
            type="text"
            value={name}
            className="text-input-filed type_2"
            id="inputName"
            {...register("full_name", { required: true })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">
            {errors.organization_name?.type === "required" ? (
              <p role="alert " className="text-danger">
                Organization Name* is required
              </p>
            ) : (
              "Organization Name*"
            )}
          </label>
          <input
            type="text"
            value={organization_name}
            className="text-input-filed type_2"
            id="inputName"
            {...register("organization_name", { required: true })}
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
            value={email}
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
            type="number"
            value={phone_number}
            {...register("phone_number", { required: true })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="distributorName" className="form-label">
            {errors.distributor_name?.type === "required" ? (
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
            {...register("distributor_name", { required: true })}
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
        <div className="col-md-12">
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
        <input
          type="number"
          value={id}
          disabled
          hidden
          className="text-input-filed type_2 "
          {...register("member_id")}
        />

        <div className="col-12 mt-5">
          <button type="submit" className="button-primary">
            Next To Pay
          </button>
        </div>
      </form>
    );
  }

  return content;
}
