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
import {getCheckboxOptions} from '../../../lib/helperFunctions/helpers';

import {
  genders,
  pronouns,
  raceLabels,
  hearAboutUsOptions,
  blankProfile,
} from '../defaultData';

import get from 'lodash.get';

import {
  FormHeader,
  FormDropDownSelector,
  FormTextField,
  FormSubmitButton,
  FormCheckboxes,
} from './FormTemplates';

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
    handleProfileChange: event => {
      event.persist();
      update('profile')({
        ...values.profile,
        [event.target.name]: event.target.value,
      });
    },
    handleSubmit: (contactId, values) => {
      onSubmit(contactId, values);
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
        ...values.profile,
        address_primary: {
          ...values.profile.address_primary,
          [event.target.name]: event.target.value,
        },
      };
      update('profile')(newValue);
    },
    handleRacesChange: event => {
      event.persist();
      const newValue = {
        ...values.profile,
        race: {
          ...values.profile.race,
          [event.target.name]: event.target.checked,
        },
      };
      update('profile')(newValue);
    },

    handleRaceOther: event => {
      event.persist();
      const newValue = {
        ...values.profile,
        race: {
          ...values.profile.race,
          [event.target.name]: event.target.value,
        },
      };

      update('profile')(newValue);
    },
    handleGenderAndPronounChange: event => {
      event.persist();

      let newValue = {
        ...values.profile,
        [event.target.name]: event.target.value,
      };

      if (event.target.name === 'gender' && event.target.value !== 'Not Listed')
        newValue.gender_other = '';

      if (
        event.target.name === 'pronoun' &&
        event.target.value !== 'Not Listed'
      )
        newValue.pronoun_other = '';

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
      handleProfileChange,
      handleSubmit,
      handlePhoneChange,
      handleEmailChange,
      handleAddress,
      handleRacesChange,
      handleRaceOther,
      handleGenderAndPronounChange,
    },
  ] = useForm(contact, onSubmit);
  const [errors, setErrors] = useState({});

  const submit = () => {
    values.email = values.email_primary.email;
    const {isError, err} = contactInfoValidator(values);

    setErrors(err);

    if (!isError) {
      handleSubmit(contact.id, values);
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

  const descriptions = [
    ' The information below helps us build a better picture of our applicants. As an organization committed to equity, it is important for us to understand the variety of identities and affinities that are represented within our pool so that we can engage in a thoughtful process. That being said, we understand that this information is sensitive and providing it is completely optional.',
  ];

  const profile = get(contact, 'profile', blankProfile);

  const raceOptions = getCheckboxOptions(raceLabels, profile.race, 'race');

  // Can we move this function to formTemplates?
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
            <FormTextField
              isLabelInside={true}
              value={values.first_name}
              name="first_name"
              label="First Name"
              onChange={handleChange}
              error={errors.firstName_error}
            />
            <FormTextField
              isLabelInside={true}
              value={values.first_name}
              name="last_name"
              label="Last Name"
              onChange={handleChange}
              error={errors.lastName_error}
            />

            <FormTextField
              isLabelInside={true}
              value={values.email_primary.email}
              name="email"
              label="Email"
              onChange={handleEmailChange}
              error={errors.email_error}
            />
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
              <FormTextField
                isLabelInside={true}
                value={values.profile.address_primary.street1}
                name="street1"
                label="Address 1"
                onChange={handleAddress}
                error={errors.street1_error}
              />
              <FormTextField
                isLabelInside={true}
                value={values.profile.address_primary.street2}
                name="street2"
                label="Address 2"
                onChange={handleAddress}
                error={errors.street1_error}
              />
            </Grid>

            <Grid container align="center" justify="space-between">
              <FormTextField
                isLabelInside={true}
                value={values.profile.address_primary.city}
                name="city"
                label="City"
                onChange={handleAddress}
                error={errors.city_error}
              />
              {createDropdownSelector(
                'state',
                'State *',
                values.profile.address_primary.state,
                states,
                handleAddress,
                errors.state_error
              )}

              <Grid container align="center" justify="space-between">
                <FormTextField
                  isLabelInside={true}
                  value={values.profile.address_primary.zip_code}
                  name="zip_code"
                  label="Zip Code"
                  onChange={handleAddress}
                  error={errors.zipCode_error}
                />

                {createDropdownSelector(
                  'country',
                  'Country *',
                  values.profile.address_primary.country,
                  countryList,
                  handleAddress,
                  errors.country_error
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
        <Grid item xs={12} className={classes.demographicForm}>
          <FormHeader
            header="Demographic Information"
            descriptions={descriptions}
          />

          <Grid item xs={12} align="flex-start">
            <form noValidate autoComplete="off">
              <div>
                <FormCheckboxes
                  question="Race (select all that apply)"
                  options={raceOptions}
                  onChange={handleRacesChange}
                />
                {values.profile.race.not_listed && (
                  <div className={classes.otherRace}>
                    <FormTextField
                      value={values.profile.race.race_other}
                      name="race_other"
                      label="We understand that the options listed above are not exhaustive. If your identity is not listed above, please let us know how you identify:"
                      onChange={handleRaceOther}
                    />
                  </div>
                )}
              </div>

              <div className={classes.genderAndPronounsContainer}>
                <div className={classes.dropdownAndTextFieldContainer}>
                  <FormDropDownSelector
                    question="Gender"
                    name="gender"
                    value={values.profile.gender}
                    options={genders}
                    onChange={handleGenderAndPronounChange}
                  />

                  {values.profile.gender === 'Not Listed' && (
                    <FormTextField
                      value={values.profile.gender_other}
                      name="gender_other"
                      label=" We understand that the options provided above are limited. If your gender identity is not listed above, please let us know how you identify:"
                      onChange={handleGenderAndPronounChange}
                    />
                  )}
                </div>
                <div className={classes.dropdownAndTextFieldContainer}>
                  <FormDropDownSelector
                    question="Pronoun"
                    name="pronoun"
                    value={values.profile.pronoun}
                    options={pronouns}
                    onChange={handleGenderAndPronounChange}
                  />

                  {values.profile.pronoun === 'Not Listed' && (
                    <FormTextField
                      value={values.profile.pronoun_other}
                      name="pronoun_other"
                      label="We understand that the options listed above are not exhaustive. If you use a set of pronouns that aren't listed above, please let us know what they are:"
                      onChange={handleGenderAndPronounChange}
                    />
                  )}
                </div>
              </div>
              <div className={classes.hearAboutUsContainer}>
                <FormDropDownSelector
                  question="How do you find out about Baltimore Corps?"
                  name="hear_about_us"
                  value={values.profile.hear_about_us}
                  options={hearAboutUsOptions}
                  onChange={handleProfileChange}
                />

                <FormTextField
                  value={values.profile.hear_about_us_other}
                  name="hear_about_us_other"
                  label="Please provide more details about how you find out about us:"
                  onChange={handleProfileChange}
                  error={errors.hearAboutUsOther_error}
                />
              </div>

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
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

BasicInfoForm.propTypes = {
  contact: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  form: {
    padding: '8px 10px 8px 10px',
    backgroundColor: '#f7f7f7',
    [breakpoints.up('sm')]: {
      padding: '17px 30px 20px 30px',
    },
  },
  demographicForm: {
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
  genderAndPronounsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  dropdownAndTextFieldContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  otherRace: {
    marginLeft: '0px',

    [breakpoints.up('md')]: {
      marginLeft: '60px',
    },
  },
  hearAboutUsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default withStyles(styles)(BasicInfoForm);
