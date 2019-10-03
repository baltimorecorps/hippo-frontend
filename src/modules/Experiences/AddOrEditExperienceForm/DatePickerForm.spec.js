import React from 'react';
import { render, fireEvent, prettyDOM, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DatePickerForm from './DatePickerForm';

////////-----------------------------------------------------------------/////////
test('DatePicker test: Month', () => {
  const values = {
    start_month: 'March',
  };

  const handleChange = jest.fn();
  const { queryByText, getByLabelText, getByText, getByTestId } = render(
    <DatePickerForm
      disabled={false}
      type="month"
      label="Start Month"
      name="start_month"
      value={values.start_month}
      onChange={handleChange}
      helperText={null}
    />,
  );
  const select = getByTestId('start_month');
  expect(select).toBeInTheDocument();
  expect(select.value).toBe('March');

  fireEvent.change(select, { target: { value: 'April' } });
  expect(select.value).toBe('April');
});
