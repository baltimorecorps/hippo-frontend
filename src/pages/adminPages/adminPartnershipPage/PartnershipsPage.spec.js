import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PartnershipsPage from './PartnershipsPage';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('Partnerships Page', () => {
  const history = createMemoryHistory();

  test('Render Partnerships Page', () => {
    const {getByTestId, getAllByTestId} = render(
      <Router history={history}>
        <PartnershipsPage />
      </Router>
    );

    expect(getByTestId('page_header')).toBeInTheDocument();
    expect(getByTestId('page_header')).toHaveTextContent(
      'Partnerships Team Page'
    );
    expect(getAllByTestId('links_to_internal_page').length).toBe(3);
  });

  test('Click Links to internal pages', () => {
    const {getAllByTestId} = render(
      <Router history={history}>
        <PartnershipsPage />
      </Router>
    );

    const links = getAllByTestId('links_to_internal_page');
    expect(links.length).toBe(3);

    fireEvent.click(links[0]);
    expect(history.location.pathname).toBe(
      '/internal/add-or-edit-opportunities'
    );

    fireEvent.click(links[1]);
    expect(history.location.pathname).toBe('/internal/opportunities-board');

    fireEvent.click(links[2]);
    expect(history.location.pathname).toBe('/internal/applicants-board');
  });
});
