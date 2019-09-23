import React from 'react';
import DateFns from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import withStyles from '@material-ui/core/styles/withStyles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { monthFullNames, years } from './staticData';

const DatePickerForm = ({ label, value, onChange, classes, type, name }) => {
  const id = `date-picker-${name}`;

  const getOptions = (arr) => {
    return arr.map((element) => (
      <MenuItem value={element} key={element}>
        {element}
      </MenuItem>
    ));
  };

  let options = '';
  if (type === 'month') {
    options = getOptions(monthFullNames);
  } else {
    options = getOptions(years);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFns}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={name} className={classes.inputLabel}>
          {label}
        </InputLabel>
        <Select
          id={id}
          value={value}
          onChange={onChange}
          inputProps={{
            name: name,
            id: name,
            classes: { select: classes.resize },
          }}
        >
          {options}
        </Select>
      </FormControl>
    </MuiPickersUtilsProvider>
  );
};

const styles = ({ breakpoints, palette, spacing }) => ({
  modal: {
    //width: 600,
    //margin: 'auto',
  },
  formControl: {
    width: '50%',
    marginBottom: spacing(2),
  },
  inputLabel: {
    fontSize: 17,
  },
  resize: {
    fontSize: 17,
  },
  labelRoot: {
    fontSize: 20,
  },
  labelFocused: {
    fontSize: 20,
  },
});

export default withStyles(styles)(DatePickerForm);
