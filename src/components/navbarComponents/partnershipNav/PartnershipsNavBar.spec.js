import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PartnershipsNavBar from './PartnershipsNavBar';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('PartnershipsNavBar component', () => {
  const history = createMemoryHistory();

  test('Render The NavBar', () => {
    const {getByTestId, getAllByTestId} = render(
      <Router history={history}>
        <PartnershipsNavBar />
      </Router>
    );

    const navBarLinks = getAllByTestId('links');
    expect(getByTestId('partnerships_navbar')).toBeInTheDocument();
    expect(navBarLinks.length).toBe(3);

    expect(navBarLinks[0]).toHaveTextContent('Add or Edit Opportunities');
    expect(navBarLinks[1]).toHaveTextContent('Opportunities Board');
    expect(navBarLinks[2]).toHaveTextContent('Applicants Board');
  });

  test('Click links on the NavBar', () => {
    const {getByTestId, getAllByTestId} = render(
      <Router history={history}>
        <PartnershipsNavBar />
      </Router>
    );

    const navBarLinks = getAllByTestId('links');
    expect(getByTestId('partnerships_navbar')).toBeInTheDocument();
    expect(navBarLinks.length).toBe(3);

    expect(navBarLinks[0]).toHaveTextContent('Add or Edit Opportunities');
    expect(navBarLinks[1]).toHaveTextContent('Opportunities Board');
    expect(navBarLinks[2]).toHaveTextContent('Applicants Board');

    fireEvent.click(navBarLinks[0]);
    expect(history.location.pathname).toBe(
      '/internal/add-or-edit-opportunities'
    );

    fireEvent.click(navBarLinks[1]);
    expect(history.location.pathname).toBe('/internal/opportunities-board');

    fireEvent.click(navBarLinks[2]);
    expect(history.location.pathname).toBe('/internal/applicants-board');
  });
});
