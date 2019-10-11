import { monthFullNames } from '../modules/Experiences/AddOrEditExperienceForm/staticData';

const experienceValidator = (values) => {
  let isError = false;
  let err = {};

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

  if (!values.first_name || values.first_name === undefined) {
    isError = true;
    err.firstName_error = 'Required';
  } else if (!validateName(values.first_name)) {
    isError = true;

    err.firstName_error = 'Invalid format. Only (a-z, A-Z), ( ), and (-).';
  }

  if (!values.last_name || values.last_name === undefined) {
    isError = true;
    err.lastName_error = 'Required';
  } else if (!validateName(values.last_name)) {
    isError = true;
    err.lastName_error = 'Invalid format. Only (a-z, A-Z), ( ), and (-).';
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
const validateEmail = (input) => {
  const mailFormat = /^(?=.{1,64}$)[A-Z0-9_%!+-][A-Z0-9._%!+-]*@[A-Z0-9][A-Z0-9-.]+[^.]\.[A-Z]{2,}$/i;
  // if (mailFormat.split('@')[0].length < 64

  if (input.match(mailFormat)) {
    return true;
  } else {
    return false;
  }
};

const validateName = (input) => {
  const nameFormat = /^[A-Z]+[A-Z\s-]*[^-\d\S]*$/i;

  if (input.match(nameFormat)) {
    return true;
  } else {
    return false;
  }
};

// const validatePhone = (input) => {
//   const nameFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

//   if (input.match(nameFormat)) {
//     return true;
//   } else {
//     return false;
//   }
// };

export { newProfileValidator, experienceValidator };
