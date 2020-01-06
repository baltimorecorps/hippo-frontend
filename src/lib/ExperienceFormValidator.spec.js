import {cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {experienceValidator} from './formValidator';
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
    const {isError, err} = experienceValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Work Experience: invalid end_year values', () => {
    const values = {
      type: 'Work',
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
    const {isError, err} = experienceValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Work Experience: invalid end_month values', () => {
    const values = {
      type: 'Work',
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
    const {isError, err} = experienceValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Education: empty values', () => {
    const values = {
      type: 'Education',
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
    const {isError, err} = experienceValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Education: valid values (no degree_other)', () => {
    const values = {
      type: 'Education',
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
    const {isError, err} = experienceValidator(values);

    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });

  test('Education: valid values (with degree_other)', () => {
    const values = {
      type: 'Education',
      host: 'CCBC',
      title: 'Computer Science',
      degree: 'Other',
      degree_other: 'Some other degree type',
      location: 'Baltimore, MD ,USA',
      start_month: 'January',
      start_year: '2013',
      end_month: 'January',
      end_year: '2018',
      is_current: false,
    };

    const expectedErr = {};
    const {isError, err} = experienceValidator(values);

    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });

  test('Education: degreeOther empty values', () => {
    const values = {
      type: 'Education',
      host: '',
      title: '',
      degree: 'Other',
      degree_other: '',
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
      degreeOther_error: 'Required',
      startMonth_error: 'Required',
      startYear_error: 'Required',
      endMonth_error: 'Required',
      endYear_error: 'Required',
      location_error: 'Required',
    };
    const {isError, err} = experienceValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Education: degreeOther more than 100 characters', () => {
    let values = {
      type: 'Education',
      host: '',
      title: '',
      degree: 'Other',
      degree_other:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam accusantium aperiam reiciendis obcaecati ullam quia, minus iste fugiat officia provident impedit possimus rerum amet aut recusandae. Unde animi atque facilis, dolorem tempore fuga eaque! Natus optio id tempore aliquam, reiciendis ut a ex, inventore, minima animi nulla temporibus iste aliquid fugiat velit laborum cupiditate voluptates quis quaerat dolor deserunt ea nostrum. Illum soluta libero numquam voluptates modi labore officiis, maiores laudantium eligendi, dolor laboriosam iusto aspernatur quis ab? Optio nobis harum culpa, eius necessitatibus vero suscipit libero ullam voluptate rem repellat dicta nam consequuntur ipsa iure, natus quidem quas temporibus unde aut perferendis. Laboriosam ullam labore eum quas, distinctio consequatur inventore doloribus alias. Vel harum tenetur beatae ducimus, cupiditate voluptates.',

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
      degreeOther_error: 'Type of Education must be less than 100 characters',
      startMonth_error: 'Required',
      startYear_error: 'Required',
      endMonth_error: 'Required',
      endYear_error: 'Required',
      location_error: 'Required',
    };
    let {isError, err} = experienceValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Accomplishments: valid values', () => {
    const values = {
      host: '',
      title: 'Computer Science',
      degree: 'Associates',
      location: 'Baltimore, MD ,USA',
      start_month: 'January',
      start_year: '2016',
      end_month: 'none',
      end_year: '0',
      is_current: true,
      type: 'Accomplishment',
    };

    const expectedErr = {};
    const {isError, err} = experienceValidator(values);

    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });
});
