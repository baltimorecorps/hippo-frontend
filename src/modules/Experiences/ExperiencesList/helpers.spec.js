import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { getMonthAndYear, getWorkLength } from './helpers.js';

afterEach(cleanup);

describe('getWorkLength Function', () => {
  test('year = 0 ,month = 0', () => {
    const years = 0;
    const months = 0;
    let result = 'Less than a month';

    const lengthWork = getWorkLength(years, months);

    expect(lengthWork).toEqual(result);
  });

  test('year = 1 ,month = 0', () => {
    const years = 1;
    const months = 0;
    let result = '1 year';

    const lengthWork = getWorkLength(years, months);

    expect(lengthWork).toEqual(result);
  });

  test('year = 0 ,month = 1', () => {
    const years = 0;
    const months = 1;
    let result = '1 month';

    const lengthWork = getWorkLength(years, months);

    expect(lengthWork).toEqual(result);
  });

  test('year = 1 ,month = 1', () => {
    const years = 1;
    const months = 1;
    let result = '1 year 1 month';

    const lengthWork = getWorkLength(years, months);

    expect(lengthWork).toEqual(result);
  });

  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  test('more than one year and one month', () => {
    let result = '';
    values.map((value) => {
      result = `${value} years ${value} months`;
      const lengthWork = getWorkLength(value, value);
      expect(lengthWork).toEqual(result);
    });
  });
});
