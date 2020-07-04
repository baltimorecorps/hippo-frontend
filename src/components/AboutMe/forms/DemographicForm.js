import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import {newProfileValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';

import {genders, pronouns, raceLabels} from '../defaultData';

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
    handleSubmit: values => {
      onSubmit(values);
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

const DemographicForm = ({profile, onSubmit, onCloseForm, classes}) => {
  const [
    values,
    {handleChange, handleSubmit, handleRacesChange, handleRaceOther},
  ] = useForm(profile, onSubmit);

  const submit = () => {
    // handleSubmit(values);
    onCloseForm();
  };

  const descriptions = [
    ' The information below helps us build a better picture of our applicants. As an organization committed to equity, it is important for us to understand the variety of identities and affinities that are represented within our pool so that we can engage in a thoughtful process. That being said, we understand that this information is sensitive and providing it is completely optional.',
  ];

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
    <Grid item xs={12} className={classes.form}>
      <FormHeader
        header="Demographic Information"
        descriptions={descriptions}
        onCloseForm={onCloseForm}
      />

      <Grid item xs={12} align="center">
        <form noValidate autoComplete="off">
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

          <FormSubmitButton onSubmit={submit} />
        </form>
      </Grid>
    </Grid>
  );
};

DemographicForm.propTypes = {
  profile: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  form: {
    padding: '0px 30px',
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(2),
  },

  genderAndPronounsContainer: {
    width: '100%',
    marginTop: spacing(2),
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
    margin: 0,
  },
  otherRace: {
    marginLeft: '0px',

    [breakpoints.up('md')]: {
      marginLeft: '60px',
    },
  },
});

export default withStyles(styles)(DemographicForm);
