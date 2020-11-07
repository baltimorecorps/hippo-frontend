import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ValueAlignmentForm from './ValueAlignmentForm';
import {applicantFull} from 'mockData/applicant';

describe('ValueAlignmentForm', () => {
  test('Render ValueAlignmentForm', () => {
    const onSubmit = jest.fn();
    const onCloseForm = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      <ValueAlignmentForm
        contact={applicantFull}
        onSubmit={onSubmit}
        onCloseForm={onCloseForm}
      />
    );

    expect(getByTestId('value_alignment_form')).toBeInTheDocument();
    expect(getByTestId('form_header')).toBeInTheDocument();
    expect(getByTestId('form_header')).toHaveTextContent('Value Alignment');

    const questions = getAllByTestId('question');
    expect(questions.length).toBe(2);

    expect(questions[0]).toHaveTextContent(
      'Racial Equity & Baltimore: Why is racial equity work in Baltimore important to you? *'
    );
    expect(questions[1]).toHaveTextContent(
      'Sector Effectiveness: How has your background and experiences prepared you for today’s work in Baltimore’s social impact sector? *'
    );

    expect(getByTestId('close_form_button')).toBeInTheDocument();
    expect(getByTestId('submit_button')).toBeInTheDocument();
  });
});
