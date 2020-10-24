import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApplicationStateAccordion from './ApplicationStateAccordion';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const submittedApps = [
  {
    contact: {
      account_id: 'google-oauth2|105475713561673035322',
      email: 'bayBC1@baltimorecorps.org',
      first_name: 'Bay1',
      id: 78,
      last_name: 'Chairangsaris',
      phone_primary: '+1 (555) 555-9999',
      status: 'approved',
    },
    id: 'dfa22fb1-1fce-4f98-a02b-b76105c8db97',
    interest_statement: 'sadsadsad2',
    interview_completed: false,
    interview_date: null,
    interview_time: null,
    is_active: true,
    status: 'submitted',
  },
];

const interviewingApps = [
  {
    contact: {
      account_id: 'auth0|5f7cc9220077930068fb3c16',
      email: 'test1111r@test.com',
      first_name: 'test',
      id: 244,
      last_name: '1111r',
      phone_primary: '+1 (111) 111-1111',
      status: 'approved',
    },
    id: '5d956e0c-13aa-408a-89f0-478695a67fba',
    interest_statement: 'dfhhgfgh',
    interview_completed: true,
    interview_date: '2020-10-22',
    interview_time: '13:10:17',
    is_active: true,
    status: 'interviewed',
  },
];

const opportunity = {
  gdoc_link: 'https://docs.google.com/document/d/Fellowship',
  id: '53129550-5784-400b-9529-a28e45a60e45',
  is_active: true,
  org_name: 'Fellowship Role 4',
  program_id: 3,
  program_name: 'Fellowship',
  short_description: 'Fellowship Role 4',
  status: 'submitted',
  title: 'Fellowship Role 4',
};

describe('Application State Accordion Component: page = internal-opportunities-board', () => {
  const history = createMemoryHistory();

  test('Render and Click View App on Submitted Applications', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicationStateAccordion
          header="Submitted"
          applications={submittedApps}
          iconName="submitted"
          expanded={false}
          handleChange={() => jest.fn()}
          panelName="Submitted"
          opportunityId={opportunity.id}
          page="internal-opportunities-board"
          isActive={opportunity.is_active}
        />
      </Router>
    );

    const applicationStage = getByTestId('application_stage');

    expect(applicationStage).toBeInTheDocument();
    expect(applicationStage).toHaveTextContent('Submitted (1)');

    fireEvent.click(applicationStage);
    expect(getByTestId('title_or_name')).toBeInTheDocument();
    expect(getByTestId('view_application_button')).toBeInTheDocument();

    fireEvent.click(getByTestId('view_application_button'));
    expect(history.location.pathname).toBe(
      '/opportunities/53129550-5784-400b-9529-a28e45a60e45/contacts/78/internal-review'
    );
  });

  test('Render and Click View App on Recommended Applications', () => {
    const recommendedApps = [{...submittedApps[0], status: 'recommended'}];
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicationStateAccordion
          header="Recommended"
          applications={recommendedApps}
          iconName="recommended"
          expanded={false}
          handleChange={() => jest.fn()}
          panelName="Recommended"
          opportunityId={opportunity.id}
          page="internal-opportunities-board"
          isActive={opportunity.is_active}
        />
      </Router>
    );

    const applicationStage = getByTestId('application_stage');

    expect(applicationStage).toBeInTheDocument();
    expect(applicationStage).toHaveTextContent('Recommended (1)');

    fireEvent.click(applicationStage);
    expect(getByTestId('title_or_name')).toBeInTheDocument();
    expect(getByTestId('view_application_button')).toBeInTheDocument();

    fireEvent.click(getByTestId('view_application_button'));
    expect(history.location.pathname).toBe(
      '/opportunities/53129550-5784-400b-9529-a28e45a60e45/contacts/78/internal-review'
    );
  });

  test('Render and Click View App on Interviewing Applications', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicationStateAccordion
          header="Interviewing"
          applications={interviewingApps}
          iconName="interviewing"
          expanded={false}
          handleChange={() => jest.fn()}
          panelName="Interviewing"
          opportunityId={opportunity.id}
          page="internal-opportunities-board"
          isActive={opportunity.is_active}
        />
      </Router>
    );

    const applicationStage = getByTestId('application_stage');

    expect(applicationStage).toBeInTheDocument();
    expect(applicationStage).toHaveTextContent('Interviewing (1)');

    fireEvent.click(applicationStage);
    expect(getByTestId('title_or_name')).toBeInTheDocument();
    expect(getByTestId('view_application_button')).toBeInTheDocument();
    expect(getByTestId('interview_date')).toBeInTheDocument();
    expect(getByTestId('interview_time')).toBeInTheDocument();
    expect(getByTestId('interview_status')).toBeInTheDocument();

    fireEvent.click(getByTestId('view_application_button'));
    expect(history.location.pathname).toBe(
      '/opportunities/53129550-5784-400b-9529-a28e45a60e45/contacts/244/internal-review'
    );
  });

  test('Render and Click View App on Finalists Applications', () => {
    const consideredApps = [
      {...interviewingApps[0], status: 'considered_for_role'},
    ];
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicationStateAccordion
          header="Finalists for Role"
          applications={consideredApps}
          iconName="Finalists for Role"
          expanded={false}
          handleChange={() => jest.fn()}
          panelName="Finalists for Role"
          opportunityId={opportunity.id}
          page="internal-opportunities-board"
          isActive={opportunity.is_active}
        />
      </Router>
    );

    const applicationStage = getByTestId('application_stage');

    expect(applicationStage).toBeInTheDocument();
    expect(applicationStage).toHaveTextContent('Finalists for Role (1)');

    fireEvent.click(applicationStage);
    expect(getByTestId('title_or_name')).toBeInTheDocument();
    expect(getByTestId('view_application_button')).toBeInTheDocument();
    expect(getByTestId('interview_date')).toBeInTheDocument();
    expect(getByTestId('interview_time')).toBeInTheDocument();
    expect(getByTestId('interview_status')).toBeInTheDocument();

    fireEvent.click(getByTestId('view_application_button'));
    expect(history.location.pathname).toBe(
      '/opportunities/53129550-5784-400b-9529-a28e45a60e45/contacts/244/internal-review'
    );
  });

  test('Render and Click View App on Not a Fit Applications', () => {
    const consideredApps = [{...interviewingApps[0], is_active: false}];
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicationStateAccordion
          header="Not a Fit"
          applications={consideredApps}
          iconName="notAFit"
          expanded={false}
          handleChange={() => jest.fn()}
          panelName="notAFit"
          opportunityId={opportunity.id}
          page="internal-opportunities-board"
          isActive={opportunity.is_active}
        />
      </Router>
    );

    const applicationStage = getByTestId('application_stage');

    expect(applicationStage).toBeInTheDocument();
    expect(applicationStage).toHaveTextContent('Not a Fit (1)');

    fireEvent.click(applicationStage);
    expect(getByTestId('title_or_name')).toBeInTheDocument();
    expect(getByTestId('view_application_button')).toBeInTheDocument();

    fireEvent.click(getByTestId('view_application_button'));
    expect(history.location.pathname).toBe(
      '/opportunities/53129550-5784-400b-9529-a28e45a60e45/contacts/244/internal-review'
    );
  });
});

describe('Application State Accordion Component: page = employer', () => {
  const history = createMemoryHistory();
  test('Render and Click View App on Recommended Applications', () => {
    const recommendedApps = [{...submittedApps[0], status: 'recommended'}];
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicationStateAccordion
          header="Recommended"
          applications={recommendedApps}
          iconName="recommended"
          expanded={false}
          handleChange={() => jest.fn()}
          panelName="Recommended"
          opportunityId={opportunity.id}
          page="employer"
          isActive={opportunity.is_active}
        />
      </Router>
    );

    const applicationStage = getByTestId('application_stage');

    expect(applicationStage).toBeInTheDocument();
    expect(applicationStage).toHaveTextContent('Recommended (1)');

    fireEvent.click(applicationStage);
    expect(getByTestId('title_or_name')).toBeInTheDocument();
    expect(getByTestId('view_application_button')).toBeInTheDocument();

    fireEvent.click(getByTestId('view_application_button'));
    expect(history.location.pathname).toBe(
      '/opportunities/53129550-5784-400b-9529-a28e45a60e45/contacts/78/employer-review'
    );
  });

  test('Render and Click View App on Interviewing Applications', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicationStateAccordion
          header="Interviewing"
          applications={interviewingApps}
          iconName="interviewing"
          expanded={false}
          handleChange={() => jest.fn()}
          panelName="Interviewing"
          opportunityId={opportunity.id}
          page="employer"
          isActive={opportunity.is_active}
        />
      </Router>
    );

    const applicationStage = getByTestId('application_stage');

    expect(applicationStage).toBeInTheDocument();

    expect(applicationStage).toHaveTextContent('Interviewing (1)');

    fireEvent.click(applicationStage);
    expect(getByTestId('title_or_name')).toBeInTheDocument();
    expect(getByTestId('view_application_button')).toBeInTheDocument();
    expect(getByTestId('interview_date')).toBeInTheDocument();
    expect(getByTestId('interview_time')).toBeInTheDocument();
    expect(getByTestId('interview_status')).toBeInTheDocument();

    fireEvent.click(getByTestId('view_application_button'));
    expect(history.location.pathname).toBe(
      '/opportunities/53129550-5784-400b-9529-a28e45a60e45/contacts/244/employer-review'
    );
  });

  test('Render and Click View App on Finalists Applications', () => {
    const consideredApps = [
      {...interviewingApps[0], status: 'considered_for_role'},
    ];
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicationStateAccordion
          header="Finalists for Role"
          applications={consideredApps}
          iconName="Finalists for Role"
          expanded={false}
          handleChange={() => jest.fn()}
          panelName="Finalists for Role"
          opportunityId={opportunity.id}
          page="employer"
          isActive={opportunity.is_active}
        />
      </Router>
    );

    const applicationStage = getByTestId('application_stage');

    expect(applicationStage).toBeInTheDocument();
    expect(applicationStage).toHaveTextContent('Finalists for Role (1)');

    fireEvent.click(applicationStage);
    expect(getByTestId('title_or_name')).toBeInTheDocument();
    expect(getByTestId('view_application_button')).toBeInTheDocument();
    expect(getByTestId('interview_date')).toBeInTheDocument();
    expect(getByTestId('interview_time')).toBeInTheDocument();
    expect(getByTestId('interview_status')).toBeInTheDocument();

    fireEvent.click(getByTestId('view_application_button'));
    expect(history.location.pathname).toBe(
      '/opportunities/53129550-5784-400b-9529-a28e45a60e45/contacts/244/employer-review'
    );
  });

  test('Render and Click View App on Not a Fit Applications', () => {
    const consideredApps = [{...interviewingApps[0], is_active: false}];
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicationStateAccordion
          header="Not a Fit"
          applications={consideredApps}
          iconName="notAFit"
          expanded={false}
          handleChange={() => jest.fn()}
          panelName="notAFit"
          opportunityId={opportunity.id}
          page="employer"
          isActive={opportunity.is_active}
        />
      </Router>
    );

    const applicationStage = getByTestId('application_stage');

    expect(applicationStage).toBeInTheDocument();
    expect(applicationStage).toHaveTextContent('Not a Fit (1)');

    fireEvent.click(applicationStage);
    expect(getByTestId('title_or_name')).toBeInTheDocument();
    expect(getByTestId('view_application_button')).toBeInTheDocument();

    fireEvent.click(getByTestId('view_application_button'));
    expect(history.location.pathname).toBe(
      '/opportunities/53129550-5784-400b-9529-a28e45a60e45/contacts/244/employer-review'
    );
  });
});
