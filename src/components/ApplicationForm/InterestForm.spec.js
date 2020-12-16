import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InterestForm from './InterestForm';
import {opportunity} from 'mockData/opportunities';
import {fullDraftApp} from 'mockData/applications';

describe('InterestForm', () => {
  test('Render InterestForm', () => {
    const back = jest.fn();
    const next = jest.fn();

    const {getByTestId, queryByText} = render(
      <InterestForm
        startText=""
        back={back}
        next={next}
        opportunity={opportunity}
        application={fullDraftApp}
      />
    );

    expect(getByTestId('interest_statement')).toBeInTheDocument();
    expect(getByTestId('opp_title')).toBeInTheDocument();
    expect(getByTestId('opp_org')).toBeInTheDocument();
    expect(getByTestId('opp_description')).toBeInTheDocument();

    expect(getByTestId('interest_statement_text_field')).toBeInTheDocument();
    expect(getByTestId('error')).toBeInTheDocument();

    expect(getByTestId('interest_statement_text_field').value).toBe('');

    fireEvent.change(getByTestId('interest_statement_text_field'), {
      target: {value: 'Adding interest statement'},
    });
    expect(getByTestId('interest_statement_text_field').value).toBe(
      'Adding interest statement'
    );
    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(queryByText('Next')).toBeInTheDocument();
    fireEvent.click(queryByText('Next'));
    expect(next.mock.calls.length).toBe(1);
  });
});
