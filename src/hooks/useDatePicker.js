import { useState } from 'react';

const useDatePicker = (initialValue = null) => {
  const [date, setDate] = useState(initialValue);

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  return {
    date,
    handleDateChange,
  };
};

export default useDatePicker;
