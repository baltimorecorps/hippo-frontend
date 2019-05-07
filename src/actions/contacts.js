import { API_URL } from "../constants";
import fetchActionCreator from "fetch-action-creator";

export const ALL_CONTACTS = "ALL_CONTACTS";
export const CONTACT = "CONTACT";
export const ADD_CONTACT = "ADD_CONTACT";

// ## API ACTION CREATORS ##
// Note on naming convention here:
// All fetch API methods creators are prefixed with 'api' for clarity in use

const apiGetAllContacts = () =>
  fetchActionCreator(ALL_CONTACTS, `${API_URL}/api/contacts/`);

// const apiGetContact = contactId =>
//   fetchActionCreator(CONTACT, `${API_URL}/api/contacts/${contactId}/`);

const apiAddContact = contact =>
  fetchActionCreator(ADD_CONTACT, `${API_URL}/api/contacts/`, {
    body: JSON.stringify(contact),
    method: "POST"
  });

// ## ACTION CREATORS ##

export const refreshContacts = apiGetAllContacts();

export const addContact = contact =>
  async function(dispatch) {
    dispatch(addContactLocal(contact));

    await apiAddContact(contact)(dispatch);
  };

const addContactLocal = contact => ({
  type: ADD_CONTACT,
  contact
});
