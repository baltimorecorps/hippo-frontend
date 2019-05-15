import { contactsReducer } from './contacts';

import { ALL_CONTACTS, ALL_CONTACTS_API } from '../actions/contacts';

describe('Contacts state', () => {
  const initialState = [];
  test('inital state', () => {
    const newState = contactsReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test('Fetch all contacts', () => {
    const contacts = [1, 2, 3, 4];
    const newState = contactsReducer(undefined, {
      type: ALL_CONTACTS_API.RESOLVE,
      body: { status: 'success', data: contacts },
    });
    expect(newState).toEqual(contacts);
  });
  test('Replace existing contacts', () => {
    const contacts = [1, 2, 3, 4];
    const newState = contactsReducer([5, 6, 7, 8], {
      type: ALL_CONTACTS_API.RESOLVE,
      body: { status: 'success', data: contacts },
    });
    expect(newState).toEqual(contacts);
  });
});
