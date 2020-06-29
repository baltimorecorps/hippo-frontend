import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import {newProfileValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';

import {genders, pronouns} from '../defaultData';

import {
  FormHeader,
  FormDropDownSelector,
  FormTextField,
  FormSubmitButton,
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

    // handleRacesChange: changedDemographic => {
    //   update('demographic')(changedDemographic);
    // },
    handleRacesChange: event => {
      event.persist();
      console.log(event.target.name);
      const newValue = {
        ...values.race,
        [event.target.name]: [
          event.target.checked,
          values.race[event.target.name][1],
        ],
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

const DemographicForm = ({contact, onSubmit, onCloseForm, classes}) => {
  const [
    values,
    {handleChange, handleSubmit, handleRacesChange, handleRaceOther},
  ] = useForm(contact, onSubmit);
  const [errors, setErrors] = useState({});

  // const {demographic} = values;
  const racesKeys = Object.keys(values.race);
  const races = Object.values(values.race).slice(0, -1);

  // const handleRacesCheckbox = event => {
  //   event.persist();
  //   const updatedDemographic = {
  //     ...demographic,
  //     races: {
  //       ...demographic.races,
  //       [event.target.name]: [
  //         event.target.checked,
  //         demographic.races[event.target.name][1],
  //       ],
  //     },
  //   };
  //   handleRacesChange(updatedDemographic);
  // };
  // const handleDropdownSelector = event => {
  //   event.persist();
  //   const updatedDemographic = {
  //     // ...demographic,
  //     [event.target.name]: event.target.value,
  //   };
  //   handleRacesChange(updatedDemographic);
  // };

  const submit = () => {
    const {isError, err} = newProfileValidator(values);

    if (isError) {
      setErrors(err);
    } else {
      handleSubmit(values);
      onCloseForm();
    }
  };

  // todo

  // Refactor
  // form validation
  // testing
  const descriptions = [
    ' The information below helps us build a better picture of our applicants. As an organization committed to equity, it is important for us to understand the variety of identities and affinities that are represented within our pool so that we can engage in a thoughtful process. That being said, we understand that this information is sensitive and providing it is completely optional.',
  ];

  return (
    <Grid item xs={12} className={classes.form}>
      <FormHeader
        header="Demographic Information"
        descriptions={descriptions}
        onCloseForm={onCloseForm}
      />

      <Grid item xs={12} align="center">
        <form noValidate autoComplete="off">
          <Typography
            variant="body1"
            component="p"
            className={classes.question}
          >
            Race (select all that apply)
          </Typography>
          <div className={classes.raceGroupContainer}>
            {races.map((race, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={race[0]}
                    onChange={handleRacesChange}
                    name={racesKeys[index]}
                    color="primary"
                  />
                }
                className={classes.race}
                label={race[1]}
              />
            ))}
            {values.race.notListed[0] && (
              <div className={classes.otherRace}>
                <FormTextField
                  value={values.other_race}
                  name="other_race"
                  label="We understand that the options listed above are not exhaustive. If your identity is not listed above, please let us know how you identify:"
                  onChange={handleRaceOther}
                  errors={errors}
                />
              </div>
            )}
          </div>
          <div className={classes.genderAndPronounsContainer}>
            <div className={classes.dropdownAndTextfieldContainer}>
              <FormDropDownSelector
                question="Gender"
                name="gender"
                value={values.gender}
                options={genders}
                onChange={handleChange}
              />

              {values.gender === 'Not Listed' && (
                <FormTextField
                  value={values.other_gender}
                  name="other_gender"
                  // label="Other Gender"
                  label=" We understand that the options provided above are limited. If your gender identity is not listed above, please let us know how you identify:"
                  onChange={handleChange}
                  errors={errors}
                />
              )}
            </div>
            <div className={classes.dropdownAndTextfieldContainer}>
              <FormDropDownSelector
                question="Pronoun"
                name="pronoun"
                value={values.pronoun}
                options={pronouns}
                onChange={handleChange}
              />

              {values.pronoun === 'Not Listed' && (
                <FormTextField
                  value={values.other_pronoun}
                  name="other_pronoun"
                  // label="Other Pronoun"
                  label="We understand that the options listed above are not exhaustive. If you use a set of pronouns that aren't listed above, please let us know what they are:"
                  onChange={handleChange}
                  errors={errors}
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
    padding: '0px 30px',
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(2),
  },

  allRacesContainer: {
    display: 'flex',
    flexDirection: 'column',

    [breakpoints.up('lg')]: {
      flexDirection: 'row',
    },
  },
  question: {
    color: '#000000',
    width: '100%',
    textAlign: 'left',
    marginBottom: spacing(1),
    fontWeight: 'bold',
  },
  raceGroupContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  race: {
    textAlign: 'left',
    [breakpoints.up('sm')]: {
      marginLeft: '20px',
    },
  },

  genderAndPronounsContainer: {
    width: '100%',
    marginTop: spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  dropdownAndTextfieldContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 0,
  },
  otherRace: {
    marginLeft: '0px',

    [breakpoints.up('sm')]: {
      marginLeft: '60px',
    },
  },
});

export default withStyles(styles)(DemographicForm);
