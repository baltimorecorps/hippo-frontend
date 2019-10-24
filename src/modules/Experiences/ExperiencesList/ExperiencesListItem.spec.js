import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExperiencesListItem from './ExperiencesListItem';

describe('ExperiencesListItem', () => {
  const experience = {
    id: 4444,
    description: 'Test description',
    host: 'Test host',
    title: 'Test Title',
    location_city: 'Baltimore',
    location_state: 'Maryland',
    start_month: 'January',
    start_year: 2015,
    end_month: 'August',
    end_year: 2017,
    is_current: false,

    type: 'Work',
    contact_id: 1234,
    achievements: [],
  };

  test('render with selectable true', () => {
    const updateFn = jest.fn();
    const deleteFn = jest.fn();
    const { queryByRole, queryByLabelText } = render(
      <ExperiencesListItem
        key={experience.id}
        onUpdate={updateFn}
        onDelete={deleteFn}
        experience={experience}
        selectable={true}
      />,
    );

    expect(queryByRole('checkbox')).not.toBeNull()
    expect(queryByLabelText(/edit experience/i)).toBeNull()
    expect(queryByLabelText(/delete experience/i)).toBeNull()
  });

  test('render with selectable false', () => {
    const updateFn = jest.fn();
    const deleteFn = jest.fn();
    const { queryByRole, queryByLabelText } = render(
      <ExperiencesListItem
        key={experience.id}
        onUpdate={updateFn}
        onDelete={deleteFn}
        experience={experience}
        selectable={false}
      />,
    );

    expect(queryByRole('checkbox')).toBeNull()
    expect(queryByLabelText(/edit experience/i)).not.toBeNull()
    expect(queryByLabelText(/delete experience/i)).not.toBeNull()
  });
});
