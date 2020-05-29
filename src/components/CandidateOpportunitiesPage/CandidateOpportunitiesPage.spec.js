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
    gdoc_link: 'https://docs.google.com/document/d/FS',
    program_id: 1,
    short_description: 'Test short description',
    status: 'submitted',
    program_name: 'Fellowship',
  },
  {
    org_name: 'Test Org 2',
    is_active: true,
    id: '2f',
    title: 'Test Title 2',
    cycle_id: 1,
    gdoc_link: 'https://docs.google.com/document/d/PFP',
    program_id: 1,
    short_description: 'Test short description 2',
    status: 'submitted',
    program_name: 'Place for Purpose',
  },
  {
    org_name: 'Test Org 3',
    is_active: true,
    id: '2f',
    title: 'Test Title 3',
    cycle_id: 1,
    gdoc_link: 'https://docs.google.com/document/d/MF',
    program_id: 1,
    short_description: 'Test short description 3',
    status: 'submitted',
    program_name: 'Mayoral Fellowship',
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

  test('Page render correctly: Main Page', () => {
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
    const orgNames = getAllByTestId('org-name');
    const programNames = getAllByTestId('program-name');
    const titles = getAllByTestId('title');
    const descriptions = getAllByTestId('description');
    const gdocLinks = getAllByText('View full description');
    const viewApplicationButton = getByTestId('view-app-btn');
    const applyButton = getByTestId('apply-btn');
    const opportunities = getAllByTestId('opportunity');

    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader).toHaveTextContent('Opportunities');
    expect(opportunities.length).toBe(2);
    expect(viewApplicationButton).toBeInTheDocument();
    expect(applyButton).toBeInTheDocument();
    expect(orgNames[0]).toHaveTextContent('Test Org');
    expect(programNames[0]).toHaveTextContent('Fellowship');
    expect(titles[0]).toHaveTextContent('Test Title');
    expect(descriptions[0]).toHaveTextContent('Test short description');
    expect(orgNames[1]).toHaveTextContent('Test Org 2');
    expect(programNames[1]).toHaveTextContent('Place for Purpose');
    expect(titles[1]).toHaveTextContent('Test Title 2');
    expect(descriptions[1]).toHaveTextContent('Test short description 2');
    expect(gdocLinks[0]).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/FS'
    );
    expect(gdocLinks[1]).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/PFP'
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

  test('Page render correctly: Mayoral Fellowship Page', () => {
    const {getAllByTestId, getByTestId, getAllByText} = render(
      <Router history={history}>
        <CandidateOpportunitiesPage
          opportunities={opportunityArray}
          getAllOpportunities={mockFunction}
          getAllApplications={mockFunction}
          submittedIds={submittedIds}
          contact={contact}
          page="Mayoral Fellowship"
        />
      </Router>
    );
    const pageHeader = getByTestId('page-header');
    const orgName = getByTestId('org-name');
    const programName = getByTestId('program-name');
    const title = getByTestId('title');
    const description = getByTestId('description');
    const gdocLink = getAllByText('View full description');
    const applyButton = getByTestId('apply-btn');
    const opportunities = getAllByTestId('opportunity');

    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader).toHaveTextContent('Mayoral Fellowship Opportunities');
    expect(opportunities.length).toBe(1);
    expect(applyButton).toBeInTheDocument();

    expect(orgName).toHaveTextContent('Test Org 3');
    expect(programName).toHaveTextContent('Mayoral Fellowship');
    expect(title).toHaveTextContent('Test Title 3');
    expect(description).toHaveTextContent('Test short description 3');

    expect(opportunities[0]).toHaveTextContent('Test Org 3');
    expect(opportunities[0]).toHaveTextContent('Mayoral Fellowship');
    expect(opportunities[0]).toHaveTextContent('Test Title 3');
    expect(opportunities[0]).toHaveTextContent('Test short description 3');

    expect(gdocLink[0]).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/MF'
    );
  });

  test('Filter Opportunities', () => {
    const history = createMemoryHistory();

    const {getByTestId, getAllByTestId, getByText, getAllByText} = render(
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

    // default show opportunities from Place for Purpose and Fellowship programs
    expect(getAllByTestId('opportunity').length).toBe(2);

    const titles = getAllByTestId('title');
    const orgNames = getAllByTestId('org-name');
    const programNames = getAllByTestId('program-name');
    const shortDescriptions = getAllByTestId('description');
    const gdocLinks = getAllByText('View full description');

    expect(titles[0]).toHaveTextContent('Test Title');
    expect(orgNames[0]).toHaveTextContent('Test Org');
    expect(programNames[0]).toHaveTextContent('Fellowship');
    expect(shortDescriptions[0]).toHaveTextContent('Test short description');
    expect(gdocLinks[0]).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/FS'
    );

    expect(titles[1]).toHaveTextContent('Test Title 2');
    expect(orgNames[1]).toHaveTextContent('Test Org 2');
    expect(programNames[1]).toHaveTextContent('Place for Purpose');
    expect(shortDescriptions[1]).toHaveTextContent('Test short description 2');
    expect(gdocLinks[1]).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/PFP'
    );

    const filterOptions = getByTestId('filter-options');
    expect(filterOptions).toBeInTheDocument();

    const filterAllPrograms = getByTestId('filter-all');
    const filterFellowshipPrograms = getByTestId('filter-Fellowship');
    const filterPlaceForPurposePrograms = getByTestId(
      'filter-Place for Purpose'
    );
    expect(filterAllPrograms).toBeInTheDocument();
    expect(filterFellowshipPrograms).toBeInTheDocument();
    expect(filterPlaceForPurposePrograms).toBeInTheDocument();

    // Test filter only opportunities in Place for Purpose program
    fireEvent.click(filterPlaceForPurposePrograms);

    expect(getAllByTestId('opportunity').length).toBe(1);
    expect(titles[0]).toHaveTextContent('Test Title 2');
    expect(orgNames[0]).toHaveTextContent('Test Org 2');
    expect(programNames[0]).toHaveTextContent('Place for Purpose');
    expect(shortDescriptions[0]).toHaveTextContent('Test short description 2');

    expect(gdocLinks[0]).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/PFP'
    );

    // Test filter only opportunities in Place for Purpose program
    fireEvent.click(filterFellowshipPrograms);
    expect(getAllByTestId('opportunity').length).toBe(1);

    expect(titles[0]).toHaveTextContent('Test Title');
    expect(orgNames[0]).toHaveTextContent('Test Org');
    expect(programNames[0]).toHaveTextContent('Fellowship');
    expect(shortDescriptions[0]).toHaveTextContent('Test short description');

    expect(gdocLinks[0]).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/FS'
    );

    // Test filter all opportunities in PFP and FS program
    fireEvent.click(filterAllPrograms);
    expect(getAllByTestId('opportunity').length).toBe(2);
  });
});
