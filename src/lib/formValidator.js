import { monthFullNames } from '../modules/Experiences/AddOrEditExperienceForm/staticData';

const experienceValidator = (values, type) => {
  let isError = false;
  let err = {};
  if (values.start_year) {
    values.start_year = values.start_year.toString();
  }
  if (values.end_year) {
    values.end_year = values.end_year.toString();
  }

  if (!values.host) {
    isError = true;
    err.host_error = 'Required';
  }

  if (values.degree || values.degree !== undefined) {
    if (!values.degree) {
      isError = true;
      err.degree_error = 'Required';
    }
  }

  if (!values.title) {
    isError = true;
    err.title_error = 'Required';
  }

  if (!values.start_month || !monthFullNames.includes(values.start_month)) {
    isError = true;
    err.startMonth_error = 'Required';
  }
  if (!values.start_year) {
    isError = true;
    err.startYear_error = 'Required';
  }

  if (type !== 'Accomplishment') {
    if (!values.location) {
      isError = true;
      err.location_error = 'Required';
    }
  }
  // if (!values.end_month) {
  if (type !== 'Accomplishment' && values.is_current === false) {
    if (!values.end_month || !monthFullNames.includes(values.end_month)) {
      isError = true;
      err.endMonth_error = 'Required';
    }
    if (!values.end_year || values.end_year === '0') {
      isError = true;
      err.endYear_error = 'Required';
    }
  }

  if (values.end_month !== 'none' && values.end_year !== '0') {
    if (
      values.start_month &&
      values.start_year &&
      values.end_month &&
      values.end_year &&
      values.end_year === values.start_year &&
      monthFullNames.indexOf(values.end_month) < monthFullNames.indexOf(values.start_month)
    ) {
      isError = true;
      err.endMonth_error = 'End month must be later than start month';
    }
    if (values.start_year && values.end_year && values.end_year < values.start_year) {
      isError = true;
      err.endYear_error = 'End year must be greater than start year';
    }
  }

  return { isError, err };
};

const newProfileValidator = (values) => {
  let isError = false;
  let err = {};

  if (!values.first_name || values.first_name === undefined) {
    isError = true;
    err.firstName_error = 'Required';
  }

  if (!values.last_name || values.last_name === undefined) {
    isError = true;
    err.lastName_error = 'Required';
  }

  if (values.email === undefined) {
    isError = true;
    err.email_error = 'Required';
  } else if (!validateEmail(values.email)) {
    isError = true;
    err.email_error = 'Invalid email address';
  }
  if (!values.phone_primary || values.phone_primary.replace(/\D/g, '').length < 6) {
    isError = true;
    err.phonePrimary_error = 'Required';
  }

  return { isError, err };
};

// Validate RegEx
const validateEmail = (input) => {
  const mailFormat = /^[A-Z0-9_%!+-][A-Z0-9._%!+-]*@[A-Z0-9][A-Z0-9-.]+[^.]\.[A-Z]{2,}$/i;

  if (input.match(mailFormat) && input.split('@')[0].length < 64) {
    return true;
  } else {
    return false;
  }
};

export { newProfileValidator, experienceValidator };
