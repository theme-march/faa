import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import close from "../assets/close-icon.svg";
import { usePaymentStatusQuery } from "../features/payment/sslPaymentApiIn";

export default function PaymentCancel() {
  const { tr_id } = useParams();

  const {
    data: paymentStatus,
    isLoading,
    isError,
  } = usePaymentStatusQuery(tr_id);



  return (
    <div className="container">
      <div className="payment">
        <div className="text-center">
          <img src={close} alt=".." className="payment-success" />
          <h2 className="payment-title">Payment Failed !</h2>
          <h4 className="text-danger">
            {` Problem In Progressing Payment`}
          </h4>
        </div>
        <Link className="gray-round-btn" to={"/"}>
          Go To Home
        </Link>
      </div>
    </div>
  );
}
