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

import {jobSearchStatus, yearsOfExperience} from '../defaultData';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

import {FormHeader, FormRadioButtons, FormCheckboxes} from './FormTemplates';

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

    handleInterestedRolesChange: event => {
      event.persist();
      const newValue = {
        ...values.interested_roles,
        [event.target.name]: {
          ...values.interested_roles[event.target.name],
          checked: event.target.checked,
        },
      };

      update('interested_roles')(newValue);
    },
  };

  return [values, handlers];
};

const InterestsAndGoalsForm = ({contact, onSubmit, onCloseForm, classes}) => {
  const [
    values,
    {handleChange, handleSubmit, handleInterestedRolesChange},
  ] = useForm(contact, onSubmit);
  const [errors, setErrors] = useState({});

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
  // form validation
  // responsive styles
  // testing

  const rolesKeys = Object.keys(values.interested_roles);
  const descriptions = [
    'The questions below help us understand a little bit more about your experience and which roles you might be interested in applying for.',
  ];
  return (
    <Grid item xs={12} className={classes.form}>
      <FormHeader
        header="Interests and Goals"
        descriptions={descriptions}
        onCloseForm={onCloseForm}
      />

      <Grid item xs={12} align="center">
        <form noValidate autoComplete="off">
          <FormRadioButtons
            question="What is the status of your job search?"
            value={values.job_search_status}
            handleChange={handleChange}
            options={jobSearchStatus}
            name="job_search_status"
            ariaLabel="Job search status"
          />

          <FormRadioButtons
            question="How many years of professional experience (internships, advocacy, employed etc.) do you have?"
            value={values.years_exp}
            handleChange={handleChange}
            options={yearsOfExperience}
            name="years_exp"
            ariaLabel="Years of experience"
          />

          <FormCheckboxes
            question="Which of the following types of roles are you interested in applying for? (select all that apply)"
            names={rolesKeys}
            options={Object.values(values.interested_roles)}
            handleChange={handleInterestedRolesChange}
          />

          <FormRadioButtons
            question="Have you participated in any of Baltimore Corps' programs and services already?"
            value={values.participated_baltimore_corps_before}
            handleChange={handleChange}
            options={['Yes', 'No']}
            name="participated_baltimore_corps_before"
            ariaLabel="Have participated with Baltimore Corps before"
          />
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

InterestsAndGoalsForm.propTypes = {
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
    padding: '17px 30px 10px 30px',
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
  role: {
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

export default withStyles(styles)(InterestsAndGoalsForm);
