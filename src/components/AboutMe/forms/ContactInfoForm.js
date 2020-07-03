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

    console.log(err);
    console.log(errors);

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

  console.log(values);
  // todo
  // testing

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
            <Grid item xs={12} lg={6} align="center">
              <TextField
                required
                id="first_name"
                label="First Name"
                className={classes.formControl}
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
              />
              <FormHelperText className={classes.formHelperText}>
                {errors.firstName_error || null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} lg={6} align="center">
              <TextField
                required
                id="last_name"
                label="Last Name"
                className={classes.formControl}
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
              />
              <FormHelperText className={classes.formHelperText}>
                {errors.lastName_error || null}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} lg={6} align="center">
              <TextField
                required
                id="email"
                label="Primary Email"
                name="email"
                value={values.email_primary.email}
                onChange={handleEmailChange}
                className={classes.formControl}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
              />
              <FormHelperText className={classes.formHelperText}>
                {errors.email_error || null}
              </FormHelperText>
            </Grid>

            <Grid item xs={12} lg={6} align="center">
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
            <div className={classes.addressContainer}>
              <Grid item xs={12} md={6} align="center">
                <TextField
                  required
                  id="street1"
                  label="Address 1"
                  className={classes.formControl}
                  name="street1"
                  value={values.profile.address.street1 || ''}
                  onChange={handleAddress}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                />
                <FormHelperText className={classes.formHelperText}>
                  {errors.address_error || null}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} align="center">
                <TextField
                  required
                  id="street2"
                  label="Address 2"
                  className={classes.formControl}
                  name="street2"
                  value={values.profile.address.street2 || ''}
                  onChange={handleAddress}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                />
                <FormHelperText className={classes.formHelperText}>
                  {errors.address_error || null}
                </FormHelperText>
              </Grid>
            </div>

            <Grid
              item
              xs={12}
              align="center"
              className={classes.cityStateZipCodeStateContainer}
            >
              <div className={classes.addressContainer}>
                <Grid item xs={12} md={6} align="center">
                  <TextField
                    required
                    id="city"
                    label="City"
                    className={`${classes.formControl} ${classes.city}`}
                    name="city"
                    value={values.profile.address.city || ''}
                    onChange={handleAddress}
                    InputLabelProps={inputLabelProps}
                    InputProps={inputProps}
                  />
                  <FormHelperText className={classes.formHelperText}>
                    {errors.city_error || null}
                  </FormHelperText>
                </Grid>

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
                      value={values.profile.address.state || ''}
                      onChange={handleAddress}
                      inputProps={{
                        name: 'state',
                        id: 'state',
                        classes: {select: classes.dropdown},
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
              </div>

              <div className={classes.addressContainer}>
                <Grid item sm={12} md={6} align="center">
                  <TextField
                    required
                    id="zip_code"
                    label="Zip Code"
                    className={`${classes.formControl} ${classes.zipCode}`}
                    name="zip_code"
                    value={values.profile.address.zip_code || ''}
                    onChange={handleAddress}
                    InputLabelProps={inputLabelProps}
                    InputProps={inputProps}
                  />
                  <FormHelperText className={classes.formHelperText}>
                    {errors.zip_code_error || null}
                  </FormHelperText>
                </Grid>

                <Grid item sm={12} md={6} align="center">
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
                      value={values.profile.address.country || ''}
                      onChange={handleAddress}
                      inputProps={{
                        name: 'country',
                        id: 'country',
                        classes: {select: classes.dropdown},
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
              </div>
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
  addressContainer: {
    width: '100%',
    padding: spacing(0, 1),
    display: 'flex',
    flexDirection: 'column',

    [breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  cityStateZipCodeStateContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  cityAndStateContainer: {
    display: 'flex',
    width: '100%',

    padding: spacing(0, 1),
    [breakpoints.up('sm')]: {
      padding: 0,
    },
  },
  cityContainer: {
    padding: spacing(0, 1),
    [breakpoints.up('sm')]: {
      padding: 0,
    },
  },
  // city: {
  //   width: '100%',
  //   [breakpoints.up('sm')]: {
  //     width: '180px',
  //   },
  //   [breakpoints.up('md')]: {
  //     width: '250px',
  //   },
  // },

  dropdownContainer: {
    marginRight: '10px',
    // flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(0, 1),

    justifyContent: 'flex-start',
  },
  dropdown: {
    // display: 'flex',
    alignItems: 'flex-start',
    // fontSize: 16,
    width: '100%',
    textAlign: 'left',
  },
  dropdownInputLabel: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: '2px',
    width: '100%',
  },
  // zipCodeContainer: {
  //   flexGrow: 2,
  // },
  // zipCode: {
  //   [breakpoints.up('sm')]: {
  //     width: '100%',
  //   },
  // },
  // zipCodeAndCountryContainer: {
  //   display: 'flex',
  // },
});

export default withStyles(styles)(BasicInfoForm);
