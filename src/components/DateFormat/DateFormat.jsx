import React from "react";
import { format } from "date-fns";

export default function DateFormat({ props, onlyDate, onlyYear }) {
  return (
    <>
      {format(
        new Date(props),
        onlyDate ? "dd MMMM, yyyy" : onlyYear ? "yyyy" : "dd MMMM, yyyy h:mm a"
      )}
    </>
  );
}
