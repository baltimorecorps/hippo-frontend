import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Review from './Review';
import {opportunity} from 'mockData/opportunities';
import {fullDraftApp} from 'mockData/applications';
import {Provider} from 'react-redux';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {mockStore} from 'mockData/store';
import {createMemoryHistory} from 'history';
import {mockTheme} from 'mockData/theme';
import {Router} from 'react-router-dom';

describe('Review', () => {
  test('Render Review', () => {
    const history = createMemoryHistory();

    const back = jest.fn();
    const setResume = jest.fn();
    const submit = jest.fn();
    const toOpportunities = jest.fn();

    const {getByTestId, queryByText} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <Review
              back={back}
              submit={submit}
              opportunity={opportunity}
              application={fullDraftApp}
              toOpportunities={toOpportunities}
              contactId={78}
              resume={null}
              setResume={setResume}
            />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );

    expect(getByTestId('review_application')).toBeInTheDocument();
    expect(getByTestId('opp_title')).toBeInTheDocument();
    expect(getByTestId('opp_org')).toBeInTheDocument();
    expect(getByTestId('opp_description')).toBeInTheDocument();

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(queryByText('Submit')).toBeInTheDocument();
    fireEvent.click(queryByText('Submit'));

    expect(getByTestId('confirm_dialog')).toBeInTheDocument();
    expect(getByTestId('cancel_button')).toBeInTheDocument();
    expect(getByTestId('submit_button')).toBeInTheDocument();
    fireEvent.click(getByTestId('submit_button'));

    expect(submit.mock.calls.length).toBe(1);

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(queryByText('Back')).toBeInTheDocument();
    fireEvent.click(queryByText('Back'));
    expect(back.mock.calls.length).toBe(1);
  });
});
