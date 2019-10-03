import React from 'react';
import { render, fireEvent, prettyDOM, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import experienceValidator, { newProfileValidator } from './formValidator';

afterEach(cleanup);

test('New Profile Form Validator Testing with no values ', () => {
  const values = {
    //   first_name: '',
    //   last_name: undefined,
    //   email: undefined,
    //   phone_primary: undefined,
  };
  const expectedErr = {
    firstName_error: 'Required',
    lastName_error: 'Required',
    email_error: 'Required',
    phonePrimary_error: 'Required',
  };

  const { isError, err } = newProfileValidator(values);

  expect(isError).toBe(true);
  expect(err).toEqual(expectedErr);
});

test('New Profile Form Validator Testing: invalid email and string phone number ', () => {
  const values = {
    first_name: 'Bay',
    last_name: 'C',
    email: 'myfakeEmail',
    phone_primary: 'myphoneNumber',
  };
  const expectedErr = {
    email_error: 'Invalid email address',
    phonePrimary_error: 'Numbers only',
  };

  const { isError, err } = newProfileValidator(values);

  expect(isError).toBe(true);
  expect(err).toEqual(expectedErr);

  values.phone_primary = '909';
  expect(isError).toBe(true);
  expect(err).toEqual(expectedErr);
});

test('New Profile Form Validator Testing: invalid phone number ', () => {
  const values = {
    first_name: 'Bay',
    last_name: 'C',
    email: 'myfakeEmail@gmail.com',
    phone_primary: '000999',
  };
  const expectedErr = {
    phonePrimary_error: 'Phone number must be 10 digits',
  };

  const { isError, err } = newProfileValidator(values);

  expect(isError).toBe(true);
  expect(err).toEqual(expectedErr);
});

test('Validate Form Testing: Work Experience with empty values', () => {
  const values = {
    host: '',
    title: '',
    degree: undefined,
    start_month: '',
    start_year: '',
    end_month: '',
    end_year: '',
  };

  const expectedErr = {
    host_error: 'Required',
    title_error: 'Required',
    //   degree_error: 'Required',
    startMonth_error: 'Required',
    startYear_error: 'Required',
    endMonth_error: 'Required',
    endYear_error: 'Required',
  };
  const { isError, err } = experienceValidator(values);

  expect(isError).toBe(true);
  expect(err).toEqual(expectedErr);
});

test('Validate Form Testing: Work Experience with invalid end year values', () => {
  const values = {
    host: 'Baltimore Corps',
    title: 'Intern',
    degree: undefined,
    start_month: 'June',
    start_year: '2018',
    end_month: 'February',
    end_year: '2017',
  };

  const expectedErr = {
    endYear_error: 'End year must be greater than start year',
  };
  const { isError, err } = experienceValidator(values);

  expect(isError).toBe(true);
  expect(err).toEqual(expectedErr);
});

test('Validate Form Testing: Work Experience with invalid end month values', () => {
  const values = {
    host: 'Baltimore Corps',
    title: 'Intern',
    degree: undefined,
    start_month: 'June',
    start_year: '2018',
    end_month: 'March',
    end_year: '2018',
  };

  const expectedErr = {
    endMonth_error: 'End month must be later than start month',
  };
  const { isError, err } = experienceValidator(values);

  expect(isError).toBe(true);
  expect(err).toEqual(expectedErr);
});

test('Validate Form Testing: Education with empty values', () => {
  const values = {
    host: '',
    title: '',
    degree: '',
    start_month: '',
    start_year: '',
    end_month: '',
    end_year: '',
  };

  const expectedErr = {
    host_error: 'Required',
    title_error: 'Required',
    degree_error: 'Required',
    startMonth_error: 'Required',
    startYear_error: 'Required',
    endMonth_error: 'Required',
    endYear_error: 'Required',
  };
  const { isError, err } = experienceValidator(values);

  expect(isError).toBe(true);
  expect(err).toEqual(expectedErr);
});

test('Validate Form Testing: Education with complete values', () => {
  const values = {
    host: 'CCBC',
    title: 'Computer Science',
    degree: 'Associates',
    start_month: 'January',
    start_year: '2016',
    end_month: 'January',
    end_year: '2018',
  };

  const expectedErr = {};
  const { isError, err } = experienceValidator(values);

  expect(isError).toBe(false);
  expect(err).toEqual(expectedErr);
});
