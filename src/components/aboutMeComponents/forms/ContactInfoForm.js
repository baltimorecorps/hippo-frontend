import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import FormHelperText from '@material-ui/core/FormHelperText';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MuiPhoneNumber from 'material-ui-phone-number';

import {contactInfoValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';

import {states, countryList} from '../../../lib/formHelpers/defaultData';
import {getCheckboxOptions} from '../../../lib/helperFunctions/helpers';

import {
  genders,
  pronouns,
  raceLabels,
  hearAboutUsOptions,
  blankProfile,
} from '../../../lib/formHelpers/defaultData';

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
      if (event.target.name === 'not_listed' && event.target.checked === false)
        newValue.race.race_other = '';
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
      handleAddress,
      handleRacesChange,
      handleRaceOther,
      handleGenderAndPronounChange,
    },
  ] = useForm(contact, onSubmit);
  const [errors, setErrors] = useState({});

  const submit = () => {
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

  const phoneInputProps = {
    classes: {input: classes.resize},
    autoComplete: 'off',
    'data-testid': 'phone_primary',
    name: 'phone_primary',
  };

  const descriptions = [
    ' The information below helps us build a better picture of our applicants. As an organization committed to equity, it is important for us to understand the variety of identities and affinities that are represented within our pool so that we can engage in a thoughtful process. That being said, we understand that this information is sensitive and providing it is completely optional.',
  ];

  const profile = get(values, 'profile', blankProfile);
  const raceOptions = getCheckboxOptions(raceLabels, profile.race, 'race');

  return (
    <Grid item xs={12} className={classes.form} data-testid="contact_info_form">
      <Grid item xs={12} align="end">
        <IconButton
          edge="end"
          aria-label="cancel form"
          onClick={() => onCloseForm()}
          className={classes.iconButton}
          data-testid="close_form_button"
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <form noValidate autoComplete="off">
          <Grid container justify="space-between">
            <FormTextField
              isRequired={true}
              isLabelInside={true}
              value={values.first_name}
              name="first_name"
              label="First Name"
              onChange={handleChange}
              error={errors.firstName_error}
            />
            <FormTextField
              isRequired={true}
              isLabelInside={true}
              value={values.last_name}
              name="last_name"
              label="Last Name"
              onChange={handleChange}
              error={errors.lastName_error}
            />

            <FormTextField
              isRequired={true}
              isLabelInside={true}
              value={values.email}
              name="email"
              label="Email"
              onChange={handleChange}
              error={errors.email_error}
            />
            <Grid item xs={12} md={6} align="center">
              <MuiPhoneNumber
                label="Primary Phone *"
                defaultCountry={'us'}
                value={values.phone_primary}
                onChange={handlePhoneChange}
                InputLabelProps={inputLabelProps}
                inputProps={phoneInputProps}
                inputClass={classes.formControl}
                disableAreaCodes={true}
              />
              <FormHelperText className={classes.formHelperText}>
                {errors.phonePrimary_error || null}
              </FormHelperText>
            </Grid>

            <Grid container align="center" justify="space-between">
              <FormTextField
                isRequired={true}
                isLabelInside={true}
                value={values.profile.address_primary.street1}
                name="street1"
                label="Address 1"
                onChange={handleAddress}
                error={errors.street1_error}
              />
              <FormTextField
                isRequired={false}
                isLabelInside={true}
                value={values.profile.address_primary.street2}
                name="street2"
                label="Address 2"
                onChange={handleAddress}
                error={errors.street2_error}
              />
            </Grid>

            <Grid container align="center" justify="space-between">
              <FormTextField
                isRequired={true}
                isLabelInside={true}
                value={values.profile.address_primary.city}
                name="city"
                label="City"
                onChange={handleAddress}
                error={errors.city_error}
              />

              <FormDropDownSelector
                isLabelInside={true}
                question="State *"
                value={values.profile.address_primary.state}
                name="state"
                options={states}
                onChange={handleAddress}
                error={errors.state_error}
              />

              <Grid container align="center" justify="space-between">
                <FormTextField
                  isRequired={true}
                  isLabelInside={true}
                  value={values.profile.address_primary.zip_code}
                  name="zip_code"
                  label="Zip Code"
                  onChange={handleAddress}
                  error={errors.zipCode_error}
                />

                <FormDropDownSelector
                  isLabelInside={true}
                  question="Country *"
                  value={values.profile.address_primary.country}
                  name="country"
                  options={countryList}
                  onChange={handleAddress}
                  error={errors.country_error}
                />
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
                {values.profile.race.not_listed ? (
                  <div className={classes.otherRace}>
                    <FormTextField
                      isRequired={true}
                      value={values.profile.race.race_other}
                      name="race_other"
                      label="We understand that the options listed above are not exhaustive. If your identity is not listed above, please let us know how you identify:"
                      onChange={handleRaceOther}
                      error={errors.raceOther_error}
                    />
                  </div>
                ) : (
                  <div style={{marginBottom: '15px'}}></div>
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

                  {values.profile.gender === 'Not Listed' ? (
                    <FormTextField
                      isRequired={true}
                      value={values.profile.gender_other}
                      name="gender_other"
                      label=" We understand that the options provided above are limited. If your gender identity is not listed above, please let us know how you identify:"
                      onChange={handleGenderAndPronounChange}
                      error={errors.genderOther_error}
                    />
                  ) : (
                    <div style={{marginBottom: '15px'}}></div>
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

                  {values.profile.pronoun === 'Not Listed' ? (
                    <FormTextField
                      isRequired={false}
                      value={values.profile.pronoun_other}
                      name="pronoun_other"
                      label="We understand that the options listed above are not exhaustive. If you use a set of pronouns that aren't listed above, please let us know what they are:"
                      onChange={handleGenderAndPronounChange}
                      error={errors.pronounOther_error}
                    />
                  ) : (
                    <div style={{marginBottom: '15px'}}></div>
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
                  isRequired={false}
                  value={values.profile.hear_about_us_other}
                  name="hear_about_us_other"
                  label="Please provide more details about how you find out about us:"
                  onChange={handleProfileChange}
                  error={
                    values.profile.hear_about_us === 'Other'
                      ? errors.hearAboutUsOther_error
                      : null
                  }
                />
              </div>
              <FormSubmitButton onSubmit={submit} />
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
