import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const DegreeDropdown = ({onChange, value, classes, name, label, errors}) => {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={name} className={classes.inputLabel}>
        {label}
      </InputLabel>
      <Select
        name="degree"
        id="degree"
        autoComplete="off"
        value={value}
        onChange={onChange}
        className={classes.resize}
      >
        {DegreeDropdown.options.map(({key, value}) => (
          <MenuItem key={key} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText className={classes.formHelperText}>
        {errors || null}
      </FormHelperText>
    </FormControl>
  );
};

DegreeDropdown.options = [
  {
    key: 'completed_classes',
    text: 'Completed Classes',
    value: 'Completed Classes',
  },
  {
    key: 'completed_training',
    text: 'Completed Training',
    value: 'Completed Training',
  },
  {key: 'certificate', text: 'Certificate', value: 'Certificate'},
  {key: 'ged', text: 'GED', value: 'GED'},

  {key: 'high_school', text: 'High School', value: 'High School'},
  {key: 'associates', text: 'Associates', value: 'Associates'},
  {key: 'undergraduate', text: 'Undergraduate', value: 'Undergraduate'},
  {key: 'masters', text: 'Masters', value: 'Masters'},
  {key: 'doctoral', text: 'Doctoral', value: 'Doctoral'},

  {key: 'other', text: 'Other', value: 'Other'},
];

DegreeDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errors: PropTypes.string,
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

export default withStyles(styles)(DegreeDropdown);
