import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

// import ContactInfoForm from '../AboutMe/forms/ContactInfoForm';
// import DemographicForm from '../AboutMe/forms/DemographicForm';
// import InterestsAndGoalsForm from '../AboutMe/forms/InterestsAndGoalsForm';
// import ProgramsAndEligibilityForm from '../AboutMe/forms/ProgramsAndEligibilityForm';

import ContactInfoForm from './ContactInfoForm';

import mockData from '../AboutMe/mockData';
import mockDataEmpty from '../AboutMe/mockDataEmpty';
import Logo from '../../lib/images/long.png';
import {contactInfoValidator} from 'lib/formHelpers/formValidator';
import useFormUpdate from 'lib/formHelpers/useFormUpdate';

import {
  states,
  countryList,
  jobSearchStatus,
  yearsOfExperience,
  roleLabels,
  genders,
  pronouns,
  raceLabels,
} from '../AboutMe/defaultData';

import {
  FormHeader,
  FormRadioButtons,
  FormCheckboxes,
  FormSubmitButton,
  FormTextField,
  FormDropDownSelector,
} from '../AboutMe/forms/FormTemplates';

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

InterestsAndGoalsForm.propTypes = {
  //   contact: PropTypes.object.isRequired,
  //   onSubmit: PropTypes.func.isRequired,
  //   onCloseAllForms: PropTypes.func.isRequired,
  //   onClickEdit: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({});

export default withStyles(styles)(InterestsAndGoalsForm);
