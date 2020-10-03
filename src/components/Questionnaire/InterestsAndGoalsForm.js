import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  jobSearchStatus,
  yearsOfExperience,
  roleLabels,
} from '../AboutMe/defaultData';
import {FormRadioButtons, FormCheckboxes} from '../AboutMe/forms/FormTemplates';

const InterestsAndGoalsForm = ({
  values,
  handleChange,
  handleInterestedRolesChange,
  errors,
  classes,
}) => {
  let roles = [];
  for (const [key, value] of Object.entries(values.interested_roles)) {
    roles.push({name: key, checked: value});
  }

  for (const [key, value] of Object.entries(roleLabels)) {
    roles.forEach((role, index) => {
      if (role.name === key) {
        roles[index] = {...role, label: value};
      }
    });
  }

  return (
    <React.Fragment>
      <FormRadioButtons
        question="What is the status of your job search? *"
        value={values.job_search_status}
        onChange={handleChange}
        options={jobSearchStatus}
        name="job_search_status"
        ariaLabel="Job search status"
        error={errors.jobSearchStatus_error}
      />

      <FormRadioButtons
        question="How many years of professional experience (internships, advocacy, employed etc.) do you have? *"
        value={values.years_exp}
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
        value={values.previous_bcorps_program}
        onChange={handleChange}
        options={['Yes', 'No']}
        name="previous_bcorps_program"
        ariaLabel="Have participated with Baltimore Corps programs and services before"
      />
    </React.Fragment>
  );
};

InterestsAndGoalsForm.propTypes = {};

const styles = ({breakpoints, palette, spacing}) => ({});

export default withStyles(styles)(InterestsAndGoalsForm);
