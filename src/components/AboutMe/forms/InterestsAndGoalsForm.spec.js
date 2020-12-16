import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import InterestsAndGoalsForm from './InterestsAndGoalsForm';
import {applicantFull, applicantEmptyProfile} from 'mockData/applicant';

describe('InterestsAndGoalsForm', () => {
  test('Render InterestsAndGoalsForm', () => {
    const onSubmit = jest.fn();
    const onCloseForm = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      <InterestsAndGoalsForm
        contact={applicantFull}
        onSubmit={onSubmit}
        onCloseForm={onCloseForm}
      />
    );

    expect(getByTestId('interests_goals_form')).toBeInTheDocument();
    expect(getByTestId('form_header')).toBeInTheDocument();
    expect(getByTestId('form_header')).toHaveTextContent('Interests and Goals');
    expect(getByTestId('close_form_button')).toBeInTheDocument();
    expect(getByTestId('submit_button')).toBeInTheDocument();

    const questions = getAllByTestId('question');
    expect(questions.length).toBe(7);

    const radioButtonOptions = getAllByTestId('radio_button_option');
    expect(radioButtonOptions.length).toBe(14);
  });

  test('Add answer to text fields', () => {
    const onSubmit = jest.fn();
    const onCloseForm = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      <InterestsAndGoalsForm
        contact={applicantEmptyProfile}
        onSubmit={onSubmit}
        onCloseForm={onCloseForm}
      />
    );

    const radioButtonOptions = getAllByTestId('radio_button_option');
    expect(radioButtonOptions.length).toBe(14);

    fireEvent.click(radioButtonOptions[0]);
    fireEvent.click(radioButtonOptions[4]);
    fireEvent.click(radioButtonOptions[6]);
    fireEvent.click(radioButtonOptions[10]);
    fireEvent.click(radioButtonOptions[12]);

    const checkboxesOptions = getAllByTestId('checkbox_option');
    expect(checkboxesOptions.length).toBe(12);

    fireEvent.click(checkboxesOptions[1]);
    fireEvent.click(checkboxesOptions[2]);
    fireEvent.click(checkboxesOptions[4]);
    fireEvent.click(checkboxesOptions[10]);
    fireEvent.click(checkboxesOptions[11]);
    fireEvent.click(getByTestId('submit_button'));

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onCloseForm.mock.calls.length).toBe(1);
  });
});
