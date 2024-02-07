import React from "react";
import DatePicker from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            {...field}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="yyyy-MM-dd"
          />
        )}
      />
    </div>
  );
};

export default DatePickerField;
