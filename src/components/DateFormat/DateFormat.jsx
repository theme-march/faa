import React from "react";
import { format } from "date-fns";

export default function DateFormat({ props }) {
  return <>{format(new Date(props), "dd MMMM, yyyy h:mm a")}</>;
}
