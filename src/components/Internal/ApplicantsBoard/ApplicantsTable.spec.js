import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApplicantsTable from './ApplicantsTable';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

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

describe('Applicants Table', () => {
  test('Render Applicants Table', () => {
    const {getAllByTestId} = render(
      <ApplicantsTable
        presentApplicants={filteredContacts}
        handleClickOpenFilterForm={() => jest.fn()}
        filterCount={0}
        setShowApproveForm={() => jest.fn()}
        showApproveForm={false}
        filteredContacts={filteredContacts}
        setPresentApplicants={() => jest.fn()}
        getSubmittedContacts={() => jest.fn()}
        approveNewContactsStatus={() => jest.fn()}
        submittedApplicants={() => jest.fn()}
      />
    );

    // test table head data
    const tableHead = getAllByTestId('table-head');

    expect(tableHead.length).toBe(6);

    const head_name = tableHead[0];
    const head_status = tableHead[1];
    const head_location = tableHead[2];
    const head_gender = tableHead[3];
    const head_experience = tableHead[4];
    const head_job_search = tableHead[5];

    expect(head_name).toHaveTextContent('Name');
    expect(head_status).toHaveTextContent('Status');
    expect(head_location).toHaveTextContent('Location');
    expect(head_gender).toHaveTextContent('Gender');
    expect(head_experience).toHaveTextContent('Experience');
    expect(head_job_search).toHaveTextContent('Job Search Status');

    /// Test data display on each row
    const tableRow = getAllByTestId('table-row');

    expect(tableRow.length).toBe(3);

    // first row or first applicant
    expect(tableRow[0].children[0]).toHaveTextContent(
      'first1 last1test1@test.com+1 (111) 111-1111'
    );
    expect(tableRow[0].children[1]).toHaveTextContent('approved');
    expect(tableRow[0].children[2]).toHaveTextContent('Baltimore, Maryland');
    expect(tableRow[0].children[3]).toHaveTextContent('Male');
    expect(tableRow[0].children[4]).toHaveTextContent('0-2 years');
    expect(tableRow[0].children[5]).toHaveTextContent(
      'Curious to see what opportunities are available'
    );

    // second row or second applicant
    expect(tableRow[1].children[0]).toHaveTextContent(
      'first2 last2test2@test.com+2 (222) 222-2222'
    );
    expect(tableRow[1].children[1]).toHaveTextContent('approved');
    expect(tableRow[1].children[2]).toHaveTextContent('Arlington, Virginia');
    expect(tableRow[1].children[3]).toHaveTextContent('Female');
    expect(tableRow[1].children[4]).toHaveTextContent('3-5 years');
    expect(tableRow[1].children[5]).toHaveTextContent(
      'Looking for a job in the next 2-6 months'
    );

    // third row or third applicant
    expect(tableRow[2].children[0]).toHaveTextContent(
      'first3 last3test3@test.com+3 (333) 333-3333'
    );
    expect(tableRow[2].children[1]).toHaveTextContent('submitted');
    expect(tableRow[2].children[2]).toHaveTextContent('Towson, Maryland');
    expect(tableRow[2].children[3]).toHaveTextContent('Non-Binary');
    expect(tableRow[2].children[4]).toHaveTextContent('5+ years');
    expect(tableRow[2].children[5]).toHaveTextContent(
      'Actively looking for a job'
    );
  });

  test('Applicants Table: sorting data in the table', () => {
    const {getAllByTestId} = render(
      <ApplicantsTable
        presentApplicants={filteredContacts}
        handleClickOpenFilterForm={() => jest.fn()}
        filterCount={0}
        setShowApproveForm={() => jest.fn()}
        showApproveForm={false}
        filteredContacts={filteredContacts}
        setPresentApplicants={() => jest.fn()}
        getSubmittedContacts={() => jest.fn()}
        approveNewContactsStatus={() => jest.fn()}
        submittedApplicants={() => jest.fn()}
      />
    );

    // test table head data
    const tableHead = getAllByTestId('table-head');

    expect(tableHead.length).toBe(6);

    const head_name = tableHead[0];
    const head_status = tableHead[1];
    const head_location = tableHead[2];
    const head_gender = tableHead[3];
    const head_experience = tableHead[4];
    const head_job_search = tableHead[5];

    expect(head_name).toHaveTextContent('Name');
    expect(head_status).toHaveTextContent('Status');
    expect(head_location).toHaveTextContent('Location');
    expect(head_gender).toHaveTextContent('Gender');
    expect(head_experience).toHaveTextContent('Experience');
    expect(head_job_search).toHaveTextContent('Job Search Status');

    /// Test data display on each row
    expect(getAllByTestId('name').length).toBe(3);

    // sort name descending
    fireEvent.click(head_name);
    expect(getAllByTestId('name')[0]).toHaveTextContent(
      'first3 last3test3@test.com+3 (333) 333-3333'
    );
    expect(getAllByTestId('name')[1]).toHaveTextContent(
      'first2 last2test2@test.com+2 (222) 222-2222'
    );
    expect(getAllByTestId('name')[2]).toHaveTextContent(
      'first1 last1test1@test.com+1 (111) 111-1111'
    );

    // sort name ascending
    fireEvent.click(head_name);
    expect(getAllByTestId('name')[0]).toHaveTextContent(
      'first1 last1test1@test.com+1 (111) 111-1111'
    );
    expect(getAllByTestId('name')[1]).toHaveTextContent(
      'first2 last2test2@test.com+2 (222) 222-2222'
    );
    expect(getAllByTestId('name')[2]).toHaveTextContent(
      'first3 last3test3@test.com+3 (333) 333-3333'
    );

    // sort status ascending
    fireEvent.click(head_status);
    expect(getAllByTestId('status')[0]).toHaveTextContent('approved');
    expect(getAllByTestId('status')[1]).toHaveTextContent('approved');
    expect(getAllByTestId('status')[2]).toHaveTextContent('submitted');
    // sort status descending
    fireEvent.click(head_status);
    expect(getAllByTestId('status')[0]).toHaveTextContent('submitted');
    expect(getAllByTestId('status')[1]).toHaveTextContent('approved');
    expect(getAllByTestId('status')[2]).toHaveTextContent('approved');

    // sort location ascending
    fireEvent.click(head_location);
    expect(getAllByTestId('location')[0]).toHaveTextContent(
      'Arlington, Virginia'
    );
    expect(getAllByTestId('location')[1]).toHaveTextContent(
      'Baltimore, Maryland'
    );
    expect(getAllByTestId('location')[2]).toHaveTextContent('Towson, Maryland');

    // sort location descending
    fireEvent.click(head_location);
    expect(getAllByTestId('location')[0]).toHaveTextContent('Towson, Maryland');
    expect(getAllByTestId('location')[1]).toHaveTextContent(
      'Baltimore, Maryland'
    );
    expect(getAllByTestId('location')[2]).toHaveTextContent(
      'Arlington, Virginia'
    );

    // sort gender ascending
    fireEvent.click(head_gender);
    expect(getAllByTestId('gender')[0]).toHaveTextContent('Female');
    expect(getAllByTestId('gender')[1]).toHaveTextContent('Male');
    expect(getAllByTestId('gender')[2]).toHaveTextContent('Non-Binary');
    // sort gender descending
    fireEvent.click(head_gender);
    expect(getAllByTestId('gender')[0]).toHaveTextContent('Non-Binary');
    expect(getAllByTestId('gender')[1]).toHaveTextContent('Male');
    expect(getAllByTestId('gender')[2]).toHaveTextContent('Female');

    // sort experience ascending
    fireEvent.click(head_experience);
    expect(getAllByTestId('experience')[0]).toHaveTextContent('0-2 years');
    expect(getAllByTestId('experience')[1]).toHaveTextContent('3-5 years');
    expect(getAllByTestId('experience')[2]).toHaveTextContent('5+ years');
    // sort experience descending
    fireEvent.click(head_experience);
    expect(getAllByTestId('experience')[0]).toHaveTextContent('5+ years');
    expect(getAllByTestId('experience')[1]).toHaveTextContent('3-5 years');
    expect(getAllByTestId('experience')[2]).toHaveTextContent('0-2 years');

    // sort job_search ascending
    fireEvent.click(head_job_search);
    expect(getAllByTestId('job_search')[0]).toHaveTextContent(
      'Actively looking for a job'
    );
    expect(getAllByTestId('job_search')[1]).toHaveTextContent(
      'Curious to see what opportunities are available'
    );
    expect(getAllByTestId('job_search')[2]).toHaveTextContent(
      'Looking for a job in the next 2-6 months'
    );
    // sort job_search descending
    fireEvent.click(head_job_search);
    expect(getAllByTestId('job_search')[0]).toHaveTextContent(
      'Looking for a job in the next 2-6 months'
    );
    expect(getAllByTestId('job_search')[1]).toHaveTextContent(
      'Curious to see what opportunities are available'
    );
    expect(getAllByTestId('job_search')[2]).toHaveTextContent(
      'Actively looking for a job'
    );
  });

  test('Applicants Table: Clicking on applicant row to go to ApplicantPage', () => {
    const history = createMemoryHistory();

    const {getAllByTestId} = render(
      <Router history={history}>
        <ApplicantsTable
          presentApplicants={filteredContacts}
          handleClickOpenFilterForm={() => jest.fn()}
          filterCount={0}
          setShowApproveForm={() => jest.fn()}
          showApproveForm={false}
          filteredContacts={filteredContacts}
          setPresentApplicants={() => jest.fn()}
          getSubmittedContacts={() => jest.fn()}
          approveNewContactsStatus={() => jest.fn()}
          submittedApplicants={() => jest.fn()}
        />
      </Router>
    );

    const tableRows = getAllByTestId('table-row');
    fireEvent.click(tableRows[0]);
    expect(history.location.pathname).toBe('/internal/applicants/1');
  });
});
