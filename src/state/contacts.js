import {createReducer} from 'redux-starter-kit';
import {makeFetchActions, fetchActionTypes} from 'redux-fetch-wrapper';
import {makeAuthFetchActions} from 'lib/auth0';

import {API_URL} from '../constants';

// ## API ACTION CREATORS ##
// Note on naming convention here:
// All fetch API methods creators are prefixed with 'api' for clarity in use

export const GET_SESSION_API = fetchActionTypes('GET_SESSION');
export const getSession = () =>
  makeFetchActions('GET_SESSION', 
    `${API_URL}/api/session/`,
    {
      credentials: 'include',
    }
  );

export const CREATE_SESSION_API = fetchActionTypes('CREATE_SESSION');
export const createSession = authToken =>
  makeAuthFetchActions(
    authToken,
    'CREATE_SESSION',
    `${API_URL}/api/session/`,
    {
      method: 'POST',
    },
  );

export const ALL_CONTACTS = 'ALL_CONTACTS';
export const ALL_CONTACTS_API = fetchActionTypes(ALL_CONTACTS);
const apiGetAllContacts = () =>
  makeFetchActions(ALL_CONTACTS, `${API_URL}/api/contacts/`);

// const apiGetContact = contactId =>
//   makeFetchActions(CONTACT, `${API_URL}/api/contacts/${contactId}/`);

const apiAddContact = (authToken, contact) =>
  makeAuthFetchActions(authToken, ADD_CONTACT, `${API_URL}/api/contacts/`, {
    body: JSON.stringify(contact),
    method: 'POST',
  });

// Get a contact
export const GET_CONTACT = 'GET_CONTACT';
export const GET_CONTACT_API = fetchActionTypes(GET_CONTACT);
export const apiGetContact = contactId =>
  makeFetchActions(GET_CONTACT, `${API_URL}/api/contacts/${contactId}/`);

// ## ACTION CREATORS ##

export const refreshContacts = apiGetAllContacts();

export const ADD_CONTACT = 'ADD_CONTACT';
export const ADD_CONTACT_API = fetchActionTypes(ADD_CONTACT);
export const addContact = (authToken, contact) =>
  async function(dispatch) {
    dispatch(addContactLocal(contact));

    return await apiAddContact(authToken, contact)(dispatch);
  };

const addContactLocal = contact => ({
  type: ADD_CONTACT,
  contact,
});

export const ADD_CONTACT_SKILL = 'ADD_CONTACT_SKILL';
export const ADD_CONTACT_SKILL_API = fetchActionTypes(ADD_CONTACT_SKILL);
export const addContactSkill = (contactId, skill) =>
  async function(dispatch) {
    const payload = {
      contact_id: contactId,
      name: skill,
    };
    dispatch({
      type: ADD_CONTACT_SKILL,
      payload,
    });

    const result = await makeFetchActions(
      ADD_CONTACT_SKILL,
      `${API_URL}/api/contacts/${contactId}/skills/`,
      {
        body: JSON.stringify(payload),
        method: 'POST',
      }
    )(dispatch);

    // TODO: make the ADD_CONTACT_SKILL_API.RESOLVE update the state and
    // turn this into a conditional fetch if this contact isn't already in the
    // state
    await apiGetContact(contactId);
    return result;
  };

export const DELETE_CONTACT_SKILL = 'DELETE_CONTACT_SKILL';
export const DELETE_CONTACT_SKILL_API = fetchActionTypes(DELETE_CONTACT_SKILL);
export const deleteContactSkill = (contactId, skillId) =>
  async function(dispatch) {
    dispatch({
      type: DELETE_CONTACT_SKILL,
      payload: {
        contact_id: contactId,
        skill_id: skillId,
      },
    });

    const result = await makeFetchActions(
      DELETE_CONTACT_SKILL,
      `${API_URL}/api/contacts/${contactId}/skills/`,
      {
        method: 'DELETE',
      }
    )(dispatch);

    // TODO: make the DELETE_CONTACT_SKILL_API.RESOLVE update the state and
    // turn this into a conditional fetch if this contact isn't already in the
    // state
    await apiGetContact(contactId);
    return result;
  };

// Update/Edit a contact
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const UPDATE_CONTACT_API = fetchActionTypes(UPDATE_CONTACT);
export const updateContact = contact =>
  async function(dispatch) {
    dispatch({
      type: UPDATE_CONTACT,
      contact,
    });

    return await makeFetchActions(
      UPDATE_CONTACT,
      `${API_URL}/api/contacts/${contact.id}/`,
      {
        body: JSON.stringify(contact),
        method: 'PUT',
      }
    )(dispatch);
  };

// ------------------------------------------------------------------------------------

export const GET_MY_CONTACT = 'GET_MY_CONTACT';
export const GET_MY_CONTACT_API = fetchActionTypes(GET_MY_CONTACT);
export const getMyContact = authToken =>
  async function(dispatch) {
    dispatch({
      type: GET_MY_CONTACT,
    });

    return await apiGetMyContact(authToken)(dispatch);
  };

export const apiGetMyContact = authToken =>
  makeAuthFetchActions(
    authToken,
    GET_MY_CONTACT,
    `${API_URL}/api/contacts/me/`
  );

/* eslint-enable no-unused-vars */

export const contactsReducer = createReducer(
  {},
  {
    [ALL_CONTACTS_API.RESOLVE]: (state, action) => {
      if (!action.body) {
        return {};
      } else {
        let newState = {};
        action.body.data.forEach(contact => {
          newState[contact.id] = contact;
        });
        return newState;
      }
    },

    [GET_CONTACT_API.RESOLVE]: (state, action) => {
      const contact = action.body.data;
      state[contact.id] = contact;
    },
    [GET_MY_CONTACT_API.RESOLVE]: (state, action) => {
      const contact = action.body.data;
      state[contact.id] = contact;
    },

    [UPDATE_CONTACT_API.RESOLVE]: (state, action) => {
      const contact = action.body.data;
      state[contact.id] = contact;
    },
    [ADD_CONTACT_API.RESOLVE]: (state, action) => {
      const contact = action.body.data;
      state[contact.id] = contact;
    },
    [GET_SESSION_API.RESOLVE]: (state, action) => {
      const contact = action.body.data.contact;
      state[contact.id] = contact;
    },
    [CREATE_SESSION_API.RESOLVE]: (state, action) => {
      const contact = action.body.data.contact;
      state[contact.id] = contact;
    },

  }
);

export const accountsReducer = createReducer(
  {},
  {
    [ALL_CONTACTS_API.RESOLVE]: (state, action) => {
      if (!action.body) {
        return {};
      } else {
        let newState = {};
        action.body.data.forEach(contact => {
          if (!contact.account_id) {
            return;
          }
          newState[contact.account_id] = contact;
        });
        return newState;
      }
    },
    [GET_MY_CONTACT_API.RESOLVE]: (state, action) => {
      const contact = action.body.data;
      state[contact.account_id] = contact;
    },
    [CREATE_SESSION_API.RESOLVE]: (state, action) => {
      state.has_session = true;
      state.contact = action.body.data.contact;
    },
    [GET_SESSION_API.RESOLVE]: (state, action) => {
      state.has_session = true;
      state.contact = action.body.data.contact;
    },
    [GET_SESSION_API.REJECT]: (state, action) => {
      state.has_session = false;
      state.contact = null;
    },
    [ADD_CONTACT_API.RESOLVE]: (state, action) => {
      state.has_session = true
      state.contact = action.body.data;
    },
  }
);
