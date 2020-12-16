import React from 'react';
import {render} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import ApplicantDetails from './ApplicantDetails';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {
  applicantFull,
  applicantFullNoProgramsInterested,
} from 'mockData/applicant';

describe('ApplicantDetails Component', () => {
  const history = createMemoryHistory();

  test('Render Loading... when applicant value is null', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantDetails applicant={null} />
      </Router>
    );
    expect(getByTestId('loading')).toBeInTheDocument();
  });

  test('Render ApplicantDetails Component', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantDetails applicant={applicantFull} />
      </Router>
    );
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

    expect(getByTestId('interested_programs')).toHaveTextContent(
      'Interested programs: Place for Purpose, Fellowship'
    );
  });
  test('Render empty interested programs', () => {
    const hearAboutUsOtherApp = {
      ...applicantFullNoProgramsInterested,
      profile: {
        ...applicantFullNoProgramsInterested.profile,
        hear_about_us_other: 'CCBC',
      },
    };
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicantDetails applicant={hearAboutUsOtherApp} />
      </Router>
    );
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

    expect(getByTestId('interested_programs')).toHaveTextContent(
      'Interested programs: -'
    );
    expect(getByTestId('profile_values1')).toHaveTextContent(
      'Hear about us: School: CCBC'
    );
  });
});
