import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import {Provider} from 'react-redux';
import {configureStore} from 'redux-starter-kit';
import rootReducer from 'state';
import {BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../../styles/theme';
import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
  const contactInfo = {
    contactId: 123,
    first_name: 'Alice',
    last_name: 'Tester',
    email_primary: {email: 'alice@example.com'},
    phone_primary: '(123) 456-7890',
    skills: [],
  };

  let store = configureStore({
    reducer: rootReducer,
  });

  let oldScrollTo = null;

  beforeAll(() => {
    oldScrollTo = window.scrollTo;
    window.scrollTo = () => {};
  });

  afterAll(() => {
    window.scrollTo = oldScrollTo;
  });

  // Reinit store for every test
  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
    });
  });

  test('render base page', () => {
    const start = jest.fn();
    const {queryByText} = render(
      <Provider store={store}>
        <Router>
          <ProfilePage
            contactId={contactInfo.contactId}
            contactInfo={contactInfo}
            refreshContacts={jest.fn()}
            startResumeCreation={start}
            startResumeSelect={jest.fn()}
            cancelResumeSelect={jest.fn()}
            showResumeDialog={false}
            showResumeSpinner={false}
            inSelectMode={false}
          />
        </Router>
      </Provider>
    );
    expect(queryByText(/choose resume style/i)).toBeNull();
    expect(queryByText(/select the experiences/i)).toBeNull();

    // Removed for now
    //const button = queryByText(/create resume/i);
    //expect(button).not.toBeNull();

    //expect(start.mock.calls.length).toBe(0);
    //fireEvent.click(button);
    //expect(start.mock.calls.length).toBe(1);
  });

  test.skip('render resume dialog', () => {
    const start = jest.fn();
    const {queryByText} = render(
      <Provider store={store}>
        <Router>
          <ProfilePage
            contactId={contactInfo.contactId}
            contactInfo={contactInfo}
            refreshContacts={jest.fn()}
            startResumeCreation={jest.fn()}
            startResumeSelect={start}
            cancelResumeSelect={jest.fn()}
            showResumeDialog={true}
            showResumeSpinner={false}
            inSelectMode={false}
          />
        </Router>
      </Provider>
    );
    expect(queryByText(/choose resume style/i)).not.toBeNull();
    expect(queryByText(/select the experiences/i)).toBeNull();

    const button = queryByText(/highlight experiences/i);
    expect(button).not.toBeNull();

    expect(start.mock.calls.length).toBe(0);
    fireEvent.click(button);
    expect(start.mock.calls.length).toBe(1);
  });

  test('render select drawer', () => {
    const cancel = jest.fn();
    const {queryByText} = render(
      <Provider store={store}>
        <Router>
          <ProfilePage
            contactId={contactInfo.contactId}
            contactInfo={contactInfo}
            refreshContacts={jest.fn()}
            startResumeCreation={jest.fn()}
            startResumeSelect={jest.fn()}
            cancelResumeSelect={cancel}
            showResumeDialog={false}
            showResumeSpinner={false}
            inSelectMode={true}
          />
        </Router>
      </Provider>
    );
    expect(queryByText(/create resume/i)).toBeNull();
    expect(queryByText(/choose resume style/i)).toBeNull();
    expect(queryByText(/select the experiences/i)).not.toBeNull();

    const nextButton = queryByText(/next/i);
    const cancelButton = queryByText(/cancel/i);
    expect(nextButton).not.toBeNull();
    expect(cancelButton).not.toBeNull();

    expect(cancel.mock.calls.length).toBe(0);
    fireEvent.click(cancelButton);
    expect(cancel.mock.calls.length).toBe(1);
  });

  test('integration - render base page', () => {
    const {queryByText} = render(
      <Provider store={store}>
        <Router>
          <ProfilePage
            contactId={contactInfo.contactId}
            contactInfo={contactInfo}
            refreshContacts={jest.fn()}
            startResumeCreation={jest.fn()}
            startResumeSelect={jest.fn()}
            cancelResumeSelect={jest.fn()}
            showResumeDialog={false}
            showResumeSpinner={false}
            inSelectMode={false}
          />
        </Router>
      </Provider>
    );

    expect(queryByText('Alice Tester')).not.toBeNull();
    expect(queryByText('alice@example.com')).not.toBeNull();
    expect(queryByText('(123) 456-7890')).not.toBeNull();

    expect(queryByText('Experience')).not.toBeNull();
    expect(queryByText(/education/i)).not.toBeNull();
    expect(queryByText('Portfolio and Work Products')).not.toBeNull();
  });

  test('preview resume on profile', async () => {
    const start = jest.fn();

    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <ProfilePage
              contactId={contactInfo.contactId}
              contactInfo={contactInfo}
              refreshContacts={jest.fn()}
              startResumeCreation={start}
              startResumeSelect={jest.fn()}
              cancelResumeSelect={jest.fn()}
              showResumeDialog={false}
              showResumeSpinner={false}
              inSelectMode={false}
              haveExperience={true}
            />
          </ThemeProvider>
        </Router>
      </Provider>
    );
    const previewResumeSwitch = getByTestId(
      'preview-resume-switch'
    ).querySelector('input[type="checkbox"]');

    expect(previewResumeSwitch).toBeInTheDocument();
    expect(previewResumeSwitch).toHaveProperty('checked', false);

    fireEvent.click(previewResumeSwitch);
    expect(previewResumeSwitch).toHaveProperty('checked', true);

    const resume = getByTestId('resume-view');
    const printResumeButton = getByText(/print resume/i);

    expect(resume).toBeInTheDocument();
    expect(printResumeButton).toBeInTheDocument();

    fireEvent.click(previewResumeSwitch);
    expect(previewResumeSwitch).toHaveProperty('checked', false);
    expect(resume).not.toBeInTheDocument();
    expect(printResumeButton).not.toBeInTheDocument();
  });
});
