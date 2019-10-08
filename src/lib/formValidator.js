import { monthFullNames } from '../modules/Experiences/AddOrEditExperienceForm/staticData';

const experienceValidator = (values) => {
  let isError = false;
  let err = {};

  if (values.host.length < 1) {
    isError = true;
    err.host_error = 'Required';
  }
  if (values.degree !== undefined) {
    if (values.degree.length < 1) {
      isError = true;
      err.degree_error = 'Required';
    }
  }
  if (values.title.length < 1) {
    isError = true;
    err.title_error = 'Required';
  }
  if (!values.start_month) {
    isError = true;
    err.startMonth_error = 'Required';
  }
  if (!values.start_year) {
    isError = true;
    err.startYear_error = 'Required';
  }
  if (!values.end_month) {
    isError = true;
    err.endMonth_error = 'Required';
  }
  if (!values.end_year) {
    isError = true;
    err.endYear_error = 'Required';
  }

  if (values.start_month && values.start_year && values.end_month && values.end_year) {
    if (values.end_year === values.start_year) {
      if (monthFullNames.indexOf(values.end_month) < monthFullNames.indexOf(values.start_month)) {
        isError = true;
        err.endMonth_error = 'End month must be later than start month';
      }
    }
  }
  if (values.start_year && values.end_year) {
    if (values.end_year < values.start_year) {
      isError = true;
      err.endYear_error = 'End year must be greater than start year';
    }
  }

  return { isError, err };
};

const newProfileValidator = (values) => {
  let isError = false;
  let err = {};

  if (values.first_name === undefined || values.first_name.length < 1) {
    isError = true;
    err.firstName_error = 'Required';
  }

  if (values.last_name === undefined || values.last_name.length < 1) {
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
  if (values.phone_primary === undefined || values.phone_primary.length < 1) {
    isError = true;
    err.phonePrimary_error = 'Required';
  } else if (isNaN(parseInt(values.phone_primary))) {
    isError = true;
    err.phonePrimary_error = 'Numbers only';
  } else if (values.phone_primary.length !== 10) {
    isError = true;
    err.phonePrimary_error = 'Phone number must be 10 digits';
  }

  return { isError, err };
};

// Validate RegEx
const validateEmail = (inputText) => {
  const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailFormat)) {
    return true;
  } else {
    return false;
  }
};

export default experienceValidator;

export { newProfileValidator };
