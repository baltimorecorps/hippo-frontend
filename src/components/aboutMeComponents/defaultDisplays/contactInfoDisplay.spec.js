import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContactInfoDisplay from './contactInfoDisplay';
import {applicantFull} from 'mockData/applicant';

describe('ContactInfoDisplay', () => {
  test('Render ContactInfoDisplay', () => {
    const onClickEdit = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      <ContactInfoDisplay contact={applicantFull} onClickEdit={onClickEdit} />
    );

    expect(getByTestId('name')).toBeInTheDocument();
    expect(getByTestId('name')).toHaveTextContent('Bay1 Chairangsaris');

    expect(getByTestId('email')).toBeInTheDocument();
    expect(getByTestId('email')).toHaveTextContent('bayBC1@baltimorecorps.org');

    expect(getByTestId('phone')).toBeInTheDocument();
    expect(getByTestId('phone')).toHaveTextContent('+1 (555) 555-9999');

    expect(getByTestId('address')).toBeInTheDocument();
    expect(getByTestId('address')).toHaveTextContent(
      '1123 Monday St.Baltimore, Maryland 21111 United States'
    );

    expect(getByTestId('edit_button')).toBeInTheDocument();

    const questions = getAllByTestId('question');
    expect(questions.length).toBe(4);
  });

  test('Click Edit Button', () => {
    const onClickEdit = jest.fn();

    const {getByTestId} = render(
      <ContactInfoDisplay contact={applicantFull} onClickEdit={onClickEdit} />
    );

    expect(getByTestId('edit_button')).toBeInTheDocument();
    fireEvent.click(getByTestId('edit_button'));
    expect(onClickEdit.mock.calls.length).toBe(1);
  });

  test('Display hear_about_us_other', () => {
    const onClickEdit = jest.fn();
    const contact = {
      ...applicantFull,
      profile: {...applicantFull.profile, hear_about_us_other: 'CCBC'},
    };

    const {getAllByTestId} = render(
      <ContactInfoDisplay contact={contact} onClickEdit={onClickEdit} />
    );

    const questions = getAllByTestId('question');
    expect(questions.length).toBe(4);
    const answers = getAllByTestId('answer');
    expect(answers.length).toBe(4);

    expect(questions[3]).toHaveTextContent(
      'How you find out about Baltimore Corps:'
    );
    expect(answers[3]).toHaveTextContent('CCBC');
  });
});
