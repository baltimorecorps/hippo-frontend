import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApplicantsBoard from './ApplicantsBoard';
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

describe('Applicants Board', () => {
  test('Render Applicants Board Components', () => {
    const {getByTestId, getAllByTestId} = render(
      <ApplicantsBoard
        getFilteredContactsSubmitted={() => jest.fn()}
        approveNewContactsStatus={() => jest.fn()}
        submittedApplicants={[]}
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
    const filterButton = getByTestId('filter-icon-button');
    const printButton = getByTestId('print-icon-button');
    const tableRow = getAllByTestId('table-row');

    expect(tableToolbar).toBeInTheDocument();
    expect(applicantsTable).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(openApproveFormButton).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    expect(printButton).toBeInTheDocument();

    expect(tableRow.length).toBe(3);
  });

  test('Applicants Board: Search by name or email', () => {
    const {getByTestId, getAllByTestId, getByRole} = render(
      <ApplicantsBoard
        getFilteredContactsSubmitted={() => jest.fn()}
        approveNewContactsStatus={() => jest.fn()}
        submittedApplicants={[]}
        addContactsFilters={() => jest.fn()}
        allFilteredContacts={filteredContacts}
        getAllFilteredContacts={() => jest.fn()}
        filteredContacts={filteredContacts}
        filterFormData={formData}
        filterCount={0}
      />
    );

    const searchBar = getByRole('textbox');

    expect(getAllByTestId('table-row').length).toBe(3);

    // Search by name
    fireEvent.change(searchBar, {target: {value: 'first1'}});
    expect(getAllByTestId('table-row').length).toBe(1);

    fireEvent.change(searchBar, {target: {value: 'first'}});
    expect(getAllByTestId('table-row').length).toBe(3);

    fireEvent.change(searchBar, {target: {value: 'David'}});
    expect(getByTestId('no-result')).toBeInTheDocument();

    // Search by email
    fireEvent.change(searchBar, {target: {value: 'test2'}});
    expect(getAllByTestId('table-row').length).toBe(1);

    fireEvent.change(searchBar, {target: {value: 'test.com'}});
    expect(getAllByTestId('table-row').length).toBe(3);

    fireEvent.change(searchBar, {target: {value: 'gmail.com'}});
    expect(getByTestId('no-result')).toBeInTheDocument();
  });

  test('Applicants Board: Open approve applicants form', () => {
    const {getByTestId, queryByText} = render(
      <ApplicantsBoard
        getFilteredContactsSubmitted={() => jest.fn()}
        approveNewContactsStatus={() => jest.fn()}
        submittedApplicants={[]}
        addContactsFilters={() => jest.fn()}
        allFilteredContacts={filteredContacts}
        getAllFilteredContacts={() => jest.fn()}
        filteredContacts={filteredContacts}
        filterFormData={formData}
        filterCount={0}
      />
    );

    const openApproveFormButton = getByTestId('open-approve-form-button');

    expect(queryByText('Approve New Applicants')).not.toBeInTheDocument();
    fireEvent.click(openApproveFormButton);
    expect(queryByText('Approve New Applicants')).toBeInTheDocument();
  });

  test('Applicants Board: Filter Applicants', () => {
    const addContactsFilters = jest.fn();
    const {getByTestId, queryByText} = render(
      <ApplicantsBoard
        getFilteredContactsSubmitted={() => jest.fn()}
        approveNewContactsStatus={() => jest.fn()}
        submittedApplicants={[]}
        addContactsFilters={addContactsFilters}
        allFilteredContacts={filteredContacts}
        getAllFilteredContacts={() => jest.fn()}
        filteredContacts={filteredContacts}
        filterFormData={formData}
        filterCount={0}
      />
    );

    const filterButton = getByTestId('filter-icon-button');
    expect(queryByText('Filter Applicants')).not.toBeInTheDocument();
    fireEvent.click(filterButton);
    expect(queryByText('Filter Applicants')).toBeInTheDocument();

    const checkboxStatusApproved = getByTestId('status-approved').querySelector(
      'input[type="checkbox"]'
    );

    expect(checkboxStatusApproved).toHaveProperty('checked', false);

    fireEvent.click(checkboxStatusApproved);
    expect(checkboxStatusApproved).toHaveProperty('checked', true);

    fireEvent.click(getByTestId('add-filter-button'));

    expect(addContactsFilters.mock.calls.length).toBe(1);
    expect(addContactsFilters.mock.calls[0].length).toBe(3);
    expect(addContactsFilters.mock.calls[0][0].status.length).toBe(1);
    expect(addContactsFilters.mock.calls[0][0].status[0]).toBe('approved');
  });

  test('Applicants Board: Print Applicants', () => {
    const {getByTestId} = render(
      <ApplicantsBoard
        getFilteredContactsSubmitted={() => jest.fn()}
        approveNewContactsStatus={() => jest.fn()}
        submittedApplicants={[]}
        addContactsFilters={() => jest.fn()}
        allFilteredContacts={filteredContacts}
        getAllFilteredContacts={() => jest.fn()}
        filteredContacts={filteredContacts}
        filterFormData={formData}
        filterCount={0}
      />
    );

    const printButton = getByTestId('print-icon-button');
    fireEvent.click(printButton);

    // const printWindow = document.getElementById('printWindow');
    // expect(printWindow).toBeInTheDocument();
  });
});
