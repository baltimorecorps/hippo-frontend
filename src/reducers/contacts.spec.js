import {contactsReducer, accountsReducer} from './contacts';

import {
  ALL_CONTACTS,
  ALL_CONTACTS_API,
  ADD_CONTACT_API,
  ADD_CONTACT_SKILL_API,
  GET_MY_CONTACT_API,
} from '../actions/contacts';
import {CREATE_RESUME_API} from '../actions/resume';

describe('Contacts state', () => {
  const initialState = {};
  test('inital state', () => {
    const newState = contactsReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test('Fetch all contacts', () => {
    const contacts = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
    const newState = contactsReducer(undefined, {
      type: ALL_CONTACTS_API.RESOLVE,
      body: {status: 'success', data: contacts},
    });
    expect(newState).toEqual({
      1: {id: 1},
      2: {id: 2},
      3: {id: 3},
      4: {id: 4},
    });
  });
  test('Add contact', () => {
    const contact = {id: 123};
    const newState = contactsReducer(undefined, {
      type: ADD_CONTACT_API.RESOLVE,
      body: {status: 'success', data: contact},
    });
    expect(newState).toEqual({
      123: {id: 123},
    });
  });
  test('Get my contact', () => {
    const contact = {id: 123};
    const newState = contactsReducer(undefined, {
      type: GET_MY_CONTACT_API.RESOLVE,
      body: {status: 'success', data: contact},
    });
    expect(newState).toEqual({
      123: {id: 123},
    });
  });

  test('Replace existing contacts', () => {
    const contacts = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
    const newState = contactsReducer(
      {
        5: {id: 5},
      },
      {
        type: ALL_CONTACTS_API.RESOLVE,
        body: {status: 'success', data: contacts},
      }
    );
    expect(newState).toEqual({
      1: {id: 1},
      2: {id: 2},
      3: {id: 3},
      4: {id: 4},
    });
  });
});
describe('accounts state', () => {
  const initialState = {};
  test('inital state', () => {
    const newState = accountsReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test('Add contact', () => {
    const contact = {id: 123, account_id: 'auth|123'};
    const newState = accountsReducer(undefined, {
      type: ADD_CONTACT_API.RESOLVE,
      body: {status: 'success', data: contact},
    });
    expect(newState).toEqual({
      'auth|123': contact,
    });
  });
  test('Add contact - no account id', () => {
    const contact = {id: 123};
    const newState = accountsReducer(undefined, {
      type: ADD_CONTACT_API.RESOLVE,
      body: {status: 'success', data: contact},
    });
    expect(newState).toEqual({});
  });

  test('Fetch all contacts', () => {
    const contacts = [
      {id: 1},
      {id: 2, account_id: 'auth|2'},
      {id: 3, account_id: 'auth|3'},
      {id: 4},
    ];
    const newState = accountsReducer(undefined, {
      type: ALL_CONTACTS_API.RESOLVE,
      body: {status: 'success', data: contacts},
    });
    expect(newState).toEqual({
      'auth|2': {id: 2, account_id: 'auth|2'},
      'auth|3': {id: 3, account_id: 'auth|3'},
    });
  });
  test('Get my contact', () => {
    const contact = {id: 123, account_id: 'auth|myid'};
    const newState = accountsReducer(undefined, {
      type: GET_MY_CONTACT_API.RESOLVE,
      body: {status: 'success', data: contact},
    });
    expect(newState).toEqual({
      'auth|myid': contact,
    });
  });
});
