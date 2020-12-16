import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import InterestsAndGoalsDisplay from './InterestsAndGoalsDisplay';
import {applicantProfile} from 'mockData/applicant';

describe('InterestsAndGoalsDisplay', () => {
  test('Render InterestsAndGoalsDisplay with empty profile', () => {
    const onClickEdit = jest.fn();

    const {getByTestId} = render(
      <InterestsAndGoalsDisplay
        contact={{profile: null}}
        onClickEdit={onClickEdit}
      />
    );

    expect(getByTestId('loading')).toBeInTheDocument();
  });

  test('Render InterestsAndGoalsDisplay', () => {
    const onClickEdit = jest.fn();

    const {getAllByTestId} = render(
      <InterestsAndGoalsDisplay
        contact={applicantProfile}
        onClickEdit={onClickEdit}
      />
    );

    const questions = getAllByTestId('question');
    expect(questions.length).toBe(7);
    expect(questions[6]).toHaveTextContent("Program(s) I've completed:");

    const answers = getAllByTestId('answer');
    expect(answers[8]).toHaveTextContent('- Kiva');
    expect(answers[9]).toHaveTextContent('- Mayoral Fellowship');
    expect(answers[10]).toHaveTextContent('- Public Allies');
  });

  test('Click Edit Form', () => {
    const onClickEdit = jest.fn();

    const {getByTestId} = render(
      <InterestsAndGoalsDisplay
        contact={applicantProfile}
        onClickEdit={onClickEdit}
      />
    );

    expect(getByTestId('edit_button')).toBeInTheDocument();
    fireEvent.click(getByTestId('edit_button'));
    expect(onClickEdit.mock.calls.length).toBe(1);
  });
});
