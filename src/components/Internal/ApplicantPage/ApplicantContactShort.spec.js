import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import ApplicantContactShort from './ApplicantContactShort';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {applicantProfile} from 'mockData/applicant';

describe('ApplicantContactShort Component', () => {
  const history = createMemoryHistory();

  test('Render Loading... when applicant value is null', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantContactShort applicant={null} />
      </Router>
    );
    expect(getByTestId('loading')).toBeInTheDocument();
  });

  test('Render ApplicantContactShort Component', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantContactShort applicant={applicantProfile} />
      </Router>
    );
    expect(getByTestId('contact_short')).toBeInTheDocument();

    expect(getByTestId('contact_name')).toBeInTheDocument();
    expect(getByTestId('contact_name')).toHaveTextContent('Bay1 Chairangsaris');

    expect(getByTestId('contact_email')).toBeInTheDocument();
    expect(getByTestId('contact_email')).toHaveTextContent(
      'bayBC1@baltimorecorps.org'
    );

    expect(getByTestId('contact_phone')).toBeInTheDocument();
    expect(getByTestId('contact_phone')).toHaveTextContent('+1 (555) 555-9999');

    expect(getByTestId('contact_profile_link')).toBeInTheDocument();
    expect(getByTestId('contact_profile_link')).toHaveTextContent(
      'See Profile'
    );
  });

  test("Click to see applicant's profile", () => {
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantContactShort applicant={applicantProfile} />
      </Router>
    );

    expect(getByTestId('contact_profile_link')).toBeInTheDocument();
    expect(getByTestId('contact_profile_link')).toHaveTextContent(
      'See Profile'
    );

    fireEvent.click(getByTestId('contact_profile_link'));
    expect(history.location.pathname).toBe('/profile/78');
  });
});
