import React from 'react';
import { render, fireEvent, prettyDOM, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit';
import rootReducer from '../../reducers';
import { BrowserRouter as Router } from 'react-router-dom';

import ProfilePage from './ProfilePage'



describe('ProfilePage', () => {
  const contactInfo = {
    contactId: 123,
    first_name: 'Alice',
    last_name: 'Tester',
    email_primary: { email: 'alice@example.com' },
    phone_primary: '(123) 456-7890',
  };

  let store = configureStore({
    reducer: rootReducer,
  });

  // Reinit store for every test
  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
    });
  });

  test('render base page', () => {
    const start = jest.fn()
    const { queryByText } = render(
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
          inSelectMode={false}
        />
        </Router>
      </Provider>,
    );
    expect(queryByText(/choose resume style/i)).toBeNull();
    expect(queryByText(/select the experiences/i)).toBeNull();

    const button = queryByText(/create resume/i)
    expect(button).not.toBeNull();

    expect(start.mock.calls.length).toBe(0)
    fireEvent.click(button)
    expect(start.mock.calls.length).toBe(1)

  });

  test('render resume dialog', () => {
    const start = jest.fn()
    const { queryByText } = render(
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
          inSelectMode={false}
        />
        </Router>
      </Provider>,
    );
    expect(queryByText(/choose resume style/i)).not.toBeNull();
    expect(queryByText(/select the experiences/i)).toBeNull();

    const button = queryByText(/highlight experiences/i)
    expect(button).not.toBeNull();

    expect(start.mock.calls.length).toBe(0)
    fireEvent.click(button)
    expect(start.mock.calls.length).toBe(1)
  });

  test('render select drawer', () => {
    const cancel = jest.fn()
    const { queryByText } = render(
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
          inSelectMode={true}
        />
        </Router>
      </Provider>,
    );
    expect(queryByText(/choose resume style/i)).toBeNull();
    expect(queryByText(/select the experiences/i)).not.toBeNull();

    const nextButton = queryByText(/next/i)
    const cancelButton = queryByText(/cancel/i)
    expect(nextButton).not.toBeNull();
    expect(cancelButton).not.toBeNull();

    expect(cancel.mock.calls.length).toBe(0)
    fireEvent.click(cancelButton)
    expect(cancel.mock.calls.length).toBe(1)
  });

  test('integration - render base page', () => {
    const { queryByText } = render(
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
          inSelectMode={false}
        />
        </Router>
      </Provider>,
    );

    expect(queryByText('Alice Tester')).not.toBeNull();
    expect(queryByText('alice@example.com')).not.toBeNull();
    expect(queryByText('(123) 456-7890')).not.toBeNull();

    expect(queryByText(/work experience/i)).not.toBeNull();
    expect(queryByText(/education/i)).not.toBeNull();
    expect(queryByText(/service and leaders/i)).not.toBeNull();
    expect(queryByText(/accomplishments/i)).not.toBeNull();
  });
});
