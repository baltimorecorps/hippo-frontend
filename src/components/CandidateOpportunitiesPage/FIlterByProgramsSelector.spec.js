import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import FilterByProgramsSelector from './FilterByProgramsSelector';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

const programs = [
  'All Programs',
  'Place for Purpose',
  'Fellowship',
  'Mayoral Fellowship',
];

describe('Filter by Programs Selector', () => {
  test('Selecting different programs', () => {
    const handleChangeFilter = jest.fn();
    const {getByTestId} = render(
      <FilterByProgramsSelector
        handleChangeFilter={handleChangeFilter}
        value="All Programs"
        programs={programs}
      />
    );

    const programsSelector = getByTestId('programs_selectors');

    expect(programsSelector).toBeInTheDocument();
    expect(programsSelector.value).toBe('All Programs');

    fireEvent.change(programsSelector, {
      target: {value: 'Fellowship'},
    });

    expect(handleChangeFilter.mock.calls.length).toBe(1);
    expect(handleChangeFilter.mock.calls[0][1].props.value).toBe('Fellowship');

    fireEvent.change(programsSelector, {
      target: {value: 'Place for Purpose'},
    });
    expect(handleChangeFilter.mock.calls.length).toBe(2);

    expect(handleChangeFilter.mock.calls[1][1].props.value).toBe(
      'Place for Purpose'
    );

    fireEvent.change(programsSelector, {
      target: {value: 'Mayoral Fellowship'},
    });
    expect(handleChangeFilter.mock.calls.length).toBe(3);

    expect(handleChangeFilter.mock.calls[2][1].props.value).toBe(
      'Mayoral Fellowship'
    );
  });
});
