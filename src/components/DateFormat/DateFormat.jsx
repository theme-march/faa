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
import { format, isValid } from "date-fns";

export default function DateFormat({ props, onlyDate, onlyYear }) {
  if (!props || !isValid(new Date(props))) {
    return <p>No Data Included Here</p>;
  }

  const formattedDate = format(
    new Date(props),
    onlyDate ? "dd MMMM, yyyy" : onlyYear ? "yyyy" : "dd MMMM, yyyy h:mm a"
  );

  return <>{formattedDate}</>;
}
