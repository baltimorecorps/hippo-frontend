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

import {
  newProfileValidator,
  aboutMeValidator,
} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';

import {states} from '../defaultData';

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
  };

  return [values, handlers];
};

const BasicInfoForm = ({contact, onSubmit, onCloseForm, classes}) => {
  const [
    values,
    {handleChange, handleSubmit, handlePhoneChange, handleEmailChange},
  ] = useForm(contact, onSubmit);
  const [errors, setErrors] = useState({});

  const submit = () => {
    values.email = values.email_primary.email;
    // const {isError, err} = newProfileValidator(values);
    const {isError, err} = aboutMeValidator(values);
    console.log(err);
    if (isError) {
      setErrors(err);
    } else {
      handleSubmit(values);
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

  // todo
  // use MockData to test updating state with address fields
  // form validation
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
            <Grid item xs={12} align="center">
              <TextField
                required
                id="address"
                label="Address"
                className={classes.formControl}
                name="address"
                value={values.address || ''}
                onChange={handleChange}
                InputLabelProps={inputLabelProps}
                InputProps={inputProps}
              />
              <FormHelperText className={classes.formHelperText}>
                {errors.address_error || null}
              </FormHelperText>
            </Grid>
            <Grid
              item
              xs={12}
              // lg={6}
              align="center"
              className={classes.addressContainer}
            >
              <div className={classes.cityContainer}>
                <TextField
                  required
                  id="city"
                  label="City"
                  className={`${classes.formControl} ${classes.city}`}
                  name="city"
                  value={values.city || ''}
                  onChange={handleChange}
                  InputLabelProps={inputLabelProps}
                  InputProps={inputProps}
                />
                <FormHelperText className={classes.formHelperText}>
                  {errors.city_error || null}
                </FormHelperText>
              </div>
              <div className={classes.StateAndZipCodeContainer}>
                <div className={classes.stateContainer}>
                  <InputLabel
                    htmlFor="state"
                    className={classes.stateInputLabel}
                  >
                    State
                  </InputLabel>
                  <Select
                    disabled={false}
                    required
                    id="state"
                    value={values.state || ''}
                    onChange={handleChange}
                    inputProps={{
                      name: 'state',
                      id: 'state',
                      classes: {select: classes.state},
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
                <div className={classes.zipCodeContainer}>
                  <TextField
                    required
                    id="zip_code"
                    label="Zip Code"
                    className={`${classes.formControl} ${classes.zipCode}`}
                    name="zip_code"
                    value={values.zip_code || ''}
                    onChange={handleChange}
                    InputLabelProps={inputLabelProps}
                    InputProps={inputProps}
                  />
                  <FormHelperText className={classes.formHelperText}>
                    {errors.zip_code_error || null}
                  </FormHelperText>
                </div>
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
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.up('sm')]: {
      flexDirection: 'row',
      padding: spacing(0, 2),
    },
  },
  cityContainer: {
    padding: spacing(0, 1),
    [breakpoints.up('sm')]: {
      padding: 0,
    },
  },
  city: {
    width: '100%',
    [breakpoints.up('sm')]: {
      width: '180px',
    },
    [breakpoints.up('md')]: {
      width: '250px',
    },
  },
  StateAndZipCodeContainer: {
    display: 'flex',
    marginLeft: '10px',
    justifyContent: 'flex-start',
    [breakpoints.up('sm')]: {
      flexGrow: 1,
    },
  },
  stateContainer: {
    marginRight: '10px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'flex-start',
  },
  state: {
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: 16,

    width: '100px',
    [breakpoints.up('sm')]: {
      width: '80px',
    },
  },
  stateInputLabel: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: '2px',
  },
  zipCodeContainer: {
    flexGrow: 2,
  },
  zipCode: {
    [breakpoints.up('sm')]: {
      width: '100%',
    },
  },
});

export default withStyles(styles)(BasicInfoForm);
