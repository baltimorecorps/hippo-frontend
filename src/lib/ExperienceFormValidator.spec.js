import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { experienceValidator } from './formValidator';
// example

afterEach(cleanup);
describe('Experience Form Validations', () => {
  test('Work Experience: Blank Experience', () => {
    const values = {
      description: '',
      host: '',
      title: '',
      location_city: '',
      location_state: '',
      start_month: '',
      start_year: '',
      end_month: '',
      end_year: '',
      is_current: false,
      type: 'Work',
      achievements: [],
    };

    const expectedErr = {
      host_error: 'Required',
      title_error: 'Required',
      location_error: 'Required',
      startMonth_error: 'Required',
      startYear_error: 'Required',
      endMonth_error: 'Required',
      endYear_error: 'Required',
    };
    const { isError, err } = experienceValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Work Experience: invalid end_year values', () => {
    const values = {
      host: 'Baltimore Corps',
      title: 'Intern',
      location: 'Baltimore, MD ,USA',
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

  test('Work Experience: invalid end_month values', () => {
    const values = {
      host: 'Baltimore Corps',
      title: 'Intern',
      location: 'Baltimore, MD ,USA',
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

  test('Education: empty values', () => {
    const values = {
      host: '',
      title: '',
      degree: '',
      start_month: '',
      start_year: '',
      end_month: '',
      end_year: '',
      location: '',
      is_current: false,
    };

    const expectedErr = {
      host_error: 'Required',
      title_error: 'Required',
      degree_error: 'Required',
      startMonth_error: 'Required',
      startYear_error: 'Required',
      endMonth_error: 'Required',
      endYear_error: 'Required',
      location_error: 'Required',
    };
    const { isError, err } = experienceValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Education: valid values', () => {
    const values = {
      host: 'CCBC',
      title: 'Computer Science',
      degree: 'Associates',
      location: 'Baltimore, MD ,USA',
      start_month: 'January',
      start_year: '2013',
      end_month: 'January',
      end_year: '2018',
      is_current: false,
    };

    const expectedErr = {};
    const { isError, err } = experienceValidator(values);

    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });

  test('Accomplishments: valid values', () => {
    const values = {
      host: 'CCBC',
      title: 'Computer Science',
      degree: 'Associates',
      location: 'Baltimore, MD ,USA',
      start_month: 'January',
      start_year: '2016',
      end_month: 'none',
      end_year: '0',
      is_current: true,
    };

    const expectedErr = {};
    const { isError, err } = experienceValidator(values);

    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });
});
