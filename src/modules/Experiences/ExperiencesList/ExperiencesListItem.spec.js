import React from 'react';
import {render, fireEvent} from '@testing-library/react';
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
    const {queryByRole, queryByLabelText} = render(
      <ExperiencesListItem
        key={experience.id}
        onUpdate={updateFn}
        onDelete={deleteFn}
        experience={experience}
        selectable={true}
      />
    );

    expect(queryByRole('checkbox')).not.toBeNull();
    expect(queryByLabelText(/edit experience/i)).toBeNull();
  });

  test('render with selectable false', () => {
    const updateFn = jest.fn();
    const deleteFn = jest.fn();
    const {queryByRole, queryByLabelText} = render(
      <ExperiencesListItem
        key={experience.id}
        onUpdate={updateFn}
        onDelete={deleteFn}
        experience={experience}
        selectable={false}
      />
    );

    expect(queryByRole('checkbox')).toBeNull();
    expect(queryByLabelText(/edit experience/i)).not.toBeNull();
  });

  test('selectable checkbox works', () => {
    // Hold onto the synthetic events so we can inspect them
    const selectFn = jest.fn(e => e.persist());

    const {getByRole} = render(
      <ExperiencesListItem
        key={experience.id}
        onUpdate={jest.fn()}
        onDelete={jest.fn()}
        onSelect={selectFn}
        experience={experience}
        selectable={true}
      />
    );

    fireEvent.click(getByRole('checkbox'));
    expect(selectFn.mock.calls.length).toBe(1);
    expect(selectFn.mock.calls[0][0]).toHaveProperty('target');
    expect(selectFn.mock.calls[0][0].target).toHaveProperty('checked');
    expect(selectFn.mock.calls[0][0].target.checked).toBe(true);
    fireEvent.click(getByRole('checkbox'));
    expect(selectFn.mock.calls.length).toBe(2);
    expect(selectFn.mock.calls[1][0]).toHaveProperty('target');
    expect(selectFn.mock.calls[1][0].target).toHaveProperty('checked');
    expect(selectFn.mock.calls[1][0].target.checked).toBe(false);
  });
});
