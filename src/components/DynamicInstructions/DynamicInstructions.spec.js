import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import {blankInstructions} from './defaultValues';
import DynamicInstructions from './DynamicInstructions';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

const completedInstructions = {
  about_me: {
    is_complete: true,
    components: {
      candidate_information: true,
      interests: true,
      programs: true,
      value_alignment: true,
    },
  },
  profile: {
    is_complete: true,
    components: {
      tag_skills: true,
      add_education: true,
      add_experience: {
        is_complete: true,
        components: {tag_skills: true, add_achievements: true},
      },
      add_portfolio: true,
    },
  },
  submit: {is_complete: true},
};

describe('DynamicInstruction', () => {
  test('Render Dynamic Instructions: Loading data', () => {
    const submitProfileForReview = jest.fn();

    const {getByTestId, getAllByTestId} = render(
      <DynamicInstructions
        id={1}
        instructions={null}
        status="created"
        submitProfileForReview={submitProfileForReview}
      />
    );

    expect(getByTestId('loading')).toBeInTheDocument();
  });

  test('Render Dynamic Instructions: Render with status "created" and empty profile', () => {
    const submitProfileForReview = jest.fn();

    const {getByTestId, getAllByTestId} = render(
      <DynamicInstructions
        id={1}
        instructions={blankInstructions}
        status="created"
        submitProfileForReview={submitProfileForReview}
      />
    );
    const instructions = getByTestId('instructions');
    const header1 = getByTestId('submit-profile-header');
    const header2 = getByTestId('apply-opportunities-header');
    const checkboxes = getAllByTestId('instructions-checkbox');
    const submitButton = getByTestId('submit-button');
    expect(instructions).toBeInTheDocument();
    expect(header1).toBeInTheDocument();
    expect(header2).toBeInTheDocument();
    expect(checkboxes.length).toBe(8);

    checkboxes.forEach((box, index) => {
      expect(
        checkboxes[index].querySelector('input[type="checkbox"]')
      ).toHaveProperty('checked', false);
    });

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Submit profile for review');
    expect(submitButton).toBeDisabled();
  });

  test('Render Dynamic Instructions: Render with status "created" and incomplete profile', () => {
    const incompletedInstructions = {
      ...completedInstructions,
      about_me: {
        is_complete: false,
        components: {
          candidate_information: false,
          interests: false,
          programs: false,
          value_alignment: false,
        },
      },
    };
    const submitProfileForReview = jest.fn();

    const {getByTestId, getAllByTestId} = render(
      <DynamicInstructions
        id={1}
        instructions={incompletedInstructions}
        status="created"
        submitProfileForReview={submitProfileForReview}
      />
    );
    const instructions = getByTestId('instructions');
    const header1 = getByTestId('submit-profile-header');
    const header2 = getByTestId('apply-opportunities-header');
    const checkboxes = getAllByTestId('instructions-checkbox');
    const submitButton = getByTestId('submit-button');
    expect(instructions).toBeInTheDocument();
    expect(header1).toBeInTheDocument();
    expect(header2).toBeInTheDocument();
    checkboxes.forEach((box, index) => {
      expect(
        checkboxes[index].querySelector('input[type="checkbox"]')
      ).toHaveProperty('checked', index < 4 ? false : true);
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Submit profile for review');
    expect(submitButton).toBeDisabled();
  });

  test('Render Dynamic Instructions: Render with status "created" and complete profile', () => {
    const submitProfileForReview = jest.fn();

    const {getByTestId, getAllByTestId} = render(
      <DynamicInstructions
        id={1}
        instructions={completedInstructions}
        status="created"
        submitProfileForReview={submitProfileForReview}
      />
    );
    const instructions = getByTestId('instructions');
    const header1 = getByTestId('submit-profile-header');
    const header2 = getByTestId('apply-opportunities-header');
    const checkboxes = getAllByTestId('instructions-checkbox');
    const submitButton = getByTestId('submit-button');
    expect(instructions).toBeInTheDocument();
    expect(header1).toBeInTheDocument();
    expect(header2).toBeInTheDocument();
    checkboxes.forEach((box, index) => {
      expect(
        checkboxes[index].querySelector('input[type="checkbox"]')
      ).toHaveProperty('checked', true);
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Submit profile for review');
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);
    expect(submitProfileForReview.mock.calls.length).toBe(1);
  });

  test('Render Dynamic Instructions: Render with status "submitted" and complete profile', () => {
    const submitProfileForReview = jest.fn();

    const {getByTestId, getAllByTestId} = render(
      <DynamicInstructions
        id={1}
        instructions={completedInstructions}
        status="submitted"
        submitProfileForReview={submitProfileForReview}
      />
    );
    const instructions = getByTestId('instructions');
    const header1 = getByTestId('submit-profile-header');
    const header2 = getByTestId('apply-opportunities-header');
    const checkboxes = getAllByTestId('instructions-checkbox');
    const submitButton = getByTestId('submit-button');
    expect(instructions).toBeInTheDocument();
    expect(header1).toBeInTheDocument();
    expect(header2).toBeInTheDocument();
    checkboxes.forEach((box, index) => {
      expect(
        checkboxes[index].querySelector('input[type="checkbox"]')
      ).toHaveProperty('checked', true);
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Waiting for review');
    expect(submitButton).toBeDisabled();
  });

  test('Render Dynamic Instructions: Render with status "approved" and complete profile', () => {
    const {getByTestId, getAllByTestId} = render(
      <DynamicInstructions
        id={1}
        instructions={completedInstructions}
        status="approved"
        submitProfileForReview={jest.fn()}
      />
    );
    const instructions = getByTestId('instructions');
    const header1 = getByTestId('submit-profile-header');
    const header2 = getByTestId('apply-opportunities-header');
    const checkboxes = getAllByTestId('instructions-checkbox');
    const applyForRolesButton = getByTestId('apply-roles-button');
    expect(instructions).toBeInTheDocument();
    expect(header1).toBeInTheDocument();
    expect(header2).toBeInTheDocument();
    checkboxes.forEach((box, index) => {
      expect(
        checkboxes[index].querySelector('input[type="checkbox"]')
      ).toHaveProperty('checked', true);
    });
    expect(applyForRolesButton).toBeInTheDocument();
    expect(applyForRolesButton).toHaveTextContent('Start applying for roles');
    expect(applyForRolesButton).not.toBeDisabled();
  });
});
