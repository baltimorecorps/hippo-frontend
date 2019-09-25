import { monthFullNames } from '../modules/Experiences/AddOrEditExperienceForm/staticData';

const validator = (values) => {
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

const individualValidator = (name, value) => {
  let isError = false;
  let err = {};
  console.log(name, value);

  if (name === 'host' && value.length < 1) {
    isError = true;
    err = {};
    err.host_error = 'Required';
  }
  if (name === 'title' && value.length < 1) {
    isError = true;
    err = {};
    err.title_error = 'Required';
  }
  if (name === 'degree' && value.length < 1) {
    isError = true;
    err = {};
    err.degree_error = 'Required';
  }
  if (name === 'start_month' && !value) {
    isError = true;
    err = {};
    err.startMonth_error = 'Required';
  }
  if (name === 'start_year' && !value) {
    isError = true;
    err = {};
    err.startYear_error = 'Required';
  }
  if (name === 'end_month' && !value) {
    isError = true;
    err = {};
    err.endMonth_error = 'Required';
  }
  if (name === 'end_year' && !value) {
    isError = true;
    err = {};
    err.endYear_error = 'Required';
  }
  return { isError, err };
};

export default validator;

export { individualValidator };
