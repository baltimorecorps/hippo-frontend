import React from 'react';
import {
  render,
  fireEvent,
  prettyDOM,
  waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddOrEditExperienceForm from './AddOrEditExperienceForm';

const setupGoogleMock = () => {
  /*** Mock Google Maps JavaScript API ***/
  const google = {
    maps: {
      places: {
        AutocompleteService: class {},
        Autocomplete: class {},
        PlacesServiceStatus: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
      },
      Geocoder: () => {},
      GeocoderStatus: {
        ERROR: 'ERROR',
        INVALID_REQUEST: 'INVALID_REQUEST',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
    },
  };
  global.window.google = google;
};

// setup Google Mock
beforeAll(() => {
  setupGoogleMock();
});

function isScrollable(e) {
  if (e.scrollTopMax !== undefined) return e.scrollTopMax > 0;

  if (e == document.scrollingElement) return e.scrollHeight > e.clientHeight;

  return (
    e.scrollHeight > e.clientHeight &&
    ['scroll', 'auto'].indexOf(getComputedStyle(e).overflowY) >= 0
  );
}

const experience = {
  description: 'Test description',
  host: 'Test host',
  title: 'Test Title',
  location: 'Baltimore, MD, USA',
  start_month: 'January',
  start_year: '2015',
  end_month: 'August',
  end_year: '2017',
  is_current: false,
  type: 'Work',
  contact_id: 1234,
  achievements: [
    {description: 'Test achievement 1'},
    {description: 'Test achievement 2'},
  ],
};

describe('AddOrEditExperienceForm', () => {
  //test('ensure form can scroll', () => {
  //  const {queryByText, getByLabelText, getByText} = render(
  //    <AddOrEditExperienceForm
  //      handleCancel={() => {}}
  //      labels={{}}
  //      onSubmit={() => {}}
  //      experience={experience}
  //    />
  //  )

  //  // query* functions will return the element or null if it cannot be found
  //  // get* functions will return the element or throw an error if it cannot be found
  //  expect(queryByText('Test description')).toBeInTheDocument()
  //  expect(isScrollable(element)).toBe(true)

  //});

  test('submit sends values', () => {
    const cancel = jest.fn();
    const submit = jest.fn();
    const {getByText} = render(
      <AddOrEditExperienceForm
        handleCancel={cancel}
        labels={{}}
        onSubmit={submit}
        experience={experience}
      />
    );

    fireEvent.click(getByText(/save/i));

    expect(submit.mock.calls.length).toBe(1);
    expect(submit.mock.calls[0][0]).toEqual(experience);
  });

  test('organization text box', () => {
    const cancel = jest.fn();
    const submit = jest.fn();
    const {getByLabelText, getByText} = render(
      <AddOrEditExperienceForm
        handleCancel={cancel}
        labels={{}}
        onSubmit={submit}
        experience={experience}
      />
    );
    fireEvent.change(getByLabelText(/organization/i), {
      target: {value: 'new org'},
    });

    fireEvent.click(getByText(/save/i));

    expect(submit.mock.calls.length).toBe(1);
    expect(submit.mock.calls[0][0]).toHaveProperty('host');
    expect(submit.mock.calls[0][0].host).toBe('new org');
  });

  ////////-----------------------------------------------------------------/////////
  test('DatePicker test: Month (selector)', () => {
    const cancel = jest.fn();
    const submit = jest.fn();
    const {getByText, getAllByText} = render(
      <AddOrEditExperienceForm
        handleCancel={cancel}
        labels={{}}
        onSubmit={submit}
        experience={experience}
      />
    );

    // Click the first actual month selector we see (the 'Start Month' one)
    // Note that 'getByLabelText(/start month/i)' doesn't work because of
    // the way that the MaterialUI Select is implemented, so we have to search
    // for the button which has text 'January' instead.
    fireEvent.click(getAllByText('January')[0]);

    // Select the month we want
    fireEvent.click(getByText('April'));
    fireEvent.click(getByText(/save/i));

    expect(submit.mock.calls.length).toBe(1);
    expect(submit.mock.calls[0][0]).toHaveProperty('start_month');
    expect(submit.mock.calls[0][0].start_month).toBe('April');
  });

  test('DatePicker test: Year (selector)', () => {
    const cancel = jest.fn();
    const submit = jest.fn();
    const {getByText, getAllByText} = render(
      <AddOrEditExperienceForm
        handleCancel={cancel}
        labels={{}}
        onSubmit={submit}
        experience={experience}
      />
    );

    // click on the current value of end_year
    fireEvent.click(getAllByText('2017')[0]);

    // Select the year we want to test
    fireEvent.click(getByText('2019'));
    fireEvent.click(getByText(/save/i));

    expect(submit.mock.calls.length).toBe(1);
    expect(submit.mock.calls[0][0]).toHaveProperty('end_year');
    expect(submit.mock.calls[0][0].end_year).toBe('2019');
  });

  test('Work Experience: Is Current is true (checkbox)  ', () => {
    const cancel = jest.fn();
    const submit = jest.fn();
    const {getByText, getByTestId} = render(
      <AddOrEditExperienceForm
        handleCancel={cancel}
        labels={{}}
        onSubmit={submit}
        experience={experience}
      />
    );

    const checkbox = getByTestId('is_current').querySelector(
      'input[type="checkbox"]'
    );
    expect(checkbox).toHaveProperty('checked', false);
    fireEvent.click(checkbox);
    expect(checkbox).toHaveProperty('checked', true);
    fireEvent.click(getByText(/save/i));

    expect(submit.mock.calls.length).toBe(1);
    expect(submit.mock.calls[0][0]).toHaveProperty('is_current');
    expect(submit.mock.calls[0][0].is_current).toBe(true);
    expect(submit.mock.calls[0][0]).toHaveProperty('end_month');
    expect(submit.mock.calls[0][0].end_month).toBe('none');
    expect(submit.mock.calls[0][0]).toHaveProperty('end_year');
    expect(submit.mock.calls[0][0].end_year).toBe('0');
  });

  test('Test Accomplishment Form', () => {
    const experience = {
      host: 'Award 1',
      title: 'Test Title',
      start_month: 'January',
      start_year: '2015',
      type: 'Accomplishment',
      description: 'Test description',
      contact_id: 1234,
      is_current: true,
    };

    const result = {
      contact_id: 1234,
      description: 'Test description',
      host: 'New Award',
      start_month: 'January',
      start_year: '2015',
      end_month: 'none',
      end_year: 0,
      title: 'Test Title',
      type: 'Accomplishment',
      is_current: true,
    };

    const cancel = jest.fn();
    const submit = jest.fn();
    const {getByLabelText, getByText} = render(
      <AddOrEditExperienceForm
        handleCancel={cancel}
        labels={{}}
        onSubmit={submit}
        experience={experience}
      />
    );
    fireEvent.change(getByLabelText(/institution/i), {
      target: {value: 'New Award'},
    });

    fireEvent.click(getByText(/save/i));

    expect(submit.mock.calls.length).toBe(1);
    expect(submit.mock.calls[0][0]).toHaveProperty('host');
    expect(submit.mock.calls[0][0].host).toBe('New Award');
    expect(submit.mock.calls[0][0]).toEqual(result);
  });
});
