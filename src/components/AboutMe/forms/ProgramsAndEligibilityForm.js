import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import {programsAndEligibilityValidator} from 'lib/formHelpers/formValidator';
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

      const newValue = values.program_apps.map(program => {
        if (program.program.name === event.target.name) {
          return {
            ...program,
            is_interested: event.target.checked,
          };
        } else return program;
      });

      update('program_apps')(newValue);
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
    const {isError, err} = programsAndEligibilityValidator(values);
    setErrors(err);

    if (!isError) {
      console.log('submitted form', values);
      // handleSubmit(values);
      onCloseForm();
    }
  };

  const programOptions = values.program_apps.map(program => {
    return {
      name: program.program.name,
      label: program.program.name,
      checked: program.is_interested,
    };
  });
  // todo
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
              question="Which of the following programs and services are you interested in? (select all that apply) *"
              options={programOptions}
              onChange={handleInterestedProgramsChange}
              error={errors.interestedPrograms_error}
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
