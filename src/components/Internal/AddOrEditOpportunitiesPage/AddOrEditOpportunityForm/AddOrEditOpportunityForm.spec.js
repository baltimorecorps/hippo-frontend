import React from 'react';
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddOrEditOpportunityForm from './AddOrEditOpportunityForm';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

const opportunityValid = {
  id: '1a',
  org_name: 'Test Org',
  title: 'Test Title',
  program_name: 'Fellowship',
  short_description: 'Short description',
  gdoc_link: 'www.google.com',
};
const blankOpportunity = {
  id: '',
  org_name: '',
  title: '',
  program_name: null,
  short_description: '',
  gdoc_link: '',
};

describe('AddOrEditOpportunityForm', () => {
  test('Add new opportunity: valid value', () => {
    const submit = jest.fn();
    const closeForm = jest.fn();
    const {getByTestId, getByLabelText} = render(
      <AddOrEditOpportunityForm
        opportunity={blankOpportunity}
        type="add"
        onSubmit={submit}
        closeForm={closeForm}
      />
    );
    const select = getByTestId('program-name');
    expect(select).toBeInTheDocument();

    fireEvent.click(select);

    fireEvent.change(select, {target: {value: 'Place for Purpose'}});
    expect(select.value).toBe('Place for Purpose');

    fireEvent.change(getByLabelText(/organization/i), {
      target: {value: 'Test Org'},
    });

    fireEvent.change(getByLabelText(/job title/i), {
      target: {value: 'Test Title'},
    });

    fireEvent.change(getByLabelText(/short description/i), {
      target: {value: 'Test description'},
    });
    fireEvent.change(getByTestId('gdoc-link'), {
      target: {value: 'https://docs.google.com/document/d/test'},
    });

    fireEvent.click(getByTestId('submit-button'));

    expect(submit.mock.calls.length).toBe(1);
    console.log(submit.mock.calls[0]);
    expect(submit.mock.calls[0][0]).toHaveProperty('org_name');
    expect(submit.mock.calls[0][0].org_name).toBe('Test Org');
    expect(submit.mock.calls[0][0]).toHaveProperty('program_name');
    expect(submit.mock.calls[0][0].program_name).toBe('Place for Purpose');
    expect(submit.mock.calls[0][0]).toHaveProperty('title');
    expect(submit.mock.calls[0][0].title).toBe('Test Title');
    expect(submit.mock.calls[0][0]).toHaveProperty('short_description');
    expect(submit.mock.calls[0][0].short_description).toBe('Test description');
    expect(submit.mock.calls[0][0]).toHaveProperty('gdoc_link');
    expect(submit.mock.calls[0][0].gdoc_link).toBe(
      'https://docs.google.com/document/d/test'
    );
  });

  test('Add new opportunity: empty/invalid value (test form validation)', () => {
    const submit = jest.fn();
    const closeForm = jest.fn();
    const {getByTestId, getAllByTestId, getByLabelText} = render(
      <AddOrEditOpportunityForm
        opportunity={blankOpportunity}
        type="add"
        onSubmit={submit}
        closeForm={closeForm}
      />
    );
    const select = getByTestId('program-name');
    const warnings = getAllByTestId('warning');
    expect(select).toBeInTheDocument();

    fireEvent.click(getByTestId('submit-button'));

    expect(submit.mock.calls.length).toBe(0);

    expect(warnings.length).toBe(5);
    expect(warnings[0]).toHaveTextContent('Required');
    expect(warnings[1]).toHaveTextContent('Required');
    expect(warnings[2]).toHaveTextContent('Required');
    expect(warnings[3]).toHaveTextContent('Required');
    expect(warnings[4]).toHaveTextContent('Required');

    fireEvent.click(select);

    fireEvent.change(select, {target: {value: 'Place for Purpose'}});
    expect(select.value).toBe('Place for Purpose');

    fireEvent.change(getByLabelText(/organization/i), {
      target: {value: 'Test Org'},
    });

    fireEvent.change(getByLabelText(/job title/i), {
      target: {value: 'Test Title'},
    });

    fireEvent.change(getByLabelText(/short description/i), {
      target: {value: 'Test description'},
    });
    fireEvent.change(getByTestId('gdoc-link'), {
      target: {value: 'https:www.google.com'},
    });

    fireEvent.click(getByTestId('submit-button'));

    expect(submit.mock.calls.length).toBe(0);

    expect(warnings[4]).toHaveTextContent(
      'Link must start with "https://docs.google.com/document/d/"'
    );

    fireEvent.change(getByTestId('gdoc-link'), {
      target: {value: 'https://docs.google.com/document/d/test'},
    });

    fireEvent.click(getByTestId('submit-button'));

    expect(submit.mock.calls.length).toBe(1);
  });
});
