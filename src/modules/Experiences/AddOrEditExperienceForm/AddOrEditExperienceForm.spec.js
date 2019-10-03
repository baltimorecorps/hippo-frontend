import React from 'react';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddOrEditExperienceForm from './AddOrEditExperienceForm';

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
  start_month: 'January',
  start_year: '2015',
  end_month: 'January',
  end_year: '2017',
  type: 'Work',
  contact_id: 1234,
  achievements: [{ description: 'Test achievement 1' }, { description: 'Test achievement 2' }],
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
    const { queryByText, getByLabelText, getByText } = render(
      <AddOrEditExperienceForm
        handleCancel={cancel}
        labels={{}}
        onSubmit={submit}
        experience={experience}
      />,
    );

    fireEvent.click(getByText(/save/i));

    expect(submit.mock.calls.length).toBe(1);
    expect(submit.mock.calls[0][0]).toEqual(experience);
  });

  test('organization text box', () => {
    const cancel = jest.fn();
    const submit = jest.fn();
    const { queryByText, getByLabelText, getByText } = render(
      <AddOrEditExperienceForm
        handleCancel={cancel}
        labels={{}}
        onSubmit={submit}
        experience={experience}
      />,
    );
    fireEvent.change(getByLabelText(/organization/i), { target: { value: 'new org' } });

    fireEvent.click(getByText(/save/i));

    expect(submit.mock.calls.length).toBe(1);
    expect(submit.mock.calls[0][0]).toHaveProperty('host');
    expect(submit.mock.calls[0][0].host).toBe('new org');
  });
});
