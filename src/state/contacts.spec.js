import fetchMock from 'fetch-mock';
import {
  ALL_CONTACTS,
  ALL_CONTACTS_API,
  ADD_CONTACT_SKILL_API,
  GET_MY_CONTACT,
  GET_MY_CONTACT_API,
  getMyContact,
  ADD_CONTACT,
  ADD_CONTACT_API,
  addContact,
  contactsReducer, 
  accountsReducer,
} from './contacts';

import {CREATE_RESUME_API} from './resume';



afterEach(() => {
  fetchMock.restore();
});

test('Create new contact action - success', async function() {
  const dispatch = jest.fn();
  const contact = {data: 'test'};
  const response = {result: 'win'};
  const path = `path:/api/contacts/`;

  fetchMock.post(path, response);

  await addContact(contact)(dispatch);

  expect(fetchMock.lastCall(path)[1].body).toBe(JSON.stringify(contact));

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[0][0].type).toBe(ADD_CONTACT);
  expect(dispatch.mock.calls[0][0].contact).toEqual(contact);
  expect(dispatch.mock.calls[1][0].type).toBe(ADD_CONTACT_API.REQUEST);
  expect(dispatch.mock.calls[2][0].type).toBe(ADD_CONTACT_API.RESOLVE);
  expect(dispatch.mock.calls[2][0].body).toEqual(response);
});

test('Create new contact action - failure', async function() {
  const dispatch = jest.fn();
  const contactId = 1234;
  const contact = {data: 'test'};

  fetchMock.post(`path:/api/contacts/`, {
    status: 500,
    body: '',
  });

  await addContact(contact)(dispatch);

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[2][0].type).toBe(ADD_CONTACT_API.REJECT);
  expect(dispatch.mock.calls[2][0].statusCode).toBe(500);
});

test('Get my contact', async function() {
  const dispatch = jest.fn();
  const token = 'testAuthToken';
  const response = {contact: 'me'};

  fetchMock.get(
    `path:/api/contacts/me/`,
    {
      status: 200,
      body: response,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  await getMyContact(token)(dispatch);

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[0][0].type).toBe(GET_MY_CONTACT);
  expect(dispatch.mock.calls[1][0].type).toBe(GET_MY_CONTACT_API.REQUEST);
  expect(dispatch.mock.calls[2][0].type).toBe(GET_MY_CONTACT_API.RESOLVE);
  expect(dispatch.mock.calls[2][0].body).toEqual(response);
});

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
