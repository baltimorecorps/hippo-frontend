import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProgramsAndEligibilityForm from './ProgramsAndEligibilityForm';
import {applicantFull} from 'mockData/applicant';
import {default_program_apps} from 'mockData/programApps';

describe('ProgramsAndEligibilityForm', () => {
  test('Render ProgramsAndEligibilityForm', () => {
    const onSubmit = jest.fn();
    const onCloseForm = jest.fn();
    const getAllProgramNames = jest.fn();
    const updateProgramApps = jest.fn();
    const updateAboutMe = jest.fn();
    const refreshDynamicInstructions = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      <ProgramsAndEligibilityForm
        contact={applicantFull}
        defaultProgramApps={default_program_apps}
        getAllProgramNames={getAllProgramNames}
        updateProgramApps={updateProgramApps}
        updateAboutMe={updateAboutMe}
        refreshDynamicInstructions={refreshDynamicInstructions}
        onSubmit={onSubmit}
        onCloseForm={onCloseForm}
      />
    );

    expect(getByTestId('programs_eligibility_form')).toBeInTheDocument();
    expect(getByTestId('form_header')).toBeInTheDocument();
    expect(getByTestId('form_header')).toHaveTextContent(
      'Programs and Eligibility'
    );

    expect(getByTestId('question')).toBeInTheDocument();
    expect(getByTestId('question')).toHaveTextContent(
      'Which of the following programs and services are you interested in? (select all that apply) *'
    );

    expect(getByTestId('close_form_button')).toBeInTheDocument();
    expect(getByTestId('submit_button')).toBeInTheDocument();
  });

  test('Select programs', () => {
    const onCloseForm = jest.fn();
    const getAllProgramNames = jest.fn();
    const updateProgramApps = jest.fn();
    const updateAboutMe = jest.fn();
    const refreshDynamicInstructions = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      <ProgramsAndEligibilityForm
        contact={applicantFull}
        defaultProgramApps={default_program_apps}
        getAllProgramNames={getAllProgramNames}
        updateProgramApps={updateProgramApps}
        updateAboutMe={updateAboutMe}
        refreshDynamicInstructions={refreshDynamicInstructions}
        onCloseForm={onCloseForm}
      />
    );
    expect(getByTestId('close_form_button')).toBeInTheDocument();
    expect(getByTestId('submit_button')).toBeInTheDocument();
    const options = getAllByTestId('checkbox_option');

    fireEvent.click(options[1]);
    fireEvent.click(options[2]);
    fireEvent.click(getByTestId('submit_button'));

    expect(updateProgramApps.mock.calls.length).toBe(1);
    expect(updateAboutMe.mock.calls.length).toBe(1);
    expect(refreshDynamicInstructions.mock.calls.length).toBe(1);
    expect(onCloseForm.mock.calls.length).toBe(1);
  });
});
