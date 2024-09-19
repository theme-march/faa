import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import success from "../assets/payment-success.svg";
import { usePaymentStatusQuery } from "../features/payment/sslPaymentApiIn";

export default function PaymentSuccess() {
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
          <img src={success} alt=".." className="payment-success" />
          <h2 className="payment-title">Thank you</h2>
          <h4 className="text-success">Payment Successful</h4>
        </div>
        <Link className="gray-round-btn" to={"/"}>
          Go To Home
        </Link>
      </div>
    </div>
  );
}
