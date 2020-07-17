import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import {programsAndEligibilityValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';

import {FormHeader, FormCheckboxes, FormSubmitButton} from './FormTemplates';

const useForm = (initialValues, onSubmit, defaultProgramApps) => {
  const [update, values] = useFormUpdate(initialValues);

  if (
    values &&
    values.program_apps.length === 0 &&
    defaultProgramApps.length > 0
  ) {
    console.log('Use defaultProgramApps');
    update('program_apps')(defaultProgramApps);
  }

  const handlers = {
    // handleSubmit: (values, contactId) => {
    //   const programApps = values.program_apps;
    //   console.log('submitted programApps', programApps, contactId);

    //   onSubmit(programApps, contactId);
    // },

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
  onCloseForm,
  defaultProgramApps,
  getAllProgramNames,
  updateProgramApps,
  classes,
}) => {
  // console.log('defaultProgramApps', defaultProgramApps);
  // let initialValues = contact;
  // console.log('initialValues', initialValues);

  //   programs.forEach((eachProgram, index) => {
  //     console.log('eachProgram', eachProgram);
  //     return initialValues.program_apps.push({
  //       program: eachProgram,
  //       is_interested: false,
  //     });
  //   });
  //   console.log('initialValues', initialValues);
  //   // initialValues.program_apps = programs;
  // }

  const [values, {handleSubmit, handleInterestedProgramsChange}] = useForm(
    contact,
    updateProgramApps,
    defaultProgramApps
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getAllProgramNames();
  }, [getAllProgramNames]);

  const submit = () => {
    const {isError, err} = programsAndEligibilityValidator(values);
    setErrors(err);

    if (!isError) {
      // handleSubmit(values, contact.id);
      const programApps = values.program_apps;
      console.log('submitted programApps', programApps, contact.id);

      updateProgramApps(programApps, contact.id);
      // update About me for need-help
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

  console.log(values);
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
