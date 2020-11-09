import fetchMock from 'fetch-mock';

import authReducer from './auth.reducer'
import {CREATE_SESSION_API,GET_SESSION_API, DELETE_SESSION_API} from './auth.actions'
import {GET_ALL_CONTACTS_API, GET_MY_CONTACT_API, ADD_CONTACT_API} from '../contacts/contacts.actions'


afterEach(() => {
    fetchMock.restore();
  });


describe('accounts state', () => {
    const initialState = {};
    test('inital state', () => {
      const newState = authReducer(undefined, {});
      expect(newState).toEqual(initialState);
    });
    test('Get session', () => {
      const contact = {info: 'me'};
      const newState = authReducer(undefined, {
        type: GET_SESSION_API.RESOLVE,
        body: {
          status: 'success',
          data: {
            contact,
          },
        },
      });
      expect(newState).toEqual({
        has_session: true,
        contact,
      });
    });
    test('Get session reject', () => {
      const newState = authReducer(undefined, {
        type: GET_SESSION_API.REJECT,
        body: {status: 'success', data: {}},
      });
      expect(newState).toEqual({
        has_session: false,
        contact: null,
      });
    });
    test('Delete session', () => {
      const contact = {id: 123, account_id: 'auth|myid'};
      const newState = authReducer(undefined, {
        type: DELETE_SESSION_API.RESOLVE,
        body: {status: 'success'},
      });
      expect(newState).toEqual({
        has_session: false,
        contact: null,
      });
    });
  
    test('Create session', () => {
      const contact = {info: 'me'};
      const newState = authReducer(undefined, {
        type: CREATE_SESSION_API.RESOLVE,
        body: {
          status: 'success',
          data: {
            contact,
          },
        },
      });
      expect(newState).toEqual({
        has_session: true,
        contact,
      });
    });
    test('Add contact', () => {
      const contact = {id: 123, account_id: 'auth|123'};
      const newState = authReducer(undefined, {
        type: ADD_CONTACT_API.RESOLVE,
        body: {status: 'success', data: contact},
      });
      expect(newState).toEqual({
        has_session: true,
        contact,
      });
    });
  
    test('Fetch all contacts', () => {
      const contacts = [
        {id: 1},
        {id: 2, account_id: 'auth|2'},
        {id: 3, account_id: 'auth|3'},
        {id: 4},
      ];
      const newState = authReducer(undefined, {
        type: GET_ALL_CONTACTS_API.RESOLVE,
        body: {status: 'success', data: contacts},
      });
      expect(newState).toEqual({
        short: contacts,
      });
    });
    test('Get my contact', () => {
      const contact = {id: 123, account_id: 'auth|myid'};
      const newState = authReducer(undefined, {
        type: GET_MY_CONTACT_API.RESOLVE,
        body: {status: 'success', data: contact},
      });
      expect(newState).toEqual({
        [contact.account_id]: contact,
      });
    });
  });
  