import React from "react";
import { Link } from "react-router-dom";
import success from "../assets/payment-success.svg";
import close from "../assets/close-icon.svg";
import warning from "../assets/warning-icon.svg";

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
