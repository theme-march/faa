import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import warning from "../assets/warning-icon.svg";
import { usePaymentStatusQuery } from "../features/payment/sslPaymentApiIn";

export default function PaymentFail() {
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
          <img src={warning} alt=".." className="payment-success" />
          <h2 className="payment-title">Payment Erorr |</h2>
          <h4 className="text-danger">This request could not be authorized</h4>
        </div>
        <Link className="gray-round-btn" to={"/"}>
          Go To Home
        </Link>
      </div>
    </div>
  );
}
