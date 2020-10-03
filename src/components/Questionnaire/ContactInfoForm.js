import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {states, countryList} from '../AboutMe/defaultData';

const ContactInfoForm = ({values, handleAddress, errors, classes}) => {
  const inputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
    shrink: true,
  };

  const inputProps = {
    classes: {input: classes.resize},
    autoComplete: 'off',
  };
  const createTextField = (name, label, value, onChange, error) => {
    return (
      <Grid item xs={12} md={6} align="center">
        <TextField
          required
          id={name}
          label={label}
          className={classes.formControl}
          name={name}
          value={value}
          onChange={onChange}
          InputLabelProps={inputLabelProps}
          InputProps={inputProps}
        />
        <FormHelperText className={classes.formHelperText}>
          {error || null}
        </FormHelperText>
      </Grid>
    );
  };
  const createDropdownSelector = (
    name,
    label,
    value,
    options,
    onChange,
    error
  ) => {
    return (
      <Grid item xs={12} md={6} align="center">
        <div className={classes.dropdownContainer}>
          <InputLabel htmlFor={name} className={classes.dropdownInputLabel}>
            {label}
          </InputLabel>
          <Select
            disabled={false}
            required
            id={name}
            className={classes.dropdown}
            value={value || ''}
            onChange={onChange}
            inputProps={{
              name: name,
              id: name,
              'data-testid': name,
            }}
          >
            {options.map(option => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText className={classes.formHelperText}>
            {error || null}
          </FormHelperText>
        </div>
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <Grid container align="center" justify="space-between">
        {createTextField(
          'street1',
          'Address 1',
          values.address.street1,
          handleAddress,
          errors.street1_error
        )}

        {createTextField(
          'street2',
          'Address 2',
          values.address.street2,
          handleAddress
        )}
      </Grid>
      <Grid container align="center" justify="space-between">
        {createTextField(
          'city',
          'City',
          values.address.city,
          handleAddress,
          errors.city_error
        )}

        {createDropdownSelector(
          'state',
          'State *',
          values.address.state,
          states,
          handleAddress,
          errors.state_error
        )}

        <Grid container align="center" justify="space-between">
          {createTextField(
            'zip_code',
            'Zip Code',
            values.address.zip_code,
            handleAddress,
            errors.zipCode_error
          )}

          {createDropdownSelector(
            'country',
            'Country *',
            values.address.country,
            countryList,
            handleAddress,
            errors.country_error
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

ContactInfoForm.propTypes = {};

const styles = ({breakpoints, palette, spacing}) => ({
  formControl: {
    width: '95%',

    marginTop: spacing(0),
  },

  resize: {
    fontSize: 16,
  },
  labelRoot: {
    fontSize: 20,
  },
  labelFocused: {
    fontSize: 19,
  },
  formHelperText: {
    color: palette.error.main,
    marginTop: '2px',
    width: '95%',
    marginBottom: spacing(1),
  },
  dropdownContainer: {
    width: '95%',
  },
  dropdown: {
    width: '100%',
    textAlign: 'left',
  },
  dropdownInputLabel: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: '2px',
  },
});

export default withStyles(styles)(ContactInfoForm);
