import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MuiPhoneNumber from 'material-ui-phone-number';

import {contactInfoValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';

import {states, countryList} from '../defaultData';

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);

  if (values.email_primary.type == null) {
    const updatedEmail = {
      ...values.email_primary,
      type: 'Personal',
    };
    update('email_primary')(updatedEmail);
    update('emails')([updatedEmail]);
  }

  const handlers = {
    handleChange: event => {
      event.persist();
      update(event.target.name)(event.target.value);
    },
    handleSubmit: values => {
      onSubmit(values);
    },
    handlePhoneChange: value => {
      update('phone_primary')(value);
    },
    handleEmailChange: event => {
      const updatedEmail = {
        ...values.email_primary,
        email: event.target.value,
      };
      update('email_primary')(updatedEmail);
    },
    handleAddress: event => {
      event.persist();
      const newValue = {
        address: {
          ...values.profile.address,
          [event.target.name]: event.target.value,
        },
      };
      update('profile')(newValue);
    },
  };

  return [values, handlers];
};

const BasicInfoForm = ({contact, onSubmit, onCloseForm, classes}) => {
  const [
    values,
    {
      handleChange,
      handleSubmit,
      handlePhoneChange,
      handleEmailChange,
      handleAddress,
    },
  ] = useForm(contact, onSubmit);
  const [errors, setErrors] = useState({});

  const submit = () => {
    values.email = values.email_primary.email;
    const {isError, err} = contactInfoValidator(values);

    setErrors(err);

    if (!isError) {
      console.log('submitted form');
      // handleSubmit(values);
      onCloseForm();
    }
  };

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

  const createTextField = (name, label, classNames, value, onChange, error) => {
    return (
      <Grid item xs={12} md={6} align="center">
        <TextField
          required
          id={name}
          label={label}
          className={classNames}
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

  return (
    <Grid item xs={12} className={classes.form}>
      <Grid item xs={12} align="end">
        <IconButton
          edge="end"
          aria-label="cancel form"
          onMouseDown={onCloseForm}
          className={classes.iconButton}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <form noValidate autoComplete="off">
          <Grid container justify="space-between">
            {createTextField(
              'first_name',
              'First Name',
              classes.formControl,
              values.first_name,
              handleChange,
              errors.firstName_error
            )}

            {createTextField(
              'last_name',
              'Last Name',
              classes.formControl,
              values.last_name,
              handleChange,
              errors.lastName_error
            )}

            {createTextField(
              'email',
              'Email',
              classes.formControl,
              values.email_primary.email,
              handleEmailChange,
              errors.email_error
            )}

            <Grid item xs={12} md={6} align="center">
              <MuiPhoneNumber
                name="phone_primary"
                label="Primary Phone *"
                defaultCountry={'us'}
                value={values.phone_primary}
                onChange={handlePhoneChange}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
                inputClass={classes.formControl}
                disableAreaCodes={true}
              />
              <FormHelperText className={classes.formHelperText}>
                {errors.phonePrimary_error || null}
              </FormHelperText>
            </Grid>

            <Grid container align="center" justify="space-between">
              {createTextField(
                'street1',
                'Address 1',
                classes.formControl,
                values.profile.address.street1,
                handleAddress,
                errors.street1_error
              )}

              {createTextField(
                'street2',
                'Address 2',
                classes.formControl,
                values.profile.address.street2,
                handleAddress
              )}
            </Grid>

            {/* </div> */}

            <Grid container align="center" justify="space-between">
              {createTextField(
                'city',
                'City',
                classes.formControl,
                values.profile.address.city,
                handleAddress,
                errors.city_error
              )}

              <Grid item xs={12} md={6} align="center">
                <div className={classes.dropdownContainer}>
                  <InputLabel
                    htmlFor="state"
                    className={classes.dropdownInputLabel}
                  >
                    State *
                  </InputLabel>
                  <Select
                    disabled={false}
                    required
                    id="state"
                    className={classes.dropdown}
                    value={values.profile.address.state || ''}
                    onChange={handleAddress}
                    inputProps={{
                      name: 'state',
                      id: 'state',
                      'data-testid': 'state',
                    }}
                  >
                    {states.map(state => (
                      <MenuItem value={state} key={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText className={classes.formHelperText}>
                    {errors.state_error || null}
                  </FormHelperText>
                </div>
              </Grid>

              <Grid container align="center" justify="space-between">
                {createTextField(
                  'zip_code',
                  'Zip Code',
                  classes.formControl,
                  values.profile.address.zip_code,
                  handleAddress,
                  errors.zipCode_error
                )}

                <Grid item xs={12} md={6} align="center">
                  <div className={classes.dropdownContainer}>
                    <InputLabel
                      htmlFor="country"
                      className={classes.dropdownInputLabel}
                    >
                      Country *
                    </InputLabel>
                    <Select
                      disabled={false}
                      required
                      id="country"
                      className={classes.dropdown}
                      value={values.profile.address.country || ''}
                      onChange={handleAddress}
                      inputProps={{
                        name: 'country',
                        id: 'country',
                        'data-testid': 'country',
                      }}
                    >
                      {countryList.map(country => (
                        <MenuItem value={country} key={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText className={classes.formHelperText}>
                      {errors.country_error || null}
                    </FormHelperText>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} align="end" className={classes.submitButton}>
              <Button
                variant="contained"
                color="primary"
                onClick={submit}
                align="end"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

BasicInfoForm.propTypes = {
  contact: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email_primary: PropTypes.object.isRequired,
    phone_primary: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  form: {
    padding: '17px 30px 20px 30px',
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(2),
  },

  formControl: {
    width: '95%',

    marginTop: spacing(0),
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
    marginTop: '2px',
    width: '95%',
    marginBottom: spacing(1),
  },
  iconButton: {
    flexBasis: '60px',
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
  submitButton: {
    margin: '10px 20px 0px 0px',
  },

  dropdownContainer: {
    width: '95%',
  },
  dropdown: {
    width: '100%',
    textAlign: 'left',
  },
  dropdownInputLabel: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: '2px',
  },
});

export default withStyles(styles)(BasicInfoForm);
