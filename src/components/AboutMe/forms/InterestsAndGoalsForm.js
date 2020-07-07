import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import {interestsAndGoalsValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';

import {jobSearchStatus, yearsOfExperience, roleLabels} from '../defaultData';

import {
  FormHeader,
  FormRadioButtons,
  FormCheckboxes,
  FormSubmitButton,
} from './FormTemplates';

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);

  const handlers = {
    handleChange: event => {
      event.persist();
      const newValue = {
        ...values.profile,
        [event.target.name]: event.target.value,
      };
      update('profile')(newValue);
    },
    handleSubmit: (contactId, values) => {
      onSubmit(contactId, values);
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

  let roles = [];
  for (const [key, value] of Object.entries(values.profile.roles)) {
    if (value == null) {
      roles.push({name: key, checked: false});
    } else {
      roles.push({name: key, checked: value});
    }
  }

  for (const [key, value] of Object.entries(roleLabels)) {
    roles.forEach((role, index) => {
      if (role.name === key) {
        roles[index] = {...role, label: value};
      }
    });
  }

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
            options={roles}
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
          <FormSubmitButton onSubmit={submit} />
        </form>
      </Grid>
    </Grid>
  );
};

InterestsAndGoalsForm.propTypes = {
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
});

export default withStyles(styles)(InterestsAndGoalsForm);
