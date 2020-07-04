import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import ContactInfoForm from '../AboutMe/forms/ContactInfoForm';
import DemographicForm from '../AboutMe/forms/DemographicForm';
import InterestsAndGoalsForm from '../AboutMe/forms/InterestsAndGoalsForm';
import ProgramsAndEligibilityForm from '../AboutMe/forms/ProgramsAndEligibilityForm';

import mockData from '../AboutMe/mockData';
import mockDataEmpty from '../AboutMe/mockDataEmpty';
import Logo from '../../lib/images/long.png';
import {contactInfoValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';

import {
  states,
  countryList,
  jobSearchStatus,
  yearsOfExperience,
  roleLabels,
  genders,
  pronouns,
  raceLabels,
} from '../AboutMe/defaultData';

import {
  FormHeader,
  FormRadioButtons,
  FormCheckboxes,
  FormSubmitButton,
  FormTextField,
  FormDropDownSelector,
} from '../AboutMe/forms/FormTemplates';

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

    handleAddress: event => {
      event.persist();
      const newValue = {
        ...values.address,
        [event.target.name]: event.target.value,
      };
      update('address')(newValue);
    },
    handleInterestedRolesChange: event => {
      event.persist();
      const newValue = {
        ...values.interested_roles,
        [event.target.name]: event.target.checked,
      };
      update('interested_roles')(newValue);
    },
    handleRacesChange: event => {
      event.persist();
      const newValue = {
        ...values.race,
        [event.target.name]: event.target.checked,
      };
      update('race')(newValue);
    },

    handleRaceOther: event => {
      event.persist();
      const newValue = {
        ...values.race,
        [event.target.name]: event.target.value,
      };

      update('race')(newValue);
    },
  };

  return [values, handlers];
};

const Questionnaire = ({
  // contact,
  onSubmit,
  onCloseAllForms,
  onClickEdit,
  classes,
}) => {
  //   const contact = mockData;
  const contact = mockDataEmpty;
  const [
    values,
    {
      handleChange,

      handleAddress,
      handleInterestedRolesChange,
      handleRacesChange,
      handleRaceOther,
    },
  ] = useForm(contact.profile, onSubmit);
  const [errors, setErrors] = useState({});

  const submit = () => {
    values.email = values.email_primary.email;
    const {isError, err} = contactInfoValidator(values);

    setErrors(err);

    if (!isError) {
      console.log('submitted form');
      // handleSubmit(values);
      //   onCloseForm();
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

  let roles = [];
  for (const [key, value] of Object.entries(values.interested_roles)) {
    roles.push({name: key, checked: value});
  }

  for (const [key, value] of Object.entries(roleLabels)) {
    roles.forEach((role, index) => {
      if (role.name === key) {
        roles[index] = {...role, label: value};
      }
    });
  }
  let race = [];
  for (const [key, value] of Object.entries(values.race)) {
    race.push({name: key, checked: value});
  }

  for (const [key, value] of Object.entries(raceLabels)) {
    race.forEach((role, index) => {
      if (role.name === key) {
        race[index] = {...role, label: value};
      }
    });
  }
  const raceOptions = race.slice(0, -1);

  return (
    <Paper className={classes.paper}>
      <div className={classes.headerContainer}>
        <img src={Logo} className={classes.logo} alt="Baltimore Corps Logo" />
        <Typography
          variant="body1"
          component="p"
          className={classes.formDescription}
        >
          The questions below help us understand which of our programs and
          services best align with your needs and goals at this point in your
          professional career. Once you submit this application, we'll review
          your responses and follow up with next steps in approximately 5-7
          business days. Thanks for your interest and time; we hope to have you
          as a part of our network.
        </Typography>
      </div>
      <Grid item xs={12} style={{marginTop: '15px', width: '100%'}}>
        <form noValidate autoComplete="off">
          <fieldset className={classes.sectionContainer}>
            <legend>
              <Typography
                variant="body1"
                component="p"
                className={classes.sectionHeader}
              >
                Address
              </Typography>
            </legend>
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
          </fieldset>

          <fieldset className={classes.sectionContainer}>
            <legend>
              <Typography
                variant="body1"
                component="p"
                className={classes.sectionHeader}
              >
                Interests and Goals
              </Typography>
            </legend>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionDescription}
            >
              The questions below help us understand a little bit more about
              your experience and which roles you might be interested in
              applying for.
            </Typography>

            <FormRadioButtons
              question="What is the status of your job search? *"
              value={values.job_search_status}
              onChange={handleChange}
              options={jobSearchStatus}
              name="job_search_status"
              ariaLabel="Job search status"
              error={errors.jobSearchStatus_error}
            />

            <FormRadioButtons
              question="How many years of professional experience (internships, advocacy, employed etc.) do you have? *"
              value={values.years_exp}
              onChange={handleChange}
              options={yearsOfExperience}
              name="years_exp"
              ariaLabel="Years of experience"
              error={errors.yearsExp_error}
            />

            <FormCheckboxes
              question="Which of the following types of roles are you interested in applying for? (select all that apply)"
              options={roles}
              onChange={handleInterestedRolesChange}
            />

            <FormRadioButtons
              question="Have you participated in any of Baltimore Corps' programs and services already?"
              value={values.previous_bcorps_program}
              onChange={handleChange}
              options={['Yes', 'No']}
              name="previous_bcorps_program"
              ariaLabel="Have participated with Baltimore Corps programs and services before"
            />
          </fieldset>
          <fieldset className={classes.sectionContainer}>
            <legend>
              <Typography
                variant="body1"
                component="p"
                className={classes.sectionHeader}
              >
                Demographic Information
              </Typography>
            </legend>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionDescription}
            >
              The information below helps us build a better picture of our
              applicants. As an organization committed to equity, it is
              important for us to understand the variety of identities and
              affinities that are represented within our pool so that we can
              engage in a thoughtful process. That being said, we understand
              that this information is sensitive and providing it is completely
              optional.
            </Typography>
            <FormCheckboxes
              question="Race (select all that apply)"
              options={raceOptions}
              onChange={handleRacesChange}
            />
            {values.race.not_listed && (
              <div className={classes.otherRace}>
                <FormTextField
                  value={values.race.race_other}
                  name="race_other"
                  label="We understand that the options listed above are not exhaustive. If your identity is not listed above, please let us know how you identify:"
                  onChange={handleRaceOther}
                />
              </div>
            )}
            <div className={classes.genderAndPronounsContainer}>
              <div className={classes.dropdownAndTextFieldContainer}>
                <FormDropDownSelector
                  question="Gender"
                  name="gender"
                  value={values.gender}
                  options={genders}
                  onChange={handleChange}
                />

                {values.gender === 'Not Listed' && (
                  <FormTextField
                    value={values.gender_other}
                    name="gender_other"
                    label=" We understand that the options provided above are limited. If your gender identity is not listed above, please let us know how you identify:"
                    onChange={handleChange}
                  />
                )}
              </div>
              <div className={classes.dropdownAndTextFieldContainer}>
                <FormDropDownSelector
                  question="Pronoun"
                  name="pronoun"
                  value={values.pronoun}
                  options={pronouns}
                  onChange={handleChange}
                />

                {values.pronoun === 'Not Listed' && (
                  <FormTextField
                    value={values.pronoun_other}
                    name="pronoun_other"
                    label="We understand that the options listed above are not exhaustive. If you use a set of pronouns that aren't listed above, please let us know what they are:"
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>
          </fieldset>
        </form>
      </Grid>
    </Paper>
  );
};

Questionnaire.propTypes = {
  //   contact: PropTypes.object.isRequired,
  //   onSubmit: PropTypes.func.isRequired,
  //   onCloseAllForms: PropTypes.func.isRequired,
  //   onClickEdit: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    flexGrow: 1,
    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
      padding: spacing(3, 6),
      margin: spacing(2, 0),
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '100%',
    padding: spacing(2, 3),
    margin: spacing(0),

    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    [breakpoints.up('sm')]: {},
  },
  logo: {
    marginRight: '10px',
    position: 'absolute',
    top: 40,
    height: '160px',
    [breakpoints.up('sm')]: {
      height: '230px',
    },
    [breakpoints.up('md')]: {
      height: '250px',
    },
    [breakpoints.up('lg')]: {
      height: '280px',
    },
  },
  formDescription: {
    position: 'static',
    marginTop: '90px',
    textIndent: '30px',
    textAlign: 'justify',
    fontSize: '15px',
    [breakpoints.up('sm')]: {
      fontSize: '16px',
      marginTop: '100px',
    },
    [breakpoints.up('md')]: {
      marginTop: '120px',
    },
    [breakpoints.up('lg')]: {
      marginTop: '140px',
    },
  },
  form: {
    padding: '17px 30px 20px 30px',
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(2),
  },

  formControl: {
    width: '95%',

    marginTop: spacing(0),
  },
  sectionContainer: {
    border: '2px solid #ffe070',
    padding: '0px 40px 20px 40px',
    marginBottom: '20px',
  },
  sectionHeader: {
    fontSize: '19px',
    padding: '8px',
  },
  sectionDescription: {
    textIndent: '30px',
    textAlign: 'justify',
    fontSize: '15px',
    marginBottom: '20px',

    [breakpoints.up('sm')]: {
      fontSize: '16px',
    },
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

export default withStyles(styles)(Questionnaire);
