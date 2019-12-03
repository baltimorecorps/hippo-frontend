import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

import CloseIcon from '@material-ui/icons/Close';

import IconButton from '@material-ui/core/IconButton';

import MuiPhoneNumber from 'material-ui-phone-number';

import {newProfileValidator} from '../../lib/formValidator';
import useFormUpdate from 'lib/useFormUpdate';

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);

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
    const {isError, err} = newProfileValidator(values);

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

  return (
    <Grid item xs={12} md={10} className={classes.form}>
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
            <Grid item xs={12} align="end">
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
    padding: '7px 20px 20px 20px',
    backgroundColor: '#f7f7f7',
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
});

export default withStyles(styles)(BasicInfoForm);
