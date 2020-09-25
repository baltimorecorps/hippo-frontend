import React from 'react';
import {render, cleanup, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContactList from './ContactList';
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
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Doe',
  },
  {
    id: 3,
    first_name: 'Taylor',
    last_name: 'Swift',
  },
];

describe('/Contacts Page: Integration Tests', () => {
  test('Render all contacts', () => {
    const history = createMemoryHistory();

    const deleteContact = jest.fn();
    const {getAllByTestId} = render(
      <Router history={history}>
        <ContactList
          contacts={contacts}
          deleteContact={deleteContact}
          getAllContacts={() => jest.fn()}
        />
      </Router>
    );
    const eachContacts = getAllByTestId('each-contact');

    expect(eachContacts.length).toBe(3);
    expect(eachContacts[0]).toHaveTextContent('John Doe');
    expect(eachContacts[1]).toHaveTextContent('Jane Doe');
    expect(eachContacts[2]).toHaveTextContent('Taylor Swift');
  });

  test('Confirm Delete Dialog - Not Delete', () => {
    const history = createMemoryHistory();

    const deleteContact = jest.fn();
    const {getByTestId, getAllByTestId} = render(
      <Router history={history}>
        <ContactList
          contacts={contacts}
          deleteContact={deleteContact}
          getAllContacts={() => jest.fn()}
        />
      </Router>
    );
    const moreIcons = getAllByTestId('more-icon');
    const moreIconMenus = getAllByTestId('more-icon-menu');

    expect(getAllByTestId('each-contact').length).toBe(3);
    expect(getAllByTestId('each-contact')[0]).toHaveTextContent('John Doe');
    expect(getAllByTestId('each-contact')[1]).toHaveTextContent('Jane Doe');
    expect(getAllByTestId('each-contact')[2]).toHaveTextContent('Taylor Swift');

    expect(moreIcons.length).toBe(3);
    expect(moreIconMenus.length).toBe(3);
    fireEvent.click(moreIcons[1]);
    fireEvent.click(moreIconMenus[1]);

    expect(getByTestId('confirm-delete-dialog')).toBeInTheDocument();
    expect(getByTestId('confirm-delete-button')).toBeInTheDocument();
    expect(getByTestId('confirm-not-delete-button')).toBeInTheDocument();

    expect(getByTestId('confirm-delete-dialog')).toHaveTextContent(
      'Are you sure you want to delete Jane Doe (id: 2) profile?'
    );

    fireEvent.click(getByTestId('confirm-not-delete-button'));
    expect(getAllByTestId('each-contact').length).toBe(3);
    expect(getAllByTestId('each-contact')[0]).toHaveTextContent('John Doe');
    expect(getAllByTestId('each-contact')[1]).toHaveTextContent('Jane Doe');
    expect(getAllByTestId('each-contact')[2]).toHaveTextContent('Taylor Swift');
  });

  test('Confirm Delete Dialog - Delete a Profile', () => {
    const history = createMemoryHistory();

    const deleteContact = jest.fn();
    const {getByTestId, getAllByTestId} = render(
      <Router history={history}>
        <ContactList
          contacts={contacts}
          deleteContact={deleteContact}
          getAllContacts={() => jest.fn()}
        />
      </Router>
    );
    const moreIcons = getAllByTestId('more-icon');
    const moreIconMenus = getAllByTestId('more-icon-menu');

    expect(getAllByTestId('each-contact').length).toBe(3);
    expect(getAllByTestId('each-contact')[0]).toHaveTextContent('John Doe');
    expect(getAllByTestId('each-contact')[1]).toHaveTextContent('Jane Doe');
    expect(getAllByTestId('each-contact')[2]).toHaveTextContent('Taylor Swift');

    expect(moreIcons.length).toBe(3);
    expect(moreIconMenus.length).toBe(3);
    fireEvent.click(moreIcons[1]);
    fireEvent.click(moreIconMenus[1]);

    expect(getByTestId('confirm-delete-dialog')).toBeInTheDocument();
    expect(getByTestId('confirm-delete-button')).toBeInTheDocument();
    expect(getByTestId('confirm-not-delete-button')).toBeInTheDocument();

    expect(getByTestId('confirm-delete-dialog')).toHaveTextContent(
      'Are you sure you want to delete Jane Doe (id: 2) profile?'
    );

    fireEvent.click(getByTestId('confirm-delete-button'));

    expect(deleteContact.mock.calls.length).toBe(1);
    expect(deleteContact.mock.calls[0][0]).toBe(2); // passing Jane Doe's id
  });
});
