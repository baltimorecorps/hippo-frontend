import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import ApplicationForm from './ApplicationForm';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {contact} from 'mockData/contact';
import {opportunity} from 'mockData/opportunities';
import {fullDraftApp} from 'mockData/applications';

describe('ApplicationForm', () => {
  test.skip('Render ', () => {
    const history = createMemoryHistory();

    const startApplication = jest.fn();
    const getApplication = jest.fn();
    const updateApplication = jest.fn();
    const submitApplication = jest.fn();
    const getAllOpportunities = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <ApplicationForm
          opportunity={opportunity}
          application={fullDraftApp}
          contact={contact}
          startApplication={startApplication}
          getApplication={getApplication}
          updateApplication={updateApplication}
          submitApplication={submitApplication}
          getAllOpportunities={getAllOpportunities}
        />
      </Router>
    );
    // expect(getAllOpportunities.mock.calls.length).toBe(1);
    // expect(getByTestId('interest_statement')).toBeInTheDocument();
    // expect(getByTestId('add_resume')).toBeInTheDocument();
    // expect(getByTestId('review_application')).toBeInTheDocument();
  });
});
