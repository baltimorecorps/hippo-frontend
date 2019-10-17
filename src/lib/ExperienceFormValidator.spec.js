import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { experienceValidator } from './formValidator';
// example

afterEach(cleanup);
describe('Experience Form Validations', () => {
  test('Work Experience: empty values', () => {
    const values = {};

    const expectedErr = {
      host_error: 'Required',
      title_error: 'Required',
      locationCity_error: 'Required',
      locationState_error: 'Required',
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
      location_city: 'Baltimore',
      location_state: 'Maryland',
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
      location_city: 'Baltimore',
      location_state: 'Maryland',
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
      location_city: '',
      location_state: '',
    };

    const expectedErr = {
      host_error: 'Required',
      title_error: 'Required',
      degree_error: 'Required',
      startMonth_error: 'Required',
      startYear_error: 'Required',
      endMonth_error: 'Required',
      endYear_error: 'Required',
      locationCity_error: 'Required',
      locationState_error: 'Required',
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
      location_city: 'Baltimore',
      location_state: 'Maryland',
      start_month: 'January',
      start_year: '2013',
      end_month: 'January',
      end_year: '2018',
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
      location_city: 'Baltimore',
      location_state: 'Maryland',
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
});
