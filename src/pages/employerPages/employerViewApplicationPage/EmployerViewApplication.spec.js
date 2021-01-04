import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmployerViewApplication from './EmployerViewApplication';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {
  fullRecommendedApp,
  fullInterviewingApp,
  fullConsideredApp,
  fullNotAFitFromFinalistsApp,
} from 'mockData/applications';
import {Provider} from 'react-redux';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
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
              opportunityId={fullRecommendedApp.id}
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

  test("Click to Employer's Page", () => {
    const getApplication = jest.fn();
    const employerInterviewApplication = jest.fn();
    const employerNotAFitApplication = jest.fn();
    const employerFinalistsApplication = jest.fn();

    const {queryByText} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <EmployerViewApplication
              application={fullRecommendedApp}
              contactId={78}
              opportunityId={fullRecommendedApp.id}
              getApplication={getApplication}
              employerInterviewApplication={employerInterviewApplication}
              employerNotAFitApplication={employerNotAFitApplication}
              employerFinalistsApplication={employerFinalistsApplication}
            />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );

    const toEmployerPageButton = queryByText("To Employer's Page");
    expect(toEmployerPageButton).toBeInTheDocument();
    fireEvent.click(toEmployerPageButton);
    expect(history.location.pathname).toBe(
      `/org/opportunity/${fullRecommendedApp.id}/`
    );
  });

  test('Click not a fit to a Finalists Application', () => {
    const getApplication = jest.fn();
    const employerInterviewApplication = jest.fn();
    const employerNotAFitApplication = jest.fn();
    const employerFinalistsApplication = jest.fn();

    const {getByTestId, queryByText} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <EmployerViewApplication
              application={fullConsideredApp}
              contactId={fullConsideredApp.contact.id}
              opportunityId={fullConsideredApp.id}
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

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Back');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'Reconsider for Not a Fit'
    );

    fireEvent.click(queryByText('Reconsider for Not a Fit'));
    expect(getByTestId('confirm_dialog')).toBeInTheDocument();
    expect(getByTestId('confirm_dialog')).toHaveTextContent(
      'Do you want to reconsider Bay1 Chairangsaris as not a fit?'
    );

    expect(getByTestId('cancel_confirm_dialog_button')).toBeInTheDocument();

    expect(getByTestId('close_confirm_dialog_button')).toBeInTheDocument();
    expect(queryByText('This candidate is not a fit')).toBeInTheDocument();

    fireEvent.click(queryByText('This candidate is not a fit'));
    expect(employerNotAFitApplication.mock.calls.length).toBe(1);
  });

  test('Click Reconsider to a Not a Fit from Finalists Application', () => {
    const getApplication = jest.fn();
    const employerInterviewApplication = jest.fn();
    const employerNotAFitApplication = jest.fn();
    const employerFinalistsApplication = jest.fn();

    const {getByTestId, queryByText} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <EmployerViewApplication
              application={fullNotAFitFromFinalistsApp}
              contactId={fullNotAFitFromFinalistsApp.contact.id}
              opportunityId={fullNotAFitFromFinalistsApp.id}
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

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Back');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'Reconsider for Finalists'
    );

    fireEvent.click(queryByText('Reconsider for Finalists'));
    expect(getByTestId('confirm_dialog')).toBeInTheDocument();
    expect(getByTestId('confirm_dialog_text_content')).toHaveTextContent(
      'Do you want to reconsider Bay1 Chairangsaris as a finalist?'
    );

    expect(getByTestId('cancel_confirm_dialog_button')).toBeInTheDocument();

    expect(getByTestId('close_confirm_dialog_button')).toBeInTheDocument();
    expect(queryByText('Make this candidate a finalist')).toBeInTheDocument();

    fireEvent.click(queryByText('Make this candidate a finalist'));
    expect(employerFinalistsApplication.mock.calls.length).toBe(1);
  });

  test('Click Finalist to Interviewed Application', () => {
    const getApplication = jest.fn();
    const employerInterviewApplication = jest.fn();
    const employerNotAFitApplication = jest.fn();
    const employerFinalistsApplication = jest.fn();

    const {getByTestId, queryByText} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <EmployerViewApplication
              application={fullInterviewingApp}
              contactId={fullInterviewingApp.contact.id}
              opportunityId={fullInterviewingApp.id}
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

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent(
      'Interview Rescheduled'
    );

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'Interview Completed'
    );

    fireEvent.click(queryByText('Interview Completed'));
    expect(getByTestId('confirm_dialog')).toBeInTheDocument();
    expect(getByTestId('confirm_dialog_text_content')).toHaveTextContent(
      'Would Bay1 Chairangsaris be a finalist for this role?'
    );

    expect(getByTestId('close_confirm_dialog_button')).toBeInTheDocument();
    expect(queryByText('Make this candidate a finalist')).toBeInTheDocument();

    fireEvent.click(queryByText('Make this candidate a finalist'));
    expect(employerFinalistsApplication.mock.calls.length).toBe(1);
  });

  test('Click Not a Fit to Recommended Application', () => {
    const getApplication = jest.fn();
    const employerInterviewApplication = jest.fn();
    const employerNotAFitApplication = jest.fn();
    const employerFinalistsApplication = jest.fn();

    const {getByTestId, queryByText} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <EmployerViewApplication
              application={fullRecommendedApp}
              contactId={fullRecommendedApp.contact.id}
              opportunityId={fullRecommendedApp.id}
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

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Not a Fit');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent('Interview Schedule');

    fireEvent.click(queryByText('Not a Fit'));

    expect(getByTestId('confirm_dialog')).toBeInTheDocument();
    expect(getByTestId('confirm_dialog_text_content')).toHaveTextContent(
      'Are you sure this application is not a fit?'
    );

    expect(queryByText('Cancel')).toBeInTheDocument();
    expect(queryByText('Yes')).toBeInTheDocument();

    fireEvent.click(queryByText('Yes'));
    expect(employerNotAFitApplication.mock.calls.length).toBe(1);
  });

  test('Click Finalist to Interviewed Application', () => {
    const getApplication = jest.fn();
    const employerInterviewApplication = jest.fn();
    const employerNotAFitApplication = jest.fn();
    const employerFinalistsApplication = jest.fn();

    const {getByTestId, queryByText} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <EmployerViewApplication
              application={fullRecommendedApp}
              contactId={fullRecommendedApp.contact.id}
              opportunityId={fullRecommendedApp.id}
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

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Not a Fit');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent('Interview Schedule');

    fireEvent.click(queryByText('Not a Fit'));

    expect(getByTestId('confirm_dialog')).toBeInTheDocument();
    expect(getByTestId('confirm_dialog_text_content')).toHaveTextContent(
      'Are you sure this application is not a fit?'
    );

    expect(queryByText('Cancel')).toBeInTheDocument();
    expect(queryByText('Yes')).toBeInTheDocument();

    fireEvent.click(queryByText('Yes'));
    expect(employerNotAFitApplication.mock.calls.length).toBe(1);
  });
});

// To Employer's Page
