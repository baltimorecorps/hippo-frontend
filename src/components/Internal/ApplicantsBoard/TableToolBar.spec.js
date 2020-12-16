import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import TableToolBar from './TableToolBar';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('Table Tool Bar Component', () => {
  const history = createMemoryHistory();

  test('Render Component', () => {
    const handleClickOpenFilterForm = jest.fn();
    const resetFilterCount = jest.fn();
    const setShowApproveForm = jest.fn();
    const setPresentApplicants = jest.fn();
    const getFilteredContactsSubmitted = jest.fn();
    const approveNewContactsStatus = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <TableToolBar
          print={<div></div>}
          handleClickOpenFilterForm={handleClickOpenFilterForm}
          filterCount={0}
          resetFilterCount={resetFilterCount}
          setShowApproveForm={setShowApproveForm}
          allFilteredContacts={[]}
          showApproveForm={false}
          setPresentApplicants={setPresentApplicants}
          getFilteredContactsSubmitted={getFilteredContactsSubmitted}
          approveNewContactsStatus={approveNewContactsStatus}
          submittedApplicants={[]}
          searchableApplicants={[]}
        />
      </Router>
    );

    expect(getByTestId('table-toolbar')).toBeInTheDocument();
    expect(getByTestId('search-bar-input')).toBeInTheDocument();
    expect(getByTestId('open-approve-form-button')).toBeInTheDocument();
    expect(getByTestId('filter-icon-button')).toBeInTheDocument();
    expect(getByTestId('print-icon-button')).toBeInTheDocument();
  });

  test('Click Approve Form Button', () => {
    const handleClickOpenFilterForm = jest.fn();
    const resetFilterCount = jest.fn();
    const setShowApproveForm = jest.fn();
    const setPresentApplicants = jest.fn();
    const getFilteredContactsSubmitted = jest.fn();
    const approveNewContactsStatus = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <TableToolBar
          print={<div></div>}
          handleClickOpenFilterForm={handleClickOpenFilterForm}
          filterCount={0}
          resetFilterCount={resetFilterCount}
          setShowApproveForm={setShowApproveForm}
          allFilteredContacts={[]}
          showApproveForm={false}
          setPresentApplicants={setPresentApplicants}
          getFilteredContactsSubmitted={getFilteredContactsSubmitted}
          approveNewContactsStatus={approveNewContactsStatus}
          submittedApplicants={[]}
          searchableApplicants={[]}
        />
      </Router>
    );

    expect(getByTestId('open-approve-form-button')).toBeInTheDocument();

    fireEvent.click(getByTestId('open-approve-form-button'));
    expect(setShowApproveForm.mock.calls.length).toBe(1);
  });
});
