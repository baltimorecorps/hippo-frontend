import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import ApplicantPage from './ApplicantPage';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {applicantFull} from 'mockData/applicant';

import {mixedFullApplications} from 'mockData/applications';

describe('ApplicantPage Component', () => {
  const history = createMemoryHistory();

  test('Render Loading... when applicant and applications are null', () => {
    const getContact = jest.fn();
    const getContactApplications = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantPage
          contactId={78}
          applications={null}
          applicant={null}
          getContactApplications={getContactApplications}
          getContact={getContact}
        />
      </Router>
    );
    expect(getByTestId('loading')).toBeInTheDocument();
    expect(getContact.mock.calls.length).toBe(1);
    expect(getContactApplications.mock.calls.length).toBe(1);
  });

  test('Render Applicant Page', () => {
    const getContact = jest.fn();
    const getContactApplications = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantPage
          contactId={78}
          applications={mixedFullApplications}
          applicant={applicantFull}
          getContactApplications={getContactApplications}
          getContact={getContact}
        />
      </Router>
    );
    expect(getByTestId('applicant_page')).toBeInTheDocument();
    expect(getByTestId('partnerships_navbar')).toBeInTheDocument();
    expect(getByTestId('back_to_applicants_board_button')).toBeInTheDocument();
    expect(getByTestId('applicant_page_content')).toBeInTheDocument();

    expect(getByTestId('applicant_details')).toBeInTheDocument();

    expect(getByTestId('contact_short')).toBeInTheDocument();
    expect(getByTestId('contact_name')).toBeInTheDocument();
    expect(getByTestId('contact_email')).toBeInTheDocument();
    expect(getByTestId('contact_phone')).toBeInTheDocument();
    expect(getByTestId('contact_profile_link')).toBeInTheDocument();

    expect(getByTestId('status_and_location')).toBeInTheDocument();
    expect(getByTestId('profile_values1')).toBeInTheDocument();
    expect(getByTestId('profile_values2')).toBeInTheDocument();
    expect(getByTestId('interested_roles')).toBeInTheDocument();
    expect(getByTestId('interested_programs')).toBeInTheDocument();
    expect(getByTestId('have_participated_programs')).toBeInTheDocument();

    expect(getByTestId('see_value_alignment_button')).toBeInTheDocument();
    expect(getByTestId('see_value_alignment_button')).toHaveTextContent(
      'Value Alignment'
    );

    expect(getByTestId('applications_card')).toBeInTheDocument();
  });

  test('Click back to Applicants Board', () => {
    const getContact = jest.fn();
    const getContactApplications = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantPage
          contactId={78}
          applications={mixedFullApplications}
          applicant={applicantFull}
          getContactApplications={getContactApplications}
          getContact={getContact}
        />
      </Router>
    );
    expect(getByTestId('applicant_page')).toBeInTheDocument();

    expect(getByTestId('back_to_applicants_board_button')).toBeInTheDocument();

    fireEvent.click(getByTestId('back_to_applicants_board_button'));
    expect(history.location.pathname).toBe('/internal/applicants-board');
  });

  test('Click to open and close Value Alignment', () => {
    const getContact = jest.fn();
    const getContactApplications = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <ApplicantPage
          contactId={78}
          applications={mixedFullApplications}
          applicant={applicantFull}
          getContactApplications={getContactApplications}
          getContact={getContact}
        />
      </Router>
    );
    expect(getByTestId('applicant_page')).toBeInTheDocument();
    expect(getByTestId('see_value_alignment_button')).toBeInTheDocument();
    expect(
      queryByText('Why is racial equity work in Baltimore important to you?')
    ).not.toBeInTheDocument();

    fireEvent.click(getByTestId('see_value_alignment_button'));
    expect(
      queryByText('Why is racial equity work in Baltimore important to you?')
    ).toBeInTheDocument();

    expect(getByTestId('close_button')).toBeInTheDocument();
    fireEvent.click(getByTestId('close_button'));
    expect(
      queryByText('Why is racial equity work in Baltimore important to you?')
    ).not.toBeInTheDocument();
  });
});
