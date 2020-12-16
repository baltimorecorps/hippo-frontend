import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import SelectorForm from './SelectorForm';

////////-----------------------------------------------------------------/////////
test.skip('DatePicker test: Month', () => {
  const values = {
    start_month: 'March',
  };

  const handleChange = jest.fn();
  const {getByTestId} = render(
    <SelectorForm
      disabled={false}
      type="month"
      label="Start Month"
      name="start_month"
      value={values.start_month}
      onChange={handleChange}
      helperText={null}
    />
  );
  const select = getByTestId('start_month');
  expect(select).toBeInTheDocument();
  expect(select.value).toBe('March');

  fireEvent.change(select, {target: {value: 'April'}});
  expect(select.value).toBe('April');
});

test.skip('DatePicker test: Year', () => {
  const values = {
    end_year: 2015,
  };

  const handleChange = jest.fn();
  const {getByTestId} = render(
    <SelectorForm
      disabled={false}
      type="year"
      label="End Year"
      name="end_year"
      value={values.end_year}
      onChange={handleChange}
      helperText={null}
    />
  );
  const select = getByTestId('end_year');
  expect(select).toBeInTheDocument();
  expect(select.value).toBe('2015');

  fireEvent.change(select, {target: {value: 2019}});
  expect(select.value).toBe('2019');
});
