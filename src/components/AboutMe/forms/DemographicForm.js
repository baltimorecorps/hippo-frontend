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
    handleSubmit: (contactId, values) => {
      onSubmit(contactId, values);
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
  };

  return [values, handlers];
};

const DemographicForm = ({contact, onSubmit, onCloseForm, classes}) => {
  const [
    values,
    {handleChange, handleSubmit, handleRacesChange, handleRaceOther},
  ] = useForm(contact, onSubmit);

  const submit = () => {
    // console.log('profile', values.profile);
    handleSubmit(contact.id, values);
    onCloseForm();
  };

  const descriptions = [
    ' The information below helps us build a better picture of our applicants. As an organization committed to equity, it is important for us to understand the variety of identities and affinities that are represented within our pool so that we can engage in a thoughtful process. That being said, we understand that this information is sensitive and providing it is completely optional.',
  ];

  let race = [];
  for (const [key, value] of Object.entries(values.profile.race)) {
    if (key !== 'race_other') {
      if (value == null) {
        race.push({name: key, checked: false});
      } else {
        race.push({name: key, checked: value});
      }
    }
  }

  for (const [key, value] of Object.entries(raceLabels)) {
    race.forEach((role, index) => {
      if (role.name === key) {
        race[index] = {...role, label: value};
      }
    });
  }

  const raceOptions = race.slice(0, -1);

  // console.log(values.profile);
  return (
    <Grid item xs={12} className={classes.form}>
      <FormHeader
        header="Demographic Information"
        descriptions={descriptions}
        onCloseForm={onCloseForm}
      />

      <Grid item xs={12} align="flex-start">
        <form noValidate autoComplete="off">
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
          <div className={classes.genderAndPronounsContainer}>
            <div className={classes.dropdownAndTextFieldContainer}>
              <FormDropDownSelector
                question="Gender"
                name="gender"
                value={values.profile.gender}
                options={genders}
                onChange={handleChange}
              />

              {values.profile.gender === 'Not Listed' && (
                <FormTextField
                  value={values.profile.gender_other}
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
                value={values.profile.pronoun}
                options={pronouns}
                onChange={handleChange}
              />

              {values.profile.pronoun === 'Not Listed' && (
                <FormTextField
                  value={values.profile.pronoun_other}
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
