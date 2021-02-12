import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApproveNewApplicantForm from './ApproveNewApplicantForm';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

const submittedApplicants = [
  {
    account_id: null,
    id: 50,
    status: 'submitted',
    first_name: 'David',
    last_name: 'Koh',
    email: 'test@david.com',
    phone_primary: '5551234567',
  },
  {
    account_id: null,
    id: 55,
    status: 'submitted',
    first_name: 'Bay',
    last_name: 'Chai',
    email: 'test@bay.com',
    phone_primary: '5551234567',
  },
];

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

describe('Approve New Applicants Form', () => {
  test('Render Applicants Form', async () => {
    const approveNewContactsStatus = jest.fn();
    const {getByTestId, getByText, getByRole} = render(
      <ApproveNewApplicantForm
        submittedApplicants={submittedApplicants}
        getFilteredContactsSubmitted={() => jest.fn()}
        approveNewContactsStatus={approveNewContactsStatus}
        showApproveForm={true}
        setShowApproveForm={() => jest.fn()}
        setPresentApplicants={() => jest.fn()}
        resetFilterCount={() => jest.fn()}
      />
    );

    const formHeader = getByTestId('form-header');
    const approveButton = getByTestId('approve-button');
    const autocomplete = getByRole('textbox');

    expect(formHeader).toBeInTheDocument();
    expect(approveButton).toBeInTheDocument();
    expect(formHeader).toHaveTextContent('Approve New Applicants');

    fireEvent.change(autocomplete, {target: {value: 'David'}});

    const david = getByText('David Koh (test@david.com)');
    fireEvent.click(david);
    fireEvent.change(autocomplete, {target: {value: 'Bay'}});

    const bay = getByText('Bay Chai (test@bay.com)');
    fireEvent.click(bay);
    fireEvent.click(approveButton);

    expect(approveNewContactsStatus).toHaveBeenCalledTimes(1);
    expect(approveNewContactsStatus.mock.calls.length).toBe(1);
    expect(approveNewContactsStatus.mock.calls[0][0][0].id).toBe(50);
    expect(approveNewContactsStatus.mock.calls[0][0][1].id).toBe(55);
  });
});
