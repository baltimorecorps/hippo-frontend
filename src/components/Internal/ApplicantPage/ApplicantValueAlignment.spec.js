import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApplicantValueAlignment from './ApplicantValueAlignment';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {applicantProfile} from 'mockData/applicant';

describe('ApplicantValueAlignment Component', () => {
  const history = createMemoryHistory();

  test('Render Loading... when applicant value is null', () => {
    const handleClose = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantValueAlignment applicant={null} handleClose={handleClose} />
      </Router>
    );
    expect(getByTestId('loading')).toBeInTheDocument();
  });

  test('Render component', () => {
    const handleClose = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantValueAlignment
          applicant={applicantProfile}
          handleClose={handleClose}
        />
      </Router>
    );
    expect(getByTestId('page_header')).toBeInTheDocument();
    expect(getByTestId('page_header')).toHaveTextContent('Value Alignment');

    expect(getByTestId('question1')).toBeInTheDocument();
    expect(getByTestId('question1')).toHaveTextContent(
      'Why is racial equity work in Baltimore important to you?'
    );

    expect(getByTestId('question2')).toBeInTheDocument();
    expect(getByTestId('question2')).toHaveTextContent(
      'How has your background and experiences prepared you for today’s work in Baltimore’s social impact sector? *'
    );

    expect(getByTestId('answer1')).toBeInTheDocument();
    expect(getByTestId('answer1')).toHaveTextContent('Some text 12');

    expect(getByTestId('answer2')).toBeInTheDocument();
    expect(getByTestId('answer2')).toHaveTextContent('Something else 2');
  });

  test('Render component', () => {
    const handleClose = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantValueAlignment
          applicant={applicantProfile}
          handleClose={handleClose}
        />
      </Router>
    );
    expect(getByTestId('page_header')).toBeInTheDocument();
    expect(getByTestId('page_header')).toHaveTextContent('Value Alignment');

    expect(getByTestId('contact_short')).toBeInTheDocument();
    expect(getByTestId('contact_name')).toBeInTheDocument();
    expect(getByTestId('contact_email')).toBeInTheDocument();
    expect(getByTestId('contact_phone')).toBeInTheDocument();
    expect(getByTestId('contact_profile')).toBeInTheDocument();

    expect(getByTestId('question1')).toBeInTheDocument();
    expect(getByTestId('question1')).toHaveTextContent(
      'Why is racial equity work in Baltimore important to you?'
    );

    expect(getByTestId('question2')).toBeInTheDocument();
    expect(getByTestId('question2')).toHaveTextContent(
      'How has your background and experiences prepared you for today’s work in Baltimore’s social impact sector? *'
    );

    expect(getByTestId('answer1')).toBeInTheDocument();
    expect(getByTestId('answer1')).toHaveTextContent('Some text 12');

    expect(getByTestId('answer2')).toBeInTheDocument();
    expect(getByTestId('answer2')).toHaveTextContent('Something else 2');

    expect(getByTestId('close_button')).toBeInTheDocument();
    expect(getByTestId('back_button')).toBeInTheDocument();
  });

  test("Click Back Button: back to Applicant's Page", () => {
    const handleClose = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantValueAlignment
          applicant={applicantProfile}
          handleClose={handleClose}
        />
      </Router>
    );

    expect(getByTestId('back_button')).toBeInTheDocument();
    fireEvent.click(getByTestId('back_button'));
    expect(handleClose.mock.calls.length).toBe(1);
  });

  test("Click Close Button: back to Applicant's Page", () => {
    const handleClose = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantValueAlignment
          applicant={applicantProfile}
          handleClose={handleClose}
        />
      </Router>
    );

    expect(getByTestId('close_button')).toBeInTheDocument();
    fireEvent.click(getByTestId('close_button'));
    expect(handleClose.mock.calls.length).toBe(1);
  });

  test('Render empty values', () => {
    const handleClose = jest.fn();
    const noAnswerApplicant = {
      ...applicantProfile,
      profile: {
        ...applicantProfile.profile,
        value_question1: null,
        value_question2: null,
      },
    };
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantValueAlignment
          applicant={noAnswerApplicant}
          handleClose={handleClose}
        />
      </Router>
    );

    expect(getByTestId('answer1')).toBeInTheDocument();
    expect(getByTestId('answer1')).toHaveTextContent('-');

    expect(getByTestId('answer2')).toBeInTheDocument();
    expect(getByTestId('answer2')).toHaveTextContent('-');
  });
});
