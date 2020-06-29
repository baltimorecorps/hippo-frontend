import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import {newProfileValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';

import {FormHeader, FormCheckboxes, FormSubmitButton} from './FormTemplates';

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
            <FormCheckboxes
              question="Which of the following programs and services are you interested in? (select all that apply)"
              names={programsKeys}
              options={Object.values(values.interested_programs)}
              onChange={handleInterestedProgramsChange}
            />
          </div>
          <FormSubmitButton onSubmit={submit} />
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
    padding: '0px 30px',
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(2),
  },
});

export default withStyles(styles)(ProgramsAndEligibilityForm);
