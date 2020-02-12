import {cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {getWorkLength, getMonthScore, sortExperiences} from './helpers';

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
    values.map(value => {
      result = `${value} years ${value} months`;
      const lengthWork = getWorkLength(value, value);
      expect(lengthWork).toEqual(result);
    });
  });
});

describe('Test sortExperiences Functions', () => {
  const experiences = [
    {
      id: 1,
      is_current: false,
      start_month: 'January',
      start_year: 2016,
      end_month: 'May',
      end_year: 2017,
    },
    {
      id: 2,
      is_current: false,
      start_month: 'August',
      start_year: 2015,
      end_month: 'May',
      end_year: 2017,
    },
    {
      id: 3,
      is_current: true,
      start_month: 'July',
      start_year: 2017,
      end_month: 'none',
      end_year: 0,
    },
    {
      id: 4,
      is_current: true,
      start_month: 'March',
      start_year: 2015,
      end_month: 'none',
      end_year: 0,
    },
    {
      id: 5,
      is_current: false,
      start_month: 'April',
      start_year: 2016,
      end_month: 'September',
      end_year: 2019,
    },
    {
      id: 6,
      is_current: false,
      start_month: 'December',
      start_year: 2012,
      end_month: 'October',
      end_year: 2014,
    },
  ];

  test('getMonthScore Function', () => {
    const experiencesWithScores = getMonthScore(experiences);

    expect(experiencesWithScores[0].end_month_score).toBe(5);
    expect(experiencesWithScores[1].end_month_score).toBe(5);
    expect(experiencesWithScores[2].end_month_score).toBe(undefined);
    expect(experiencesWithScores[3].end_month_score).toBe(undefined);
    expect(experiencesWithScores[4].end_month_score).toBe(9);
    expect(experiencesWithScores[5].end_month_score).toBe(10);

    expect(experiencesWithScores[0].start_month_score).toBe(1);
    expect(experiencesWithScores[1].start_month_score).toBe(8);
    expect(experiencesWithScores[2].start_month_score).toBe(7);
    expect(experiencesWithScores[3].start_month_score).toBe(3);
    expect(experiencesWithScores[4].start_month_score).toBe(4);
    expect(experiencesWithScores[5].start_month_score).toBe(12);
  });

  test('sortExperiences Function', () => {
    const sortedExperiences = sortExperiences(experiences);

    expect(sortedExperiences[0].id).toBe(3);
    expect(sortedExperiences[1].id).toBe(4);
    expect(sortedExperiences[2].id).toBe(5);
    expect(sortedExperiences[3].id).toBe(1);
    expect(sortedExperiences[4].id).toBe(2);
    expect(sortedExperiences[5].id).toBe(6);
  });
});
