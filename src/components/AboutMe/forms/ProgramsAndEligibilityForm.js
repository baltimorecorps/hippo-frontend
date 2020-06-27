import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {newProfileValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {FormHeader} from './FormTemplates';

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);

  const handlers = {
    handleSubmit: values => {
      onSubmit(values);
    },

    handleInterestedProgramsChange: event => {
      event.persist();
      console.log(event.target.name);

      const newValue = {
        ...values.interested_programs,
        [event.target.name]: {
          ...values.interested_programs[event.target.name],
          checked: event.target.checked,
        },
      };
      update('interested_programs')(newValue);
    },
  };

  return [values, handlers];
};

const ProgramsAndEligibilityForm = ({
  contact,
  onSubmit,
  onCloseForm,
  classes,
}) => {
  const [values, {handleSubmit, handleInterestedProgramsChange}] = useForm(
    contact,
    onSubmit
  );
  const [errors, setErrors] = useState({});

  // const {demographic} = values;

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
  //   const handleDropdownSelector = event => {
  //     event.persist();
  //     const updatedDemographic = {
  //       ...demographic,
  //       [event.target.name]: event.target.value,
  //     };
  //     handleRacesChange(updatedDemographic);
  //   };

  const submit = () => {
    const {isError, err} = newProfileValidator(values);

    if (isError) {
      setErrors(err);
    } else {
      handleSubmit(values);
      onCloseForm();
    }
  };

  const programsKeys = Object.keys(values.interested_programs);

  // todo
  // form validation
  // testing

  const descriptions = [
    'While our team will help you figure out which of program and services best align with where you are in your career, some folks apply to join our network because they are interested in a particular program offering.',
    "The questions below allow you to indicate which programs (if any) you know you're interested in before we get a chance to chat with you, and checks to see if you're eligible for them",
  ];

  return (
    <Grid item xs={12} className={classes.form}>
      <FormHeader
        header=" Programs and Eligibility"
        descriptions={descriptions}
        onCloseForm={onCloseForm}
      />

      <Grid item xs={12} align="center">
        <form noValidate autoComplete="off">
          <div className={classes.interestedRolesContainer}>
            <Typography
              variant="body1"
              component="p"
              className={classes.question}
            >
              Which of the following programs and services are you interested
              in? (select all that apply)
            </Typography>
            <div className={classes.checkboxesContainer}>
              {Object.values(values.interested_programs).map(
                (program, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={program.checked}
                        onChange={handleInterestedProgramsChange}
                        name={programsKeys[index]}
                        color="primary"
                      />
                    }
                    className={classes.program}
                    label={program.label}
                  />
                )
              )}
            </div>
          </div>
          <div className={classes.genderAndPronounsContainer}></div>
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
  );
};

ProgramsAndEligibilityForm.propTypes = {
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
    textIndent: '25px',
    marginBottom: '15px',
    marginTop: '10px',
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
  eachQuestionContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: '15px',
  },
  question: {
    color: '#000000',
    // left: '20px',
    width: '100%',
    textAlign: 'left',
  },

  radio: {
    width: '100%',
    paddingLeft: '30px',
  },

  checkboxesContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '15px',
  },
  program: {
    width: '100%',
    paddingLeft: '30px',
  },
  inputLabel: {
    textAlign: 'left',
  },
  submitButton: {
    margin: '10px 20px 0px 0px',
  },
});

export default withStyles(styles)(ProgramsAndEligibilityForm);
