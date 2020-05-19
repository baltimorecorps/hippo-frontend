import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CandidateOpportunitiesPage from './CandidateOpportunitiesPage';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const opportunityArray = [
  {
    org_name: 'Test Org',
    is_active: true,
    id: '1a',
    title: 'Test Title',
    cycle_id: 1,
    gdoc_link: 'https://www.googleDocLink.com',
    program_id: 1,
    short_description: 'Test short description',
    status: 'submitted',
  },
  {
    org_name: 'Test Org 2',
    is_active: true,
    id: '2f',
    title: 'Test Title 2',
    cycle_id: 1,
    gdoc_link: 'https://www.googleDocLink2.com',
    program_id: 1,
    short_description: 'Test short description 2',
    status: 'submitted',
  },
];
// submittedIds is an array of opportunities' id that this applicant has submitted applications
const submittedIds = ['1a', '1b', '1c'];
const contact = {
  id: 1,
  programs: [{program: {id: 1}, is_approved: true}],
};
const mockFunction = jest.fn();

describe('Opportunities Page', () => {
  const history = createMemoryHistory();

  test('Page render correctly', () => {
    const {getAllByTestId, getByTestId, getByText, getAllByText} = render(
      <Router history={history}>
        <CandidateOpportunitiesPage
          opportunities={opportunityArray}
          getAllOpportunities={mockFunction}
          getAllApplications={mockFunction}
          submittedIds={submittedIds}
          contact={contact}
          page="main"
        />
      </Router>
    );
    const pageHeader = getByTestId('page-header');
    const gdocLink = getAllByText('View full description');
    const viewApplicationButton = getByTestId('view-app-btn');
    const applyButton = getByTestId('apply-btn');
    const opportunities = getAllByTestId('opportunity');

    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader).toHaveTextContent('Opportunities');
    expect(opportunities.length).toBe(2);
    expect(viewApplicationButton).toBeInTheDocument();
    expect(applyButton).toBeInTheDocument();
    expect(opportunities[0]).toHaveTextContent('Test Org');
    expect(opportunities[0]).toHaveTextContent('Test Title');
    expect(opportunities[0]).toHaveTextContent('Test short description');
    expect(opportunities[1]).toHaveTextContent('Test Org 2');
    expect(opportunities[1]).toHaveTextContent('Test Title 2');
    expect(opportunities[1]).toHaveTextContent('Test short description 2');
    expect(gdocLink[0]).toHaveAttribute(
      'href',
      'https://www.googleDocLink.com'
    );
    expect(gdocLink[1]).toHaveAttribute(
      'href',
      'https://www.googleDocLink2.com'
    );
  });

  test('Click View Application button on an opportunity', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <CandidateOpportunitiesPage
          opportunities={opportunityArray}
          getAllOpportunities={mockFunction}
          getAllApplications={mockFunction}
          submittedIds={submittedIds}
          contact={contact}
        />
      </Router>
    );
    const viewApplicationButton = getByTestId('view-app-btn');
    expect(viewApplicationButton).toBeInTheDocument();
    fireEvent.click(viewApplicationButton);
    expect(history.location.pathname).toBe('/application/1a/review');
  });

  test('Click Apply button on an opportunity', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <CandidateOpportunitiesPage
          opportunities={opportunityArray}
          getAllOpportunities={mockFunction}
          getAllApplications={mockFunction}
          submittedIds={submittedIds}
          contact={contact}
        />
      </Router>
    );
    const applyButton = getByTestId('apply-btn');
    expect(applyButton).toBeInTheDocument();
    fireEvent.click(applyButton);
    expect(history.location.pathname).toBe('/application/2f');
  });
});
