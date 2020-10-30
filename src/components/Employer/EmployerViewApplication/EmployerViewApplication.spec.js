import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmployerViewApplication from './EmployerViewApplication';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {fullRecommendedApp} from 'mockData/applications';
import {Provider} from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {mockStore} from 'mockData/store';
import {mockTheme} from 'mockData/theme';

describe('Employer View Application', () => {
  const history = createMemoryHistory();

  test('Fetch getApplication when applications are null', () => {
    const getApplication = jest.fn();
    const employerInterviewApplication = jest.fn();
    const employerNotAFitApplication = jest.fn();
    const employerFinalistsApplication = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <EmployerViewApplication
          application={null}
          contactId={78}
          opportunityId="1a"
          getApplication={getApplication}
          employerInterviewApplication={employerInterviewApplication}
          employerNotAFitApplication={employerNotAFitApplication}
          employerFinalistsApplication={employerFinalistsApplication}
        />
      </Router>
    );
    expect(getApplication.mock.calls.length).toBe(1);
  });

  test('Render Employer View Application', () => {
    const getApplication = jest.fn();
    const employerInterviewApplication = jest.fn();
    const employerNotAFitApplication = jest.fn();
    const employerFinalistsApplication = jest.fn();

    const {getByTestId} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <EmployerViewApplication
              application={fullRecommendedApp}
              contactId={78}
              opportunityId="1a"
              getApplication={getApplication}
              employerInterviewApplication={employerInterviewApplication}
              employerNotAFitApplication={employerNotAFitApplication}
              employerFinalistsApplication={employerFinalistsApplication}
            />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );

    expect(getByTestId('employer_view_app_page')).toBeInTheDocument();
    expect(getByTestId('view_full_app_component')).toBeInTheDocument();
    expect(getByTestId('decisions_footer')).toBeInTheDocument();
  });
});

// To Employer's Page
