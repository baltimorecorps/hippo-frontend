import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import {interestsAndGoalsValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';
import {getCheckboxOptions} from '../../../lib/helperFunctions/helpers';

import {
  jobSearchStatus,
  currentJobStatus,
  currentEduStatus,
  yearsOfExperience,
  roleLabels,
  programsCompletedLabels,
} from '../defaultData';

import {
  FormHeader,
  FormRadioButtons,
  FormCheckboxes,
  FormSubmitButton,
} from './FormTemplates';

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);

  const blankProgramCompleted = {
    fellowship: false,
    public_allies: false,
    mayoral_fellowship: false,
    kiva: false,
    elevation_awards: false,
    civic_innovators: false,
  };

  if (values.profile && values.profile.programs_completed == null) {
    update('profile')({
      ...values.profile,
      programs_completed: blankProgramCompleted,
    });
  }

  const handlers = {
    handleChange: event => {
      event.persist();
      const newValue = {
        ...values.profile,
        [event.target.name]: event.target.value,
      };

      if (
        event.target.name === 'previous_bcorps_program' &&
        event.target.value === 'No'
      ) {
        newValue.programs_completed = blankProgramCompleted;
      }
      update('profile')(newValue);
    },
    handleSubmit: (contactId, values) => {
      const {first_name, last_name, email, phone_primary, id, profile} = values;
      const payload = {
        first_name,
        last_name,
        email,
        phone_primary,
        id,
        profile,
      };

      onSubmit(contactId, payload);
    },

    handleInterestedRolesChange: event => {
      event.persist();
      const newValue = {
        ...values.profile,
        roles: {
          ...values.profile.roles,
          [event.target.name]: event.target.checked,
        },
      };

      update('profile')(newValue);
    },
    handleProgramsCompletedChange: event => {
      event.persist();
      const newValue = {
        ...values.profile,
        programs_completed: {
          ...values.profile.programs_completed,
          [event.target.name]: event.target.checked,
        },
      };
      update('profile')(newValue);
    },
  };

  return [values, handlers];
};

const InterestsAndGoalsForm = ({contact, onSubmit, onCloseForm, classes}) => {
  const [
    values,
    {
      handleChange,
      handleSubmit,
      handleInterestedRolesChange,
      handleProgramsCompletedChange,
    },
  ] = useForm(contact, onSubmit);
  const [errors, setErrors] = useState({});

  const submit = () => {
    const {isError, err} = interestsAndGoalsValidator(values);
    setErrors(err);

    if (!isError) {
      handleSubmit(contact.id, values);
      onCloseForm();
    }
  };

  const descriptions = [
    'The questions below help us understand a little bit more about your experience and which roles you might be interested in applying for.',
  ];

  const {roles, programs_completed} = values.profile;

  const roleOptions = roles && getCheckboxOptions(roleLabels, roles);

  const programsCompletedOptions =
    programs_completed &&
    getCheckboxOptions(programsCompletedLabels, programs_completed);

  return (
    <Grid
      item
      xs={12}
      className={classes.form}
      data-testid="interests_goals_form"
    >
      <FormHeader
        header="Interests and Goals"
        descriptions={descriptions}
        onCloseForm={onCloseForm}
      />

      <Grid item xs={12} align="flex-start">
        <form noValidate autoComplete="off">
          <FormRadioButtons
            question="What's your current employment status? *"
            value={values.profile.current_job_status}
            onChange={handleChange}
            options={currentJobStatus}
            name="current_job_status"
            ariaLabel="Current job status"
            error={errors.currentJobStatus_error}
          />
          <FormRadioButtons
            question="Are you currently a student? *"
            value={values.profile.current_edu_status}
            onChange={handleChange}
            options={currentEduStatus}
            name="current_edu_status"
            ariaLabel="Current education status"
            error={errors.currentEduStatus_error}
          />

          <FormRadioButtons
            question="What is the status of your job search? *"
            value={values.profile.job_search_status}
            onChange={handleChange}
            options={jobSearchStatus}
            name="job_search_status"
            ariaLabel="Job search status"
            error={errors.jobSearchStatus_error}
          />

          <FormRadioButtons
            question="How many years of professional experience (internships, advocacy, employed etc.) do you have? *"
            value={values.profile.years_exp}
            onChange={handleChange}
            options={yearsOfExperience}
            name="years_exp"
            ariaLabel="Years of experience"
            error={errors.yearsExp_error}
          />

          <FormCheckboxes
            question="Which of the following types of roles are you interested in applying for? (select all that apply)"
            options={roleOptions}
            onChange={handleInterestedRolesChange}
          />

          <FormRadioButtons
            question="Have you participated in any of Baltimore Corps' programs and services already?"
            value={values.profile.previous_bcorps_program}
            onChange={handleChange}
            options={['Yes', 'No']}
            name="previous_bcorps_program"
            ariaLabel="Have participated with Baltimore Corps programs and services before"
          />

          {values.profile.previous_bcorps_program === 'Yes' && (
            <FormCheckboxes
              question="Which of our programs and services have you participated in? *"
              options={programsCompletedOptions}
              onChange={handleProgramsCompletedChange}
              error={errors.programsCompleted_error}
            />
          )}

          <FormSubmitButton onSubmit={submit} />
        </form>
      </Grid>
    </Grid>
  );
};

InterestsAndGoalsForm.propTypes = {
  contact: PropTypes.object,
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

export default withStyles(styles)(InterestsAndGoalsForm);
