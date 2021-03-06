import React from 'react';
import DateFns from '@date-io/date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

import {monthFullNames, years, states} from '../../../lib/formHelpers/defaultData.js';

const SelectorForm = ({
  label,
  value,
  onChange,
  classes,
  type,
  name,
  helperText,
  disabled,
}) => {
  const id = `selector-${name}`;

  const getOptions = arr => {
    return arr.map(element => (
      <MenuItem value={element} key={element}>
        {element}
      </MenuItem>
    ));
  };

  let options = '';
  if (type === 'month') {
    options = getOptions(monthFullNames);
  } else if (type === 'year') {
    options = getOptions(years);
  } else if (type === 'states') {
    options = getOptions(states);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFns}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={name} className={classes.inputLabel}>
          {label}
        </InputLabel>
        <Select
          disabled={disabled}
          required
          id={id}
          value={value}
          onChange={onChange}
          inputProps={{
            name: name,
            id: name,
            classes: {select: classes.resize},
            'data-testid': name,
          }}
        >
          {options}
        </Select>
        <FormHelperText className={classes.formHelperText}>
          {helperText}
        </FormHelperText>
      </FormControl>
    </MuiPickersUtilsProvider>
  );
};

SelectorForm.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
};

const styles = ({breakpoints, palette, spacing}) => ({
  formControl: {
    width: '100%',
    marginBottom: spacing(0),
  },
  inputLabel: {
    fontSize: 17,
  },
  resize: {
    fontSize: 16,
  },
  labelRoot: {
    fontSize: 17,
  },
  labelFocused: {
    fontSize: 19,
  },
  formHelperText: {
    color: palette.error.main,
    marginTop: '4px',
  },
});

export default withStyles(styles)(SelectorForm);
