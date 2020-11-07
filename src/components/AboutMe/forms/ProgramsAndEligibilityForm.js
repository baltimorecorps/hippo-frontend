import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import {programsAndEligibilityValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';
import {FormHeader, FormCheckboxes, FormSubmitButton} from './FormTemplates';
import {createALink} from 'lib/helperFunctions/helpers';

const useForm = (initialValues, onSubmit, defaultProgramApps) => {
  const [update, values] = useFormUpdate(initialValues);

  if (
    values &&
    values.program_apps.length === 0 &&
    defaultProgramApps.length > 0
  ) {
    update('program_apps')(defaultProgramApps);
  }

  const handlers = {
    handleInterestedProgramsChange: event => {
      event.persist();

      if (event.target.name !== 'needs_help_programs') {
        const newValue = values.program_apps.map(program => {
          if (program.program.name === event.target.name) {
            return {
              ...program,
              is_interested: event.target.checked,
            };
          } else return program;
        });

        update('program_apps')(newValue);
      } else {
        update('profile')({
          ...values.profile,
          needs_help_programs: event.target.checked,
        });
      }
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
  updateAboutMe,
  refreshDynamicInstructions,
  classes,
}) => {
  const [values, {handleInterestedProgramsChange}] = useForm(
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
    console.log('err', err);
    if (!isError) {
      const {first_name, last_name, email, id, program_apps} = values;

      const programApps = {
        first_name,
        last_name,
        email,
        id,
        program_apps,
      };

      const aboutMeInfo = {
        first_name,
        last_name,
        email,
        id,
        profile: {...values.profile},
      };
      updateAboutMe(contact.id, aboutMeInfo);
      updateProgramApps(programApps, contact.id);
      refreshDynamicInstructions(contact.id);
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

  programOptions.push({
    name: 'needs_help_programs',
    label: "I'd like some help figuring this out",
    checked: values.profile.needs_help_programs,
  });

  const programAndServicesLink = createALink(
    'program and services',
    'https://www.baltimorecorps.org/start-here',
    classes.descriptionLink
  );

  const descriptionWithLink = (
    <span>
      While our team will help you figure out which of {programAndServicesLink}{' '}
      best align with where you are in your career, some folks apply to join our
      network because they are interested in a particular program offering.
    </span>
  );

  const descriptions = [
    descriptionWithLink,
    "The questions below allow you to indicate which programs (if any) you know you're interested in before we get a chance to chat with you, and checks to see if you're eligible for them",
  ];

  return (
    <Grid
      item
      xs={12}
      className={classes.form}
      data-testid="programs_eligibility_form"
    >
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
  contact: PropTypes.object.isRequired,
  onCloseForm: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  form: {
    padding: '0px 30px',
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(2),
  },
  descriptionLink: {
    color: 'blue',
    textDecoration: 'underline',
  },
});

export default withStyles(styles)(ProgramsAndEligibilityForm);
