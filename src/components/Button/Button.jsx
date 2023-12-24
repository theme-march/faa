import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export function ButtonPrimary(props) {
  return (
    <Link to={props.to} className="button-primary">
      {props.children}
    </Link>
  );
}
export function ButtonWhite(props) {
  return (
    <Link to={props.to} className="button-white">
      {props.children}
    </Link>
  );
}
export function ButtonMore(props) {
  return (
    <Link to={props.to} className="button-more">
      {props.children}
    </Link>
  );
}
export function ButtonReadMoreArrowIcon(props) {
  return (
    <Link to={props.to} className="arrow-icon-anim">
      {props.children}
      <IoIosArrowForward />
    </Link>
  );
}
