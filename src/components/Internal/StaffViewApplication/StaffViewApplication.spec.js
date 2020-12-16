import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StaffViewApplication from './StaffViewApplication';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {
  fullSubmittedApp,
  fullRecommendedApp,
  fullInterviewingApp,
  fullConsideredApp,
  fullNotAFitFromFinalistsApp,
} from 'mockData/applications';
import {Provider} from 'react-redux';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {mockStore} from 'mockData/store';
import {mockTheme} from 'mockData/theme';

describe('Staff View Application', () => {
  const history = createMemoryHistory();

  test('Fetch getApplication when applications are null', () => {
    const back = jest.fn();
    const getApplication = jest.fn();
    const staffRecommendApplication = jest.fn();
    const staffNotAFitApplication = jest.fn();
    const staffReopenApplication = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <StaffViewApplication
          application={null}
          contactId={78}
          opportunityId="1a"
          back={back}
          getApplication={getApplication}
          staffRecommendApplication={staffRecommendApplication}
          staffNotAFitApplication={staffNotAFitApplication}
          staffReopenApplication={staffReopenApplication}
        />
      </Router>
    );
    expect(getApplication.mock.calls.length).toBe(1);
  });

  test('Render Staff View Application', () => {
    const back = jest.fn();
    const getApplication = jest.fn();
    const staffRecommendApplication = jest.fn();
    const staffNotAFitApplication = jest.fn();
    const staffReopenApplication = jest.fn();

    const {getByTestId} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <StaffViewApplication
              application={fullSubmittedApp}
              contactId={fullSubmittedApp.contact.id}
              opportunityId={fullSubmittedApp.id}
              back={back}
              getApplication={getApplication}
              staffRecommendApplication={staffRecommendApplication}
              staffNotAFitApplication={staffNotAFitApplication}
              staffReopenApplication={staffReopenApplication}
            />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );

    expect(getByTestId('staff_view_app_page')).toBeInTheDocument();
    expect(getByTestId('view_full_app_component')).toBeInTheDocument();
    expect(getByTestId('decisions_footer')).toBeInTheDocument();
  });

  test('Click to different pages', () => {
    const back = jest.fn();
    const getApplication = jest.fn();
    const staffRecommendApplication = jest.fn();
    const staffNotAFitApplication = jest.fn();
    const staffReopenApplication = jest.fn();

    const {getByTestId, queryByText} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <StaffViewApplication
              application={fullSubmittedApp}
              contactId={fullSubmittedApp.contact.id}
              opportunityId={fullSubmittedApp.id}
              back={back}
              getApplication={getApplication}
              staffRecommendApplication={staffRecommendApplication}
              staffNotAFitApplication={staffNotAFitApplication}
              staffReopenApplication={staffReopenApplication}
            />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );

    expect(queryByText('< To Opportunities Board')).toBeInTheDocument();
    expect(queryByText('To Applicants Board >')).toBeInTheDocument();
    expect(queryByText("To This Applicant's Page")).toBeInTheDocument();

    fireEvent.click(queryByText('< To Opportunities Board'));
    expect(history.location.pathname).toBe('/internal/opportunities-board');

    fireEvent.click(queryByText('To Applicants Board >'));
    expect(history.location.pathname).toBe('/internal/applicants-board');

    fireEvent.click(queryByText("To This Applicant's Page"));
    expect(history.location.pathname).toBe(
      `/internal/applicants/${fullSubmittedApp.contact.id}`
    );
  });

  test('Click Recommend to Submitted Application', () => {
    const back = jest.fn();
    const getApplication = jest.fn();
    const staffRecommendApplication = jest.fn();
    const staffNotAFitApplication = jest.fn();
    const staffReopenApplication = jest.fn();

    const {getByTestId, queryByText} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <StaffViewApplication
              application={fullSubmittedApp}
              contactId={fullSubmittedApp.contact.id}
              opportunityId={fullSubmittedApp.id}
              back={back}
              getApplication={getApplication}
              staffRecommendApplication={staffRecommendApplication}
              staffNotAFitApplication={staffNotAFitApplication}
              staffReopenApplication={staffReopenApplication}
            />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );

    expect(queryByText('Recommend')).toBeInTheDocument();
    fireEvent.click(queryByText('Recommend'));

    expect(getByTestId('confirm_dialog')).toBeInTheDocument();
    expect(getByTestId('confirm_dialog_content')).toBeInTheDocument();
    expect(getByTestId('no_button')).toBeInTheDocument();
    expect(getByTestId('yes_button')).toBeInTheDocument();

    expect(getByTestId('confirm_dialog_content')).toHaveTextContent(
      'Are you sure you want to recommend this application?'
    );
    fireEvent.click(getByTestId('yes_button'));
    expect(staffRecommendApplication.mock.calls.length).toBe(1);
  });

  test('Click Not a Fit to Submitted Application', () => {
    const back = jest.fn();
    const getApplication = jest.fn();
    const staffRecommendApplication = jest.fn();
    const staffNotAFitApplication = jest.fn();
    const staffReopenApplication = jest.fn();

    const {getByTestId, queryByText} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <StaffViewApplication
              application={fullSubmittedApp}
              contactId={fullSubmittedApp.contact.id}
              opportunityId={fullSubmittedApp.id}
              back={back}
              getApplication={getApplication}
              staffRecommendApplication={staffRecommendApplication}
              staffNotAFitApplication={staffNotAFitApplication}
              staffReopenApplication={staffReopenApplication}
            />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );

    expect(queryByText('Not a Fit')).toBeInTheDocument();
    fireEvent.click(queryByText('Not a Fit'));

    expect(getByTestId('confirm_dialog')).toBeInTheDocument();
    expect(getByTestId('confirm_dialog_content')).toBeInTheDocument();
    expect(getByTestId('no_button')).toBeInTheDocument();
    expect(getByTestId('yes_button')).toBeInTheDocument();

    expect(getByTestId('confirm_dialog_content')).toHaveTextContent(
      'Are you sure this application is not a fit?'
    );
    fireEvent.click(getByTestId('yes_button'));
    expect(staffNotAFitApplication.mock.calls.length).toBe(1);
  });

  test('Click Reopen to Submitted Application', () => {
    const back = jest.fn();
    const getApplication = jest.fn();
    const staffRecommendApplication = jest.fn();
    const staffNotAFitApplication = jest.fn();
    const staffReopenApplication = jest.fn();

    const {getByTestId, queryByText} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <StaffViewApplication
              application={fullSubmittedApp}
              contactId={fullSubmittedApp.contact.id}
              opportunityId={fullSubmittedApp.id}
              back={back}
              getApplication={getApplication}
              staffRecommendApplication={staffRecommendApplication}
              staffNotAFitApplication={staffNotAFitApplication}
              staffReopenApplication={staffReopenApplication}
            />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );

    expect(queryByText('Reopen')).toBeInTheDocument();
    fireEvent.click(queryByText('Reopen'));

    expect(getByTestId('confirm_dialog')).toBeInTheDocument();
    expect(getByTestId('confirm_dialog_content')).toBeInTheDocument();
    expect(getByTestId('no_button')).toBeInTheDocument();
    expect(getByTestId('yes_button')).toBeInTheDocument();

    expect(getByTestId('confirm_dialog_content')).toHaveTextContent(
      'Are you sure you want to reopen this application?'
    );
    fireEvent.click(getByTestId('yes_button'));
    expect(staffReopenApplication.mock.calls.length).toBe(1);
  });
});
