import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddResume from './AddResume';
import {opportunity} from 'mockData/opportunities';
import {fullDraftApp} from 'mockData/applications';
import {Provider} from 'react-redux';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {mockStore} from 'mockData/store';
import {createMemoryHistory} from 'history';
import {mockTheme} from 'mockData/theme';
import {Router} from 'react-router-dom';

describe('AddResume', () => {
  test('Render AddResume', () => {
    const history = createMemoryHistory();

    const back = jest.fn();
    const next = jest.fn();
    const setResume = jest.fn();

    const {getByTestId, queryByText} = render(
      <Provider store={mockStore}>
        <MuiThemeProvider theme={mockTheme}>
          <Router history={history}>
            <AddResume
              startText=""
              back={back}
              next={next}
              opportunity={opportunity}
              application={fullDraftApp}
              contactId={78}
              resume={null}
              setResume={setResume}
            />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );

    expect(getByTestId('add_resume')).toBeInTheDocument();
    expect(getByTestId('opp_title')).toBeInTheDocument();
    expect(getByTestId('opp_org')).toBeInTheDocument();
    expect(getByTestId('opp_description')).toBeInTheDocument();

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(queryByText('Next')).toBeInTheDocument();
    fireEvent.click(queryByText('Next'));
    expect(next.mock.calls.length).toBe(1);

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(queryByText('Back')).toBeInTheDocument();
    fireEvent.click(queryByText('Back'));
    expect(back.mock.calls.length).toBe(1);
  });
});
