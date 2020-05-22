import React from 'react';
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddOrEditOpportunitiesPage from './AddOrEditOpportunitiesPage';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

const opportunitiesArray = [
  {
    id: '1a',
    org_name: 'FS Org',
    title: 'FS Title',
    program_name: 'Fellowship',
    short_description: 'FS Short description',
    gdoc_link: 'https://docs.google.com/document/d/FS',
    cycle_id: 1,
    program_id: 1,
    is_active: true,
    status: 'submitted',
  },
  {
    id: '1b',
    org_name: '​ PFP Org 1',
    title: 'PFP Title 1',
    program_name: 'Place for Purpose',
    short_description: 'PFP Short description 1',
    gdoc_link: 'https://docs.google.com/document/d/PFP1',
    cycle_id: 1,
    program_id: 1,
    is_active: true,
    status: 'submitted',
  },
  {
    id: '1c',
    org_name: '​ PFP Org 2',
    title: 'PFP Title 2',
    program_name: 'Place for Purpose',
    short_description: 'PFP Short description 2',
    gdoc_link: 'https://docs.google.com/document/d/PFP2',
    cycle_id: 1,
    program_id: 1,
    is_active: false,
    status: 'submitted',
  },
  {
    id: '1d',
    org_name: 'MF Org',
    title: 'MF Title',
    program_name: 'Mayoral Fellowship',
    short_description: 'MF Short description',
    gdoc_link: 'https://docs.google.com/document/d/MF',
    cycle_id: 1,
    program_id: 1,
    is_active: true,
    status: 'submitted',
  },
];

const fellowshipOpps = opportunitiesArray.filter(
  opp => opp.program_name === 'Fellowship'
);
const placeForPurposeOpps = opportunitiesArray.filter(
  opp => opp.program_name === 'Place for Purpose'
);
const mayoralOpps = opportunitiesArray.filter(
  opp => opp.program_name === 'Mayoral Fellowship'
);

describe('AddOrEditOpportunitiesPage: Integration Tests', () => {
  test('Add New Opportunity', () => {
    const history = createMemoryHistory();
    const addOpp = jest.fn();
    const updateOpp = jest.fn();
    const {getByTestId, getAllByTestId, getByLabelText} = render(
      <Router history={history}>
        <AddOrEditOpportunitiesPage
          opportunities={opportunitiesArray}
          getAllOpportunities={jest.fn()}
          addOpportunity={addOpp}
          updateOpportunity={updateOpp}
          deactivateRole={jest.fn()}
          activateRole={jest.fn()}
          fellowshipOpps={fellowshipOpps}
          mayoralOpps={mayoralOpps}
          placeForPurposeOpps={placeForPurposeOpps}
        />
      </Router>
    );
    const pageHeader = getByTestId('page-header');
    const openAddNewOppFormButton = getByTestId('open-add-new-opp-form-btn');

    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader).toHaveTextContent('Add or Edit Opportunities');

    //
    expect(openAddNewOppFormButton).toBeInTheDocument();
    fireEvent.click(openAddNewOppFormButton);

    const formHeader = getByTestId('form-header');
    const select = getByTestId('form-program-name');
    const formSubmitButton = getByTestId('form-submit-button');
    const orgName = getByLabelText(/organization/i);
    const title = getByLabelText(/job title/i);
    const shortDescription = getByLabelText(/short description/i);
    const gDocLink = getByTestId('form-gdoc-link');

    expect(formHeader).toBeInTheDocument();
    expect(formHeader).toHaveTextContent('Add New Opportunity');

    expect(select).toBeInTheDocument();
    expect(orgName).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(shortDescription).toBeInTheDocument();
    expect(gDocLink).toBeInTheDocument();

    fireEvent.click(select);
    fireEvent.change(select, {target: {value: 'Place for Purpose'}});

    fireEvent.change(orgName, {
      target: {value: 'Test Org'},
    });

    fireEvent.change(title, {
      target: {value: 'Test Title'},
    });

    fireEvent.change(shortDescription, {
      target: {value: 'Test description'},
    });

    fireEvent.change(gDocLink, {
      target: {value: 'https://docs.google.com/document/d/test'},
    });

    fireEvent.click(formSubmitButton);
    expect(addOpp.mock.calls.length).toBe(1);
    expect(addOpp.mock.calls[0][0]).toHaveProperty('org_name');
    expect(addOpp.mock.calls[0][0].org_name).toBe('Test Org');
    expect(addOpp.mock.calls[0][0]).toHaveProperty('program_name');
    expect(addOpp.mock.calls[0][0].program_name).toBe('Place for Purpose');
    expect(addOpp.mock.calls[0][0]).toHaveProperty('title');
    expect(addOpp.mock.calls[0][0].title).toBe('Test Title');
    expect(addOpp.mock.calls[0][0]).toHaveProperty('short_description');
    expect(addOpp.mock.calls[0][0].short_description).toBe('Test description');
    expect(addOpp.mock.calls[0][0]).toHaveProperty('gdoc_link');
    expect(addOpp.mock.calls[0][0].gdoc_link).toBe(
      'https://docs.google.com/document/d/test'
    );
  });

  test('Edit Opportunity', () => {
    const history = createMemoryHistory();
    const addOpp = jest.fn();
    const updateOpp = jest.fn();
    const {getByTestId, getAllByTestId, getByLabelText} = render(
      <Router history={history}>
        <AddOrEditOpportunitiesPage
          opportunities={opportunitiesArray}
          getAllOpportunities={jest.fn()}
          addOpportunity={addOpp}
          updateOpportunity={updateOpp}
          deactivateRole={jest.fn()}
          activateRole={jest.fn()}
          fellowshipOpps={fellowshipOpps}
          mayoralOpps={mayoralOpps}
          placeForPurposeOpps={placeForPurposeOpps}
        />
      </Router>
    );

    // default only show opportunities from fellowship program
    const opportunities = getAllByTestId('opportunity');
    expect(opportunities.length).toBe(1);

    const openEditOppFormButton = getByTestId('open-edit-opp-form-btn');
    expect(openEditOppFormButton).toBeInTheDocument();
    expect(openEditOppFormButton).toHaveTextContent(/edit/i);
    fireEvent.click(openEditOppFormButton);

    const formHeader = getByTestId('form-header');
    const select = getByTestId('form-program-name');
    const formSubmitButton = getByTestId('form-submit-button');
    const orgName = getByLabelText(/organization/i);
    const title = getByLabelText(/job title/i);
    const shortDescription = getByLabelText(/short description/i);
    const gDocLink = getByTestId('form-gdoc-link');

    expect(formHeader).toBeInTheDocument();
    expect(formHeader).toHaveTextContent('Update Opportunity');

    expect(select.value).toBe('Fellowship');
    expect(orgName.value).toBe('FS Org');
    expect(title.value).toBe('FS Title');
    expect(shortDescription.value).toBe('FS Short description');
    expect(gDocLink.value).toBe('https://docs.google.com/document/d/FS');

    fireEvent.change(orgName, {
      target: {value: 'Edit Org'},
    });

    fireEvent.change(title, {
      target: {value: 'Edit Title'},
    });

    fireEvent.change(shortDescription, {
      target: {value: 'Edit Short description'},
    });

    fireEvent.change(gDocLink, {
      target: {value: 'https://docs.google.com/document/d/edit'},
    });

    fireEvent.click(formSubmitButton);

    expect(select.value).toBe('Fellowship');
    expect(orgName.value).toBe('Edit Org');
    expect(title.value).toBe('Edit Title');
    expect(shortDescription.value).toBe('Edit Short description');
    expect(gDocLink.value).toBe('https://docs.google.com/document/d/edit');
  });

  test('Filter Opportunities', () => {
    const history = createMemoryHistory();
    const addOpp = jest.fn();
    const updateOpp = jest.fn();
    const {getByTestId, getAllByTestId, getByText, getAllByText} = render(
      <Router history={history}>
        <AddOrEditOpportunitiesPage
          opportunities={opportunitiesArray}
          getAllOpportunities={jest.fn()}
          addOpportunity={addOpp}
          updateOpportunity={updateOpp}
          deactivateRole={jest.fn()}
          activateRole={jest.fn()}
          fellowshipOpps={fellowshipOpps}
          mayoralOpps={mayoralOpps}
          placeForPurposeOpps={placeForPurposeOpps}
        />
      </Router>
    );

    // default only show opportunities from fellowship program
    expect(getAllByTestId('opportunity').length).toBe(1);

    const title = getByTestId('title');
    const orgName = getByTestId('org-name');
    const programName = getByTestId('program-name');
    const shortDescription = getByTestId('description');
    const gdocLink = getByText('View full description');

    expect(title).toHaveTextContent('FS Title');
    expect(orgName).toHaveTextContent('FS Org');
    expect(programName).toHaveTextContent('Fellowship');
    expect(shortDescription).toHaveTextContent('FS Short description');
    expect(gdocLink).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/FS'
    );

    const filterOptions = getByTestId('filter-options');
    expect(filterOptions).toBeInTheDocument();

    const filterAllPrograms = getByTestId('filter-all');
    const filterFellowshipPrograms = getByTestId('filter-fellowship');
    const filterMayoralPrograms = getByTestId('filter-mayoral');
    const filterPlaceForPurposePrograms = getByTestId(
      'filter-place-for-purpose'
    );
    expect(filterAllPrograms).toBeInTheDocument();
    expect(filterFellowshipPrograms).toBeInTheDocument();
    expect(filterMayoralPrograms).toBeInTheDocument();
    expect(filterPlaceForPurposePrograms).toBeInTheDocument();

    // Test filter only opportunities in Mayoral Fellowship program
    fireEvent.click(filterMayoralPrograms);

    expect(getAllByTestId('opportunity').length).toBe(1);
    expect(title).toHaveTextContent('MF Title');
    expect(orgName).toHaveTextContent('MF Org');
    expect(programName).toHaveTextContent('Mayoral Fellowship');
    expect(shortDescription).toHaveTextContent('MF Short description');

    expect(gdocLink).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/MF'
    );

    // Test filter only opportunities in Place for Purpose program
    fireEvent.click(filterPlaceForPurposePrograms);
    expect(getAllByTestId('opportunity').length).toBe(2);

    const titles = getAllByTestId('title');
    const orgNames = getAllByTestId('org-name');
    const programNames = getAllByTestId('program-name');
    const shortDescriptions = getAllByTestId('description');
    const gdocLinks = getAllByText('View full description');

    expect(titles[0]).toHaveTextContent('PFP Title 1');
    expect(orgNames[0]).toHaveTextContent('PFP Org 1');
    expect(programNames[0]).toHaveTextContent('Place for Purpose');
    expect(shortDescriptions[0]).toHaveTextContent('PFP Short description 1');

    expect(gdocLinks[0]).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/PFP1'
    );
    expect(titles[1]).toHaveTextContent('PFP Title 2');
    expect(orgNames[1]).toHaveTextContent('PFP Org 2');
    expect(programNames[1]).toHaveTextContent('Place for Purpose');
    expect(shortDescriptions[1]).toHaveTextContent('PFP Short description 2');

    expect(gdocLinks[1]).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/PFP2'
    );

    // Test filter all opportunities in all program
    fireEvent.click(filterAllPrograms);
    expect(getAllByTestId('opportunity').length).toBe(4);
  });
});
