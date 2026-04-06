import React from "react";
import { format, isValid } from "date-fns";

export default function DateFormat({ props, onlyDate, onlyYear }) {
  const parsed = new Date(props);
  if (!props || !isValid(parsed)) {
    return <>-</>;
  }

  const formattedDate = format(
    parsed,
    onlyDate ? "dd MMMM, yyyy" : onlyYear ? "yyyy" : "dd MMMM, yyyy h:mm a"
  );

  return <>{formattedDate}</>;
}
