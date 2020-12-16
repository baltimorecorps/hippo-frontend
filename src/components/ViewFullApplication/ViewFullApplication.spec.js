import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ViewFullApplication from './ViewFullApplication';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {fullSubmittedApp} from 'mockData/applications';
import {Provider} from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {mockStore} from 'mockData/store';
import {mockTheme} from 'mockData/theme';

const opportunityId = '6098721e-ef4d-4204-87b8-a7a5d0090989';

describe('View Full Application', () => {
  const history = createMemoryHistory();

  test('Render View Full Application Component', () => {
    const getApplication = jest.fn();
    const {getByTestId, getByText} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <ViewFullApplication
            application={fullSubmittedApp}
            contactId={251}
            contact={{
              email: 'bayBC1@baltimorecorps.org',
              first_name: 'Bay1',
              id: 251,
              last_name: 'Chairangsaris',
              phone_primary: '+1 (555) 555-9999',
            }}
            opportunityId={opportunityId}
            getApplication={getApplication}
          />
        </MuiThemeProvider>
      </Provider>
    );

    expect(getByTestId('page_header')).toBeInTheDocument();
    expect(getByTestId('page_header')).toHaveTextContent('Review Application');

    expect(getByTestId('title')).toBeInTheDocument();
    expect(getByTestId('title')).toHaveTextContent('Role 1');

    expect(getByTestId('organization')).toBeInTheDocument();
    expect(getByTestId('organization')).toHaveTextContent('Org 1');

    expect(getByTestId('short_description')).toBeInTheDocument();
    expect(getByTestId('short_description')).toHaveTextContent(
      'Some job description 1'
    );

    expect(getByText('View full description')).toBeInTheDocument();
    expect(getByText('View full description')).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/f'
    );

    expect(getByTestId('interest_statement')).toBeInTheDocument();
    expect(getByTestId('interest_statement')).toHaveTextContent(
      'My interested statement.'
    );

    expect(getByTestId('view_resume')).toBeInTheDocument();
    // expect(getByTestId('resume_header')).toBeInTheDocument();
    // expect(getByTestId('resume_left')).toBeInTheDocument();
    // expect(getByTestId('resume_right')).toBeInTheDocument();
  });

  test('Render Loading and getApplication when no application', () => {
    const getApplication = jest.fn();
    const {getByTestId} = render(
      <Router history={history}>
        <ViewFullApplication
          application={null}
          contactId={78}
          opportunityId={opportunityId}
          getApplication={getApplication}
        />
      </Router>
    );

    expect(getByTestId('page_loading')).toBeInTheDocument();
    expect(getByTestId('page_loading')).toHaveTextContent('Loading...');

    expect(getApplication.mock.calls.length).toBe(1);
  });
});
