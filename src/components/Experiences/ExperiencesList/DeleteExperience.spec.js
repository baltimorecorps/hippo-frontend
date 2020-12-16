import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import DeleteExperience from './DeleteExperience';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const experience = {
  id: 12,
  description: 'Develop Facebook application',
  host: 'Facebook',
  title: 'Software Developer',
  location: 'Baltimore, MD',
  start_month: 'January',
  start_year: 2017,
  end_month: 'March',
  end_year: 2018,
  is_current: false,
  type: 'Work',
  contact_id: 1,
  achievements: [],
  skills: [],
};

describe('Delete Experience', () => {
  const history = createMemoryHistory();

  test('Render delete dialog', () => {
    const onDelete = jest.fn();
    const refreshDynamicInstructions = jest.fn();
    const handleCancel = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <DeleteExperience
          experience={experience}
          onDelete={onDelete}
          refreshDynamicInstructions={refreshDynamicInstructions}
          handleCancel={handleCancel}
        />
      </Router>
    );
    expect(getByTestId('confirm_delete_message')).toBeInTheDocument();
    expect(getByTestId('exp_host_and_title')).toBeInTheDocument();
    expect(getByTestId('confirm_delete_button')).toBeInTheDocument();
    expect(getByTestId('cancel_delete_button')).toBeInTheDocument();

    expect(getByTestId('confirm_delete_message')).toHaveTextContent(
      'Are you sure you want to delete Facebook — Software Developer'
    );
    expect(getByTestId('exp_host_and_title')).toHaveTextContent(
      'Facebook — Software Developer'
    );
  });

  test('Click confirm delete experience', () => {
    const onDelete = jest.fn();
    const refreshDynamicInstructions = jest.fn();
    const handleCancel = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <DeleteExperience
          experience={experience}
          onDelete={onDelete}
          refreshDynamicInstructions={refreshDynamicInstructions}
          handleCancel={handleCancel}
        />
      </Router>
    );

    const deleteButton = getByTestId('confirm_delete_button');
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(onDelete.mock.calls.length).toBe(1);
  });

  test('Click cancel delete experience', () => {
    const onDelete = jest.fn();
    const refreshDynamicInstructions = jest.fn();
    const handleCancel = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <DeleteExperience
          experience={experience}
          onDelete={onDelete}
          refreshDynamicInstructions={refreshDynamicInstructions}
          handleCancel={handleCancel}
        />
      </Router>
    );

    const cancelDeleteButton = getByTestId('cancel_delete_button');
    expect(cancelDeleteButton).toBeInTheDocument();

    fireEvent.click(cancelDeleteButton);
    expect(handleCancel.mock.calls.length).toBe(1);
  });

  test('Render delete dialog with experience without host', () => {
    const noHostExp = {...experience, host: ''};

    const onDelete = jest.fn();
    const refreshDynamicInstructions = jest.fn();
    const handleCancel = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <DeleteExperience
          experience={noHostExp}
          onDelete={onDelete}
          refreshDynamicInstructions={refreshDynamicInstructions}
          handleCancel={handleCancel}
        />
      </Router>
    );
    expect(getByTestId('confirm_delete_message')).toBeInTheDocument();
    expect(getByTestId('confirm_delete_button')).toBeInTheDocument();
    expect(getByTestId('cancel_delete_button')).toBeInTheDocument();

    expect(getByTestId('confirm_delete_message')).toHaveTextContent(
      'Are you sure you want to delete this item'
    );
  });

  test('Render delete dialog with experience without title', () => {
    const noTitleExp = {...experience, title: ''};

    const onDelete = jest.fn();
    const refreshDynamicInstructions = jest.fn();
    const handleCancel = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <DeleteExperience
          experience={noTitleExp}
          onDelete={onDelete}
          refreshDynamicInstructions={refreshDynamicInstructions}
          handleCancel={handleCancel}
        />
      </Router>
    );
    expect(getByTestId('confirm_delete_message')).toBeInTheDocument();
    expect(getByTestId('confirm_delete_button')).toBeInTheDocument();
    expect(getByTestId('cancel_delete_button')).toBeInTheDocument();

    expect(getByTestId('confirm_delete_message')).toHaveTextContent(
      'Are you sure you want to delete this item'
    );
  });

  test('Render delete dialog with experience without host and title', () => {
    const noHostAndTitleExp = {...experience, host: '', title: ''};

    const onDelete = jest.fn();
    const refreshDynamicInstructions = jest.fn();
    const handleCancel = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <DeleteExperience
          experience={noHostAndTitleExp}
          onDelete={onDelete}
          refreshDynamicInstructions={refreshDynamicInstructions}
          handleCancel={handleCancel}
        />
      </Router>
    );
    expect(getByTestId('confirm_delete_message')).toBeInTheDocument();
    expect(getByTestId('confirm_delete_button')).toBeInTheDocument();
    expect(getByTestId('cancel_delete_button')).toBeInTheDocument();

    expect(getByTestId('confirm_delete_message')).toHaveTextContent(
      'Are you sure you want to delete this item'
    );
  });
});
