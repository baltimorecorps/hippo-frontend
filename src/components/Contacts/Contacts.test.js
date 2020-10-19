import React from 'react';
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Contacts from './Contacts';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

const contacts = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    status: 'approved',
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Doe',
    status: 'created',
  },
  {
    id: 3,
    first_name: 'Taylor',
    last_name: 'Swift',
    status: 'submitted',
  },
  {
    id: 4,
    first_name: 'Taylor2',
    last_name: 'Swift2',
    status: 'submitted',
  },
  {
    id: 5,
    first_name: 'Jane2',
    last_name: 'Doe2',
    status: 'created',
  },
  {
    id: 6,
    first_name: 'Jane3',
    last_name: 'Doe3',
    status: 'created',
  },
];

// render page
// search
// filter by status

describe('/contacts Page', () => {
  test('Render Page', () => {
    const history = createMemoryHistory();
    const {getAllByTestId, getByTestId} = render(
      <Router history={history}>
        <Contacts
          contacts={contacts}
          getAllContacts={() => jest.fn()}
          deleteContact={() => jest.fn()}
        />
      </Router>
    );
    const eachContacts = getAllByTestId('each-contact');
    const totalFound = getByTestId('total_found');
    const searchBySelector = getByTestId('search_by_selector');
    const searchBar = getByTestId('search_bar');
    const searchButton = getByTestId('search_button');
    const filterByStatusTabs = getByTestId('filter_by_status_tabs');

    expect(eachContacts.length).toBe(6);
    expect(eachContacts[0]).toHaveTextContent('John Doe');
    expect(eachContacts[1]).toHaveTextContent('Jane Doe');
    expect(eachContacts[2]).toHaveTextContent('Taylor Swift');
    expect(eachContacts[3]).toHaveTextContent('Taylor2 Swift2');
    expect(eachContacts[4]).toHaveTextContent('Jane2 Doe2');
    expect(eachContacts[5]).toHaveTextContent('Jane3 Doe3');

    expect(totalFound).toBeInTheDocument();
    expect(totalFound).toHaveTextContent('Found 6 contacts');

    expect(searchBySelector).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(filterByStatusTabs).toBeInTheDocument();
  });
});
