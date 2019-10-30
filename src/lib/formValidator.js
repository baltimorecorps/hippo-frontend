import { monthFullNames } from '../modules/Experiences/AddOrEditExperienceForm/staticData';

// Validate add new experience form (Work/Education/Accomplishment)
const experienceValidator = (values) => {
  if (values.start_year) {
    values.start_year = values.start_year.toString();
  }
  if (values.end_year) {
    values.end_year = values.end_year.toString();
  }

  const {
    type,
    start_month,
    end_month,
    start_year,
    end_year,
    is_current,
    location,
    host,
    title,
    degree,
  } = values;

  let isError = false;
  let err = {};

  if (!host) {
    isError = true;
    err.host_error = 'Required';
  }

  if (type === 'Education' && !degree) {
    isError = true;
    err.degree_error = 'Required';
  }

  if (!title) {
    isError = true;
    err.title_error = 'Required';
  }

  // check if start_month is null, invalid month name, or 'none'
  if (!start_month || !monthFullNames.includes(start_month)) {
    isError = true;
    err.startMonth_error = 'Required';
  }

  // check if start_year is null or '0'
  if (!start_year || start_year === '0') {
    isError = true;
    err.startYear_error = 'Required';
  }

  if (type !== 'Accomplishment' && !location) {
    isError = true;
    err.location_error = 'Required';
  }

  // require end_month and end_year if is_current is false
  if (type !== 'Accomplishment' && is_current === false) {
    if (!end_month || !monthFullNames.includes(end_month)) {
      isError = true;
      err.endMonth_error = 'Required';
    }
    if (!end_year || end_year === '0') {
      isError = true;
      err.endYear_error = 'Required';
    }
  }

  if (
    !is_current &&
    start_month &&
    start_year &&
    end_month &&
    end_year &&
    end_month !== 'none' &&
    end_year !== '0'
  ) {
    // if same year (start-end), check if months are in the correct order
    if (
      start_year === end_year &&
      monthFullNames.indexOf(end_month) < monthFullNames.indexOf(start_month)
    ) {
      isError = true;
      err.endMonth_error = 'End month must be later than start month';
    }
    // end year cannot be less than start year
    if (end_year < start_year) {
      isError = true;
      err.endYear_error = 'End year must be greater than start year';
    }
  }

  return { isError, err };
};

const newProfileValidator = (values) => {
  const { first_name, last_name, email, phone_primary } = values;

  let isError = false;
  let err = {};

  if (!first_name || first_name === undefined) {
    isError = true;
    err.firstName_error = 'Required';
  }

  if (!last_name || last_name === undefined) {
    isError = true;
    err.lastName_error = 'Required';
  }

  if (email === undefined) {
    isError = true;
    err.email_error = 'Required';
  } else if (!validateEmail(email)) {
    isError = true;
    err.email_error = 'Invalid email address';
  }
  if (!phone_primary || phone_primary.replace(/\D/g, '').length < 6) {
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
