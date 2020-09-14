import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApplicantsBoard from './ApplicantsBoard';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {formData} from './defaultValues';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

const filteredContacts = [
  {
    city: 'Baltimore',
    email: 'test1@test.com',
    first_name: 'first1',
    gender: 'Male',
    id: 1,
    job_search_status: 'Curious to see what opportunities are available',
    last_name: 'last1',
    phone_primary: '+1 (111) 111-1111',
    race: ['No Response'],
    state: 'Maryland',
    status: 'approved',
    years_exp: '0-2 years',
  },
  {
    city: 'Arlington',
    email: 'test2@test.com',
    first_name: 'first2',
    gender: 'Female',
    id: 2,
    job_search_status: 'Looking for a job in the next 2-6 months',
    last_name: 'last2',
    phone_primary: '+2 (222) 222-2222',
    race: ['No Response'],
    state: 'Virginia',
    status: 'approved',
    years_exp: '3-5 years',
  },
  {
    city: 'Towson',
    email: 'test3@test.com',
    first_name: 'first3',
    gender: 'Non-Binary',
    id: 3,
    job_search_status: 'Actively looking for a job',
    last_name: 'last3',
    phone_primary: '+3 (333) 333-3333',
    race: ['No Response'],
    state: 'Maryland',
    status: 'submitted',
    years_exp: '5+ years',
  },
];

// To do

// Test that all things are rendered (Nav, toolbar (stuff inside toolbar), data table)
// search by name test
// search by email
// filter
// print

describe('Applicants Board', () => {
  test('Render Applicants Board Components', () => {
    const {getByTestId, getAllByTestId} = render(
      <ApplicantsBoard
        getSubmittedContacts={() => jest.fn()}
        approveNewContactsStatus={() => jest.fn()}
        submittedApplicants={{}}
        addContactsFilters={() => jest.fn()}
        allFilteredContacts={filteredContacts}
        getAllFilteredContacts={() => jest.fn()}
        filteredContacts={filteredContacts}
        filterFormData={formData}
        filterCount={0}
      />
    );

    const tableToolbar = getByTestId('table-toolbar');
    const applicantsTable = getByTestId('applicants-table');
    const searchBar = getByTestId('search-bar-input');
    const openApproveFormButton = getByTestId('open-approve-form-button');
    const FilterButton = getByTestId('filter-icon-button');
    const printButton = getByTestId('print-icon-button');
    const tableRow = getAllByTestId('table-row');

    expect(tableToolbar).toBeInTheDocument();
    expect(applicantsTable).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(openApproveFormButton).toBeInTheDocument();
    expect(FilterButton).toBeInTheDocument();
    expect(printButton).toBeInTheDocument();

    expect(tableRow.length).toBe(3);
  });
});
