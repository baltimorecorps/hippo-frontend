import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RoleCards from './RoleCards';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const opportunity = {
  applications: [
    {
      contact: {
        first_name: 'Bay1',
        id: 78,
        account_id: '22',
      },
      id: '5d956e0c-13aa-408a-89f0-478695a67fba',
      interest_statement: 'dfhhgfgh',
      interview_completed: true,
      interview_date: '2020-10-22',
      interview_time: '13:10:17',
      is_active: true,
      status: 'interviewed',
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

const applications = [
  {
    contact: {
      first_name: 'Bay1',
      id: 78,
      account_id: '22',
    },
    id: '5d956e0c-13aa-408a-89f0-478695a67fba',
    interest_statement: 'dfhhgfgh',
    interview_completed: true,
    interview_date: '2020-10-22',
    interview_time: '13:10:17',
    is_active: true,
    status: 'interviewed',
  },
  {
    contact: {
      account_id: '22',
      email: 'bayBC1@baltimorecorps.org',
      first_name: 'Bay2',
      id: 79,
      last_name: 'Chairangsaris',
      phone_primary: '+1 (555) 555-9999',
      status: 'approved',
    },
    id: '81ad5daa-959b-4a26-b4c6-79a29b2cba7e',
    interest_statement: 'sadsadsdfsf',
    interview_completed: true,
    interview_date: '2020-09-24',
    interview_time: '15:15:46',
    is_active: true,
    status: 'considered_for_role',
  },
  {
    contact: {
      account_id: '22',
      email: 'bayBC1@baltimorecorps.org',
      first_name: 'Bay3',
      id: 80,
      last_name: 'Chairangsaris',
      phone_primary: '+1 (555) 555-9999',
      status: 'approved',
    },
    id: '81ad5daa-959b-4a26-b4c6-79a29b2cba7e',
    interest_statement: 'sadsadsdfsf',
    interview_completed: true,
    interview_date: '2020-09-24',
    interview_time: '15:15:46',
    is_active: false,
    status: 'considered_for_role',
  },
  {
    contact: {
      account_id: '22',
      email: 'bayBC1@baltimorecorps.org',
      first_name: 'Bay4',
      id: 81,
      last_name: 'Chairangsaris',
      phone_primary: '+1 (555) 555-9999',
      status: 'approved',
    },
    id: '81ad5daa-959b-4a26-b4c6-79a29b2cba7e',
    interest_statement: 'sadsadsdfsf',
    interview_completed: true,
    interview_date: '2020-09-24',
    interview_time: '15:15:46',
    is_active: true,
    status: 'recommended',
  },
  {
    contact: {
      first_name: 'Bay5',
      id: 82,
      account_id: '22',
    },
    id: '5d956e0c-13aa-408a-89f0-478695a67fba',
    interest_statement: 'dfhhgfgh',
    interview_completed: true,
    interview_date: '2020-10-22',
    interview_time: '13:10:17',
    is_active: true,
    status: 'submitted',
  },
];

describe('Role Card', () => {
  const history = createMemoryHistory();

  test('Render and Click View App on Employer Page', () => {
    const {getAllByTestId, getByTestId} = render(
      <Router history={history}>
        <RoleCards
          page="employer"
          opportunity={opportunity}
          getAllOpportunities={() => jest.fn()}
          applications={applications}
        />
      </Router>
    );

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

    expect(applicationStages.length).toBe(6);
    expect(applicationStages[0]).toHaveTextContent('Recommended (1)');
    expect(applicationStages[1]).toHaveTextContent(
      'Interested in Interview (0)'
    );
    expect(applicationStages[2]).toHaveTextContent('Interviewing (1)');
    expect(applicationStages[3]).toHaveTextContent('Finalists for Role (1)');
    expect(applicationStages[4]).toHaveTextContent('Matched (0)');
    expect(applicationStages[5]).toHaveTextContent('Inactive (1)');

    fireEvent.click(applicationStages[0]);

    const names = getAllByTestId('title_or_name');
    const ViewAppButtons = getAllByTestId('view_application_button');

    expect(names.length).toBe(4);
    expect(names[0]).toHaveTextContent('Bay4');
    expect(names[1]).toHaveTextContent('Bay1');
    expect(names[2]).toHaveTextContent('Bay2');
    expect(names[3]).toHaveTextContent('Bay3');

    expect(ViewAppButtons.length).toBe(4);

    fireEvent.click(ViewAppButtons[0]);
    expect(history.location.pathname).toBe(
      '/opportunities/d00d6b43-0b12-4d7f-8099-b105f637b5a5/contacts/81/employer-review'
    );

    fireEvent.click(ViewAppButtons[1]);
    expect(history.location.pathname).toBe(
      '/opportunities/d00d6b43-0b12-4d7f-8099-b105f637b5a5/contacts/78/employer-review'
    );

    fireEvent.click(ViewAppButtons[2]);
    expect(history.location.pathname).toBe(
      '/opportunities/d00d6b43-0b12-4d7f-8099-b105f637b5a5/contacts/79/employer-review'
    );

    fireEvent.click(ViewAppButtons[3]);
    expect(history.location.pathname).toBe(
      '/opportunities/d00d6b43-0b12-4d7f-8099-b105f637b5a5/contacts/80/employer-review'
    );
  });

  test('Render and Click View App on Internal Opportunities Board', () => {
    const {getAllByTestId, getByTestId} = render(
      <Router history={history}>
        <RoleCards
          page="internal-opportunities-board"
          opportunity={opportunity}
          getAllOpportunities={() => jest.fn()}
          applications={applications}
        />
      </Router>
    );

    expect(getByTestId('title')).toBeInTheDocument();
    expect(getByTestId('title')).toHaveTextContent('Web Developer');

    expect(getByTestId('program_name')).toBeInTheDocument();
    expect(getByTestId('program_name')).toHaveTextContent('Place for Purpose');

    expect(getByTestId('link_to_employer_page')).toBeInTheDocument();

    expect(getByTestId('google_doc_link')).toBeInTheDocument();
    expect(getByTestId('google_doc_link')).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/facebook-web-dev'
    );

    const applicationStages = getAllByTestId('application_stage');

    expect(applicationStages.length).toBe(8);
    expect(applicationStages[0]).toHaveTextContent('Started (0)');
    expect(applicationStages[1]).toHaveTextContent('Submitted (1)');
    expect(applicationStages[2]).toHaveTextContent('Recommended (1)');
    expect(applicationStages[3]).toHaveTextContent(
      'Interested in Interview (0)'
    );
    expect(applicationStages[4]).toHaveTextContent('Interviewing (1)');
    expect(applicationStages[5]).toHaveTextContent('Finalists for Role (1)');
    expect(applicationStages[6]).toHaveTextContent('Matched (0)');
    expect(applicationStages[7]).toHaveTextContent('Inactive (1)');

    fireEvent.click(applicationStages[0]);

    const names = getAllByTestId('title_or_name');
    const ViewAppButtons = getAllByTestId('view_application_button');

    expect(names.length).toBe(5);
    expect(names[0]).toHaveTextContent('Bay5');
    expect(names[1]).toHaveTextContent('Bay4');
    expect(names[2]).toHaveTextContent('Bay1');
    expect(names[3]).toHaveTextContent('Bay2');
    expect(names[4]).toHaveTextContent('Bay3');

    expect(ViewAppButtons.length).toBe(5);

    fireEvent.click(ViewAppButtons[0]);
    expect(history.location.pathname).toBe(
      '/opportunities/d00d6b43-0b12-4d7f-8099-b105f637b5a5/contacts/82/internal-review'
    );

    fireEvent.click(ViewAppButtons[1]);
    expect(history.location.pathname).toBe(
      '/opportunities/d00d6b43-0b12-4d7f-8099-b105f637b5a5/contacts/81/internal-review'
    );

    fireEvent.click(ViewAppButtons[2]);
    expect(history.location.pathname).toBe(
      '/opportunities/d00d6b43-0b12-4d7f-8099-b105f637b5a5/contacts/78/internal-review'
    );

    fireEvent.click(ViewAppButtons[3]);
    expect(history.location.pathname).toBe(
      '/opportunities/d00d6b43-0b12-4d7f-8099-b105f637b5a5/contacts/79/internal-review'
    );

    fireEvent.click(ViewAppButtons[4]);
    expect(history.location.pathname).toBe(
      '/opportunities/d00d6b43-0b12-4d7f-8099-b105f637b5a5/contacts/80/internal-review'
    );
  });

  test('Click link to Employer Page from Internal Opportunities Board', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <RoleCards
          page="internal-opportunities-board"
          opportunity={opportunity}
          getAllOpportunities={() => jest.fn()}
          applications={applications}
        />
      </Router>
    );

    expect(getByTestId('link_to_employer_page')).toBeInTheDocument();
    fireEvent.click(getByTestId('link_to_employer_page'));
    expect(history.location.pathname).toBe(
      '/org/opportunity/d00d6b43-0b12-4d7f-8099-b105f637b5a5'
    );
  });

  test('Render Card Header Color for Mayoral Fellowship Opportunity', () => {
    const MayoralOpp = {...opportunity, program_name: 'Mayoral Fellowship'};
    const {getByTestId} = render(
      <Router history={history}>
        <RoleCards
          page="internal-opportunities-board"
          opportunity={MayoralOpp}
          getAllOpportunities={() => jest.fn()}
          applications={applications}
        />
      </Router>
    );

    expect(getByTestId('role_card_paper')).toHaveClass(
      'RoleCards-mayoralContainerTop-104'
    );
  });

  test('Render Card Header Color for Fellowship Opportunity', () => {
    const FellowshipOpp = {...opportunity, program_name: 'Fellowship'};
    const {getByTestId} = render(
      <Router history={history}>
        <RoleCards
          page="internal-opportunities-board"
          opportunity={FellowshipOpp}
          getAllOpportunities={() => jest.fn()}
          applications={applications}
        />
      </Router>
    );

    expect(getByTestId('role_card_paper')).toHaveClass(
      'RoleCards-fellowshipContainerTop-139'
    );
  });

  test('Render Card Header Color for Inactive Opportunity', () => {
    const InactiveOpp = {...opportunity, is_active: false};
    const {getByTestId} = render(
      <Router history={history}>
        <RoleCards
          page="internal-opportunities-board"
          opportunity={InactiveOpp}
          getAllOpportunities={() => jest.fn()}
          applications={applications}
        />
      </Router>
    );

    expect(getByTestId('role_card_paper')).toHaveClass(
      'RoleCards-inactive-174'
    );
  });
});
