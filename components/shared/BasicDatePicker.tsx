import React, { FC } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface IDatepickerProps {
  label: string;
  value?: string | undefined | Dayjs | null;
  onChange?: (date: any) => void;
  defaultValue?: string | number | Date | null | undefined | Dayjs;
}

const BasicDatePicker: FC<IDatepickerProps> = ({
  label,
  value = null,
  onChange = () => {},
  defaultValue = null,
}) => {
  /*  
  TODO:: @HD
console.log("hd", defaultValue ? dayjs(defaultValue) : null); */
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        defaultValue={dayjs("02-03-2015")}
        sx={{
          border: "1px solid #2D3748",
          "& input": { color: "white" },
          "& button": { color: "white" },
          "& label": { color: "white" },
        }}
      />
    </LocalizationProvider>
  );
};
export default BasicDatePicker;
