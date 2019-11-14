import {API_URL} from '../constants';
import {makeFetchActions, fetchActionTypes} from 'redux-fetch-wrapper';
import {makeAuthFetchActions} from 'lib/auth0';

// ## API ACTION CREATORS ##
// Note on naming convention here:
// All fetch API methods creators are prefixed with 'api' for clarity in use

export const ALL_CONTACTS = 'ALL_CONTACTS';
export const ALL_CONTACTS_API = fetchActionTypes(ALL_CONTACTS);
const apiGetAllContacts = () =>
  makeFetchActions(ALL_CONTACTS, `${API_URL}/api/contacts/`);

// const apiGetContact = contactId =>
//   makeFetchActions(CONTACT, `${API_URL}/api/contacts/${contactId}/`);

const apiAddContact = contact =>
  makeFetchActions(ADD_CONTACT, `${API_URL}/api/contacts/`, {
    body: JSON.stringify(contact),
    method: 'POST',
  });

// ## ACTION CREATORS ##

export const refreshContacts = apiGetAllContacts();

export const ADD_CONTACT = 'ADD_CONTACT';
export const ADD_CONTACT_API = fetchActionTypes(ADD_CONTACT);
export const addContact = contact =>
  async function(dispatch) {
    dispatch(addContactLocal(contact));

    return await apiAddContact(contact)(dispatch);
  };

const addContactLocal = contact => ({
  type: ADD_CONTACT,
  contact,
});

export const GET_MY_CONTACT = 'GET_MY_CONTACT';
export const GET_MY_CONTACT_API = fetchActionTypes(GET_MY_CONTACT);
export const getMyContact = authToken =>
  async function(dispatch) {
    dispatch({
      type: GET_MY_CONTACT,
    });

    return await apiGetMyContact(authToken)(dispatch);
  };

const apiGetMyContact = authToken =>
  makeAuthFetchActions(
    authToken,
    GET_MY_CONTACT,
    `${API_URL}/api/contacts/me/`
  );
