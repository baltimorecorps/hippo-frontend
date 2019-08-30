import React from 'react';
import DateFns from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePicker = ({start, label, value, onChange}) => {
  const id = `date-picker-${start ? 'start' : 'end'}`;
  const labelText = (
    label || (start ? 'Start Date' : 'End Date')
  ) + ' (Month-Day-Year)';

  return (
    <MuiPickersUtilsProvider utils={DateFns}>
      <KeyboardDatePicker
        disableToolbar
        fullWidth
        variant="inline"
        format="MM-dd-yyyy"
        margin="normal"
        id={id}
        label={labelText}
        value={value}
        onChange={onChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
