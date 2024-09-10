/* import React from "react";
import { Link } from "react-router-dom";


export function PaymentSuccess() {
  return (
    <div className="container">
      <div className="payment">
        <div className="text-center">
          <img src={success} alt=".." className="payment-success" />
          <h2 className="payment-title">Thank you</h2>
          <h4 className="text-success">Payment SuccessFully</h4>
        </div>
        <Link className="gray-round-btn" to={"/"}>
          Go To Home
        </Link>
      </div>
    </div>
  );
}
export function PaymentError() {
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
export function PaymentCencle() {
  return (
    <div className="container">
      <div className="payment">
        <div className="text-center">
          <img src={close} alt=".." className="payment-success" />
          <h2 className="payment-title">Payment Failed !</h2>
          <h4 className="text-danger">Problem In Progressing Payment</h4>
        </div>
        <Link className="gray-round-btn" to={"/"}>
          Go To Home
        </Link>
      </div>
    </div>
  );
}
 */

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import close from "../assets/close-icon.svg";
import { usePaymentStatusQuery } from "../features/payment/sslPaymentApiIn";

export default function PaymentCancel() {
    const { tr_id } = useParams();
    const [isQueryEnabled, setIsQueryEnabled] = useState(false);

    useEffect(() => {
        // Enable the query only when tr_id is available
        console.log(tr_id)
        if (tr_id) {
            setIsQueryEnabled(true);
        }
    }, [tr_id]);

    const {
        data: paymentStatus,
        isLoading,
        isError,
    } = usePaymentStatusQuery(tr_id, {
        skip: !isQueryEnabled, // Skip query if tr_id is not ready
    });

    console.log(paymentStatus);

    return (
        <div className="container">
            <div className="payment">
                <div className="text-center">
                    <img src={close} alt=".." className="payment-success" />
                    <h2 className="payment-title">Payment Failed !</h2>
                    <h4 className="text-danger">
                        {`Problem in processing payment: ${paymentStatus ? paymentStatus.message : 'Unknown Error'}`}
                    </h4>
                </div>
                <Link className="gray-round-btn" to={"/"}>
                    Go To Home
                </Link>
            </div>
        </div>
    );
}

