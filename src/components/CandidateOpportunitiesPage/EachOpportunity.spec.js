import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EachOpportunity from './EachOpportunity';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const opportunity = {
  org_name: 'Test Org',
  is_active: true,
  id: '1a',
  title: 'Test Title',
  cycle_id: 1,
  gdoc_link: 'https://www.googleDocLink.com',
  program_id: 1,
  short_description: 'Test short description',
  status: 'submitted',
  program_name: 'Place for Purpose',
};
// submittedIds is an array of opportunities' id that this applicant has submitted applications
const submittedIds = ['1a', '1b', '1c'];
const contact = {
  id: 1,
  programs: [{program: {id: 1}, is_approved: true}],
};

const history = createMemoryHistory();
const clickViewApp = jest.fn();
const clickApply = jest.fn();
describe('Opportunities Page', () => {
  test('Page render correctly', () => {
    const {getByTestId, getByText} = render(
      <Router history={history}>
        <EachOpportunity
          opportunity={opportunity}
          contact={contact}
          submittedIds={submittedIds}
          onClickViewAppButton={clickViewApp}
          onClickApplyButton={clickApply}
          audience="candidates"
        />
      </Router>
    );
    const title = getByTestId('title');
    const orgName = getByTestId('org-name');
    const programName = getByTestId('program-name');
    const gdocLink = getByText('View full description');

    expect(title).toBeInTheDocument();
    expect(orgName).toBeInTheDocument();
    expect(title).toHaveTextContent('Test Title');
    expect(orgName).toHaveTextContent('Test Org');
    expect(programName).toHaveTextContent('Place for Purpose');
    expect(gdocLink).toHaveAttribute('href', 'https://www.googleDocLink.com');
  });

  test('Click View Application button on an opportunity', () => {
    const history = createMemoryHistory();
    const clickViewApp = jest.fn();
    const clickApply = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <EachOpportunity
          opportunity={opportunity}
          contact={contact}
          submittedIds={submittedIds}
          onClickViewAppButton={clickViewApp}
          onClickApplyButton={clickApply}
          audience="candidates"
        />
      </Router>
    );

    const viewApplicationButton = getByTestId('view-app-btn');
    expect(viewApplicationButton).toBeInTheDocument();

    expect(clickViewApp.mock.calls.length).toBe(0);
    fireEvent.click(viewApplicationButton);
    expect(clickViewApp.mock.calls.length).toBe(1);
  });

  test('Click Apply button on an opportunity', () => {
    const submittedIds = ['1b', '1c'];

    const {getByTestId} = render(
      <Router history={history}>
        <EachOpportunity
          opportunity={opportunity}
          contact={contact}
          submittedIds={submittedIds}
          onClickViewAppButton={clickViewApp}
          onClickApplyButton={clickApply}
          audience="candidates"
        />
      </Router>
    );

    const applyButton = getByTestId('apply-btn');
    expect(applyButton).toBeInTheDocument();

    expect(clickApply.mock.calls.length).toBe(0);
    fireEvent.click(applyButton);
    expect(clickApply.mock.calls.length).toBe(1);
  });
});
