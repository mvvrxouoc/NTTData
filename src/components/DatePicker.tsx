import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DatePickerInputProps {
  value: Date | null;
  onChange: (newValue: Date | null) => void;
  label: string;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({ value, onChange, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
            placeholder: label,
            className: "datepicker",
          },
        }}
      />
    </LocalizationProvider>
  );
};


