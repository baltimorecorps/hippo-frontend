import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterApplicantsForm from './FilterApplicantsForm';
import {formData} from './defaultValues';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

describe('Filter Applicants Form', () => {
  test('Render form: Randomly check if all checkboxes are rendered', () => {
    const handleClose = jest.fn();
    const addContactsFilters = jest.fn();
    const {getByTestId} = render(
      <FilterApplicantsForm
        isOpen={true}
        handleClose={handleClose}
        addContactsFilters={addContactsFilters}
        filterFormData={formData}
      />
    );
    const formHeader = getByTestId('form-header');
    expect(formHeader).toBeInTheDocument();
    expect(formHeader).toHaveTextContent('Filter Applicants');

    const checkboxStatusSubmitted = getByTestId(
      'status-submitted'
    ).querySelector('input[type="checkbox"]');
    expect(checkboxStatusSubmitted).toBeInTheDocument();
    expect(checkboxStatusSubmitted).toHaveProperty('checked', false);

    const checkboxProgramAppsFellowship = getByTestId(
      'program_apps-fellowship'
    ).querySelector('input[type="checkbox"]');
    expect(checkboxProgramAppsFellowship).toBeInTheDocument();
    expect(checkboxProgramAppsFellowship).toHaveProperty('checked', false);

    const checkboxPreviousProgramsYes = getByTestId(
      'previous_bcorps_program-yes'
    ).querySelector('input[type="checkbox"]');
    expect(checkboxPreviousProgramsYes).toBeInTheDocument();
    expect(checkboxPreviousProgramsYes).toHaveProperty('checked', false);

    const checkboxYearsExp0_2 = getByTestId(
      'years_exp-zero_to_two_years'
    ).querySelector('input[type="checkbox"]');
    expect(checkboxYearsExp0_2).toBeInTheDocument();
    expect(checkboxYearsExp0_2).toHaveProperty('checked', false);

    const checkboxJobSearchActivelyLooking = getByTestId(
      'job_search_status-actively_looking'
    ).querySelector('input[type="checkbox"]');
    expect(checkboxJobSearchActivelyLooking).toBeInTheDocument();
    expect(checkboxJobSearchActivelyLooking).toHaveProperty('checked', false);

    const checkboxJobStatusPartTime = getByTestId(
      'current_job_status-part_time'
    ).querySelector('input[type="checkbox"]');
    expect(checkboxJobStatusPartTime).toBeInTheDocument();
    expect(checkboxJobStatusPartTime).toHaveProperty('checked', false);

    const checkboxRolesDataAnalysis = getByTestId(
      'roles-data_analysis'
    ).querySelector('input[type="checkbox"]');
    expect(checkboxRolesDataAnalysis).toBeInTheDocument();
    expect(checkboxRolesDataAnalysis).toHaveProperty('checked', false);

    const checkboxProgramsCompletedKiva = getByTestId(
      'programs_completed-kiva'
    ).querySelector('input[type="checkbox"]');
    expect(checkboxProgramsCompletedKiva).toBeInTheDocument();
    expect(checkboxProgramsCompletedKiva).toHaveProperty('checked', false);
  });

  test('Add one filter and submit filter', () => {
    const handleClose = jest.fn();
    const addContactsFilters = jest.fn();
    const {getByTestId, getAllByTestId, getByLabelText} = render(
      <FilterApplicantsForm
        isOpen={true}
        handleClose={handleClose}
        addContactsFilters={addContactsFilters}
        filterFormData={formData}
      />
    );

    const checkboxStatusSubmitted = getByTestId(
      'status-submitted'
    ).querySelector('input[type="checkbox"]');
    expect(checkboxStatusSubmitted).toBeInTheDocument();

    expect(checkboxStatusSubmitted).toHaveProperty('checked', false);
    fireEvent.click(checkboxStatusSubmitted);
    expect(checkboxStatusSubmitted).toHaveProperty('checked', true);
    fireEvent.click(getByTestId('add-filter-button'));
    expect(checkboxStatusSubmitted).toHaveProperty('checked', true);

    expect(addContactsFilters.mock.calls.length).toBe(1);

    const payload = addContactsFilters.mock.calls[0][0];
    const formValues = addContactsFilters.mock.calls[0][1];
    const filterCount = addContactsFilters.mock.calls[0][2];

    expect(payload).toHaveProperty('status');
    expect(payload.status.length).toBe(1);
    expect(payload.status[0]).toBe('submitted');
    expect(filterCount).toBe(1);
    expect(formValues.checkboxes.left[0].options[0].checked).toBe(true);
  });

  test('Add multiple filters: with array of string payload', () => {
    const handleClose = jest.fn();
    const addContactsFilters = jest.fn();
    const {getByTestId, getAllByTestId, getByLabelText} = render(
      <FilterApplicantsForm
        isOpen={true}
        handleClose={handleClose}
        addContactsFilters={addContactsFilters}
        filterFormData={formData}
      />
    );

    const checkboxStatusSubmitted = getByTestId(
      'status-submitted'
    ).querySelector('input[type="checkbox"]');
    const checkboxStatusApproved = getByTestId('status-approved').querySelector(
      'input[type="checkbox"]'
    );
    const checkboxYearsExp0_2 = getByTestId(
      'years_exp-zero_to_two_years'
    ).querySelector('input[type="checkbox"]');

    expect(checkboxStatusSubmitted).toBeInTheDocument();
    expect(checkboxStatusApproved).toBeInTheDocument();
    expect(checkboxYearsExp0_2).toBeInTheDocument();

    expect(checkboxStatusSubmitted).toHaveProperty('checked', false);
    expect(checkboxStatusApproved).toHaveProperty('checked', false);
    expect(checkboxYearsExp0_2).toHaveProperty('checked', false);

    fireEvent.click(checkboxStatusSubmitted);
    fireEvent.click(checkboxStatusApproved);
    fireEvent.click(checkboxYearsExp0_2);

    expect(checkboxStatusSubmitted).toHaveProperty('checked', true);
    expect(checkboxStatusApproved).toHaveProperty('checked', true);
    expect(checkboxYearsExp0_2).toHaveProperty('checked', true);

    fireEvent.click(getByTestId('add-filter-button'));

    expect(checkboxStatusSubmitted).toHaveProperty('checked', true);
    expect(checkboxStatusApproved).toHaveProperty('checked', true);
    expect(checkboxYearsExp0_2).toHaveProperty('checked', true);

    expect(addContactsFilters.mock.calls.length).toBe(1);

    const payload = addContactsFilters.mock.calls[0][0];
    const formValues = addContactsFilters.mock.calls[0][1];
    const filterCount = addContactsFilters.mock.calls[0][2];

    expect(payload).toHaveProperty('status');
    expect(payload).toHaveProperty('years_exp');

    expect(payload.status.length).toBe(2);
    expect(payload.years_exp.length).toBe(1);

    expect(payload.status[0]).toBe('submitted');
    expect(payload.status[1]).toBe('approved');
    expect(payload.years_exp[0]).toBe('0-2 years');

    expect(filterCount).toBe(2);
    expect(formValues.checkboxes.left[0].options[0].checked).toBe(true);
    expect(formValues.checkboxes.left[0].options[1].checked).toBe(true);
    expect(formValues.checkboxes.right[0].options[0].checked).toBe(true);
  });

  test('Add multiple filters: with object of boolean payload', () => {
    const handleClose = jest.fn();
    const addContactsFilters = jest.fn();
    const {getByTestId} = render(
      <FilterApplicantsForm
        isOpen={true}
        handleClose={handleClose}
        addContactsFilters={addContactsFilters}
        filterFormData={formData}
      />
    );

    const checkboxProgramsCompletedFellowship = getByTestId(
      'programs_completed-fellowship'
    ).querySelector('input[type="checkbox"]');
    const checkboxProgramsCompletedKiva = getByTestId(
      'programs_completed-kiva'
    ).querySelector('input[type="checkbox"]');
    const checkboxRolesProgramManagement = getByTestId(
      'roles-program_management'
    ).querySelector('input[type="checkbox"]');

    expect(checkboxProgramsCompletedFellowship).toBeInTheDocument();
    expect(checkboxProgramsCompletedKiva).toBeInTheDocument();
    expect(checkboxRolesProgramManagement).toBeInTheDocument();

    expect(checkboxProgramsCompletedFellowship).toHaveProperty(
      'checked',
      false
    );
    expect(checkboxProgramsCompletedKiva).toHaveProperty('checked', false);
    expect(checkboxRolesProgramManagement).toHaveProperty('checked', false);

    fireEvent.click(checkboxProgramsCompletedFellowship);
    fireEvent.click(checkboxProgramsCompletedKiva);
    fireEvent.click(checkboxRolesProgramManagement);

    expect(checkboxProgramsCompletedFellowship).toHaveProperty('checked', true);
    expect(checkboxProgramsCompletedKiva).toHaveProperty('checked', true);
    expect(checkboxRolesProgramManagement).toHaveProperty('checked', true);

    fireEvent.click(getByTestId('add-filter-button'));

    expect(checkboxProgramsCompletedFellowship).toHaveProperty('checked', true);
    expect(checkboxProgramsCompletedKiva).toHaveProperty('checked', true);
    expect(checkboxRolesProgramManagement).toHaveProperty('checked', true);

    expect(addContactsFilters.mock.calls.length).toBe(1);

    const payload = addContactsFilters.mock.calls[0][0];
    const formValues = addContactsFilters.mock.calls[0][1];
    const filterCount = addContactsFilters.mock.calls[0][2];
    expect(payload).toHaveProperty('programs_completed');
    expect(payload).toHaveProperty('roles');

    expect(Object.values(payload.programs_completed).length).toBe(2);
    expect(Object.values(payload.roles).length).toBe(1);

    expect(payload.programs_completed.fellowship).toBe(true);
    expect(payload.programs_completed.kiva).toBe(true);
    expect(payload.roles.program_management).toBe(true);

    expect(filterCount).toBe(2);

    expect(formValues.checkboxes.left[3].options[0].checked).toBe(true);
    expect(formValues.checkboxes.left[3].options[3].checked).toBe(true);
    expect(formValues.checkboxes.right[3].options[5].checked).toBe(true);
  });
});
