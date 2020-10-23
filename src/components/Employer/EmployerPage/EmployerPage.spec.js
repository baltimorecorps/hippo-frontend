import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmployerPage from './EmployerPage';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const opportunity = {
  applications: [
    {
      contact: {
        first_name: 'Bay1',
        id: 78,
        account_id: 'google-oauth2|105475713561673035322',
      },
      id: '9c975249-0b2b-4237-90a5-03508840935b',
      interest_statement: 'Hello',
      interview_completed: false,
      interview_date: null,
      interview_time: null,
      is_active: true,
      status: 'recommended',
    },
  ],
  gdoc_link: 'https://docs.google.com/document/d/facebook-web-dev',
  id: 'd00d6b43-0b12-4d7f-8099-b105f637b5a5',
  is_active: true,
  org_name: 'Facebook',
  program_id: 1,
  program_name: 'Place for Purpose',
  short_description: 'Develop Facebook application',
  status: 'submitted',
  title: 'Web Developer',
};

describe('Employer Page', () => {
  const history = createMemoryHistory();

  test('Page render and click View Application', () => {
    const {getAllByTestId, getByTestId} = render(
      <Router history={history}>
        <EmployerPage
          opportunity={opportunity}
          getOrgOpportunity={() => jest.fn()}
        />
      </Router>
    );

    expect(getByTestId('employer_page_header')).toBeInTheDocument();
    expect(getByTestId('employer_page_header')).toHaveTextContent('Facebook');

    expect(getByTestId('title')).toBeInTheDocument();
    expect(getByTestId('title')).toHaveTextContent('Web Developer');

    expect(getByTestId('program_name')).toBeInTheDocument();
    expect(getByTestId('program_name')).toHaveTextContent('Place for Purpose');

    expect(getByTestId('short_description')).toBeInTheDocument();
    expect(getByTestId('short_description')).toHaveTextContent(
      'Develop Facebook application'
    );

    expect(getByTestId('google_doc_link')).toBeInTheDocument();
    expect(getByTestId('google_doc_link')).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/facebook-web-dev'
    );

    const applicationStages = getAllByTestId('application_stage');

    expect(applicationStages.length).toBe(4);
    expect(applicationStages[0]).toHaveTextContent('Recommended (1)');
    expect(applicationStages[1]).toHaveTextContent('Interviewing (0)');
    expect(applicationStages[2]).toHaveTextContent('Finalists for Role (0)');
    expect(applicationStages[3]).toHaveTextContent('Not a Fit (0)');

    fireEvent.click(applicationStages[0]);
    expect(getByTestId('title_or_name')).toBeInTheDocument();
    expect(getByTestId('view_application_button')).toBeInTheDocument();

    fireEvent.click(getByTestId('view_application_button'));
    expect(history.location.pathname).toBe(
      '/opportunities/d00d6b43-0b12-4d7f-8099-b105f637b5a5/contacts/78/employer-review'
    );
  });
});
