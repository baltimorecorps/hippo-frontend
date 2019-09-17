import React from 'react';
import DateFns from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

const DatePickerForm = ({ start, label, value, onChange }) => {
  const id = `date-picker-${start ? 'start' : 'end'}`;
  const labelText = label || (start ? 'Start Date' : 'End Date');

  return (
    <MuiPickersUtilsProvider utils={DateFns}>
      <DatePicker
        variant="inline"
        views={['month', 'year']}
        label={labelText}
        format="MMMM-yyyy"
        value={value}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerForm;
