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
  const racesValuesGroupOne = Object.values(values.race).slice(0, 4);
  const racesValuesGroupTwo = Object.values(values.race).slice(4, 8);

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
          <div className={classes.allRacesContainer}>
            <Typography
              variant="body1"
              component="p"
              className={classes.question}
            >
              Race (select all that apply)
            </Typography>
            <div className={classes.raceGroupContainer}>
              {racesValuesGroupOne.map((race, index) => (
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
            </div>
            <div className={classes.raceGroupContainer}>
              {racesValuesGroupTwo.map((race, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={race[0]}
                      onChange={handleRacesChange}
                      name={racesKeys[index + 4]}
                      color="primary"
                    />
                  }
                  className={classes.race}
                  label={race[1]}
                />
              ))}
              {values.race.notListed[0] && (
                <FormTextField
                  value={values.other_race}
                  name="other_race"
                  label="Other Race"
                  onChange={handleRaceOther}
                  errors={errors}
                />
              )}
            </div>
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
                  label="Other Gender"
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
                  label="Other Pronoun"
                  onChange={handleChange}
                  errors={errors}
                />
              )}
            </div>
          </div>

          <Grid item xs={12} align="end" className={classes.submitButton}>
            <FormSubmitButton onSubmit={submit} />
          </Grid>
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
    padding: '17px 30px 30px 30px',
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(2),
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  sectionInfo: {
    fontSize: '15px',
    textIndent: '25px',
    marginBottom: '15px',
    marginTop: '10px',
    textAlign: 'justify',
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
  formHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
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
  },
  raceGroupContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  dropdownContainer: {
    marginTop: '10px',
  },
  dropdownSelector: {
    textAlign: 'left',
    width: '90px',
  },

  race: {
    textAlign: 'left',
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
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    margin: 0,
    [breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
    },
  },
  inputLabel: {
    textAlign: 'left',
  },
  submitButton: {
    margin: '10px 20px 0px 0px',
  },
});

export default withStyles(styles)(DemographicForm);
