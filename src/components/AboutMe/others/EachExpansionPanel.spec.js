import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import EachExpansionPanel from './EachExpansionPanel';
import ValueAlignmentForm from '../forms/ValueAlignmentForm';
import ValueAlignmentDisplay from '../defaultDisplays/ValueAlignmentDisplay';
import {applicantEmptyProfile} from 'mockData/applicant';

describe('EachExpansionPanel', () => {
  test('Render Value Alignment Display', () => {
    const setExpandPanel = jest.fn();
    const setOpenAboutMeForms = jest.fn();
    const onSubmit = jest.fn();

    const {getAllByTestId, getByTestId, queryByText} = render(
      <EachExpansionPanel
        PanelTextHeader="Value Alignment"
        name="value_alignment"
        isOnEditMode={false}
        expandPanel={false}
        setExpandPanel={setExpandPanel}
        neededAnswer={false}
        content={
          false ? (
            <ValueAlignmentForm
              contact={applicantEmptyProfile}
              onSubmit={onSubmit}
              onCloseForm={setOpenAboutMeForms}
            />
          ) : (
            <ValueAlignmentDisplay
              contact={applicantEmptyProfile}
              onClickEdit={setOpenAboutMeForms}
            />
          )
        }
      />
    );

    expect(getByTestId('header_content')).toBeInTheDocument();
    expect(getByTestId('header_content')).toHaveTextContent('Value Alignment');

    expect(getByTestId('edit_button')).toBeInTheDocument();

    const questions = getAllByTestId('question');
    expect(questions.length).toBe(2);
    const pleaseAnswers = getAllByTestId('please_answer');
    expect(pleaseAnswers.length).toBe(2);

    fireEvent.click(getByTestId('panel_summary'));
    expect(
      queryByText('*Please save or close this form to collapse*')
    ).not.toBeInTheDocument();
  });

  test('Render Value Alignment Form', () => {
    const setExpandPanel = jest.fn();
    const setOpenAboutMeForms = jest.fn();
    const onSubmit = jest.fn();

    const {getAllByTestId, getByTestId, queryByText} = render(
      <EachExpansionPanel
        PanelTextHeader="Value Alignment"
        name="value_alignment"
        isOnEditMode={true}
        expandPanel={false}
        setExpandPanel={setExpandPanel}
        neededAnswer={false}
        content={
          true ? (
            <ValueAlignmentForm
              contact={applicantEmptyProfile}
              onSubmit={onSubmit}
              onCloseForm={setOpenAboutMeForms}
            />
          ) : (
            <ValueAlignmentDisplay
              contact={applicantEmptyProfile}
              onClickEdit={setOpenAboutMeForms}
            />
          )
        }
      />
    );

    expect(getByTestId('form_header')).toBeInTheDocument();
    expect(getByTestId('form_header')).toHaveTextContent('Value Alignment');

    expect(getByTestId('form_description')).toBeInTheDocument();
    expect(getByTestId('form_description')).toHaveTextContent(
      'The questions below help us assess whether or not you are aligned with the core values of our organization and network. For more information on how we define these terms please review this document and our website.'
    );

    expect(getByTestId('close_form_button')).toBeInTheDocument();
    expect(getByTestId('submit_button')).toBeInTheDocument();

    const questions = getAllByTestId('question');
    expect(questions.length).toBe(2);
    const textFields = getAllByTestId('text_field');
    expect(textFields.length).toBe(2);

    // Click close expansion while onEditMode is true
    expect(
      queryByText('*Please save or close this form to collapse*')
    ).not.toBeInTheDocument();

    fireEvent.click(getByTestId('panel_summary'));
    expect(getByTestId('help_text')).toBeInTheDocument();
    expect(getByTestId('help_text')).toHaveTextContent(
      '*Please save or close this form to collapse*'
    );
  });
});
