import React from 'react';
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConfirmationPage from './ConfirmationPage';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('ConfirmationPage', () => {
  test('Render all contacts', () => {
    const history = createMemoryHistory();

    const deleteContact = jest.fn();
    const {getByTestId} = render(
      <Router history={history}>
        <ConfirmationPage />
      </Router>
    );

    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('header')).toHaveTextContent(
      'Your application has been submitted.'
    );
    expect(getByTestId('content')).toBeInTheDocument();

    expect(getByTestId('to_profile_button')).toBeInTheDocument();
    expect(getByTestId('to_opportunities_button')).toBeInTheDocument();

    fireEvent.click(getByTestId('to_profile_button'));
    expect(history.location.pathname).toBe('/profile');

    fireEvent.click(getByTestId('to_opportunities_button'));
    expect(history.location.pathname).toBe('/opportunities');
  });
});
