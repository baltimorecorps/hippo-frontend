import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import Error404Page from './Error404Page';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('Error404Page', () => {
  const history = createMemoryHistory();

  test('Render Error404Page', () => {
    const {getAllByTestId, getByTestId} = render(
      <Router history={history}>
        <Error404Page />
      </Router>
    );

    expect(getByTestId('404_page')).toBeInTheDocument();
    expect(getByTestId('404_text')).toBeInTheDocument();
    expect(getByTestId('pageNotFound_text')).toBeInTheDocument();
    expect(getByTestId('homepage_button')).toBeInTheDocument();

    fireEvent.click(getByTestId('homepage_button'));
    expect(history.location.pathname).toBe('/');
  });
});
