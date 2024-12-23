/* import React from "react";
import { format } from "date-fns";

export default function DateFormat({ props, onlyDate, onlyYear }) {
  if (props) {
    return (
      <>
        {format(
          new Date(props),
          onlyDate
            ? "dd MMMM, yyyy"
            : onlyYear
            ? "yyyy"
            : "dd MMMM, yyyy h:mm a"
        )}
      </>
    );
  } else {
    <p>NO Data Include In Here</p>;
  }
}
 */

import React from "react";
import { format, isValid, addHours } from "date-fns";

export default function DateFormat({ props, onlyDate, onlyYear }) {
  if (!props || !isValid(new Date(props))) {
    return <p>No Data Included Here</p>;
  }
  const dateValue = new Date(props); // Original UTC date
  const bangladeshTime = addHours(dateValue, 6); // Adjust UTC to UTC+6 for Bangladesh

  const formattedDate = format(
    bangladeshTime,
    onlyDate ? "dd MMMM, yyyy" : onlyYear ? "yyyy" : "dd MMMM, yyyy h:mm a"
  );

  return <>{formattedDate}</>;
}
