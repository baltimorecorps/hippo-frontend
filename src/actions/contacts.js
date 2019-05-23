import { API_URL } from '../constants';
import { makeFetchActions, fetchActionTypes } from 'redux-fetch-wrapper';


// ## API ACTION CREATORS ##
// Note on naming convention here:
// All fetch API methods creators are prefixed with 'api' for clarity in use

export const ALL_CONTACTS = 'ALL_CONTACTS';
export const ALL_CONTACTS_API = fetchActionTypes(ALL_CONTACTS);
const apiGetAllContacts = () => makeFetchActions(ALL_CONTACTS, `${API_URL}/api/contacts/`);

// const apiGetContact = contactId =>
//   makeFetchActions(CONTACT, `${API_URL}/api/contacts/${contactId}/`);

const apiAddContact = (contact) =>
  makeFetchActions(ADD_CONTACT, `${API_URL}/api/contacts/`, {
    body: JSON.stringify(contact),
    method: 'POST',
  });

// ## ACTION CREATORS ##

export const refreshContacts = apiGetAllContacts();

export const ADD_CONTACT = 'ADD_CONTACT';
export const ADD_CONTACT_API = fetchActionTypes(ADD_CONTACT);
export const addContact = (contact) =>
  async function(dispatch) {
    dispatch(addContactLocal(contact));

    await apiAddContact(contact)(dispatch);
  };

const addContactLocal = (contact) => ({
  type: ADD_CONTACT,
  contact,
});
