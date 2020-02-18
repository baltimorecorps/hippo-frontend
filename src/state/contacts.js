import {createReducer} from 'redux-starter-kit';
import {fetchActionTypes} from 'redux-fetch-wrapper';
import {makeApiFetchActions} from 'lib/helperFunctions/helpers';
import {makeAuthFetchActions} from 'lib/Auth0/auth0';

import {API_URL} from 'app/constants';

// ## API ACTION CREATORS ##
// Note on naming convention here:
// All fetch API methods creators are prefixed with 'api' for clarity in use

export const GET_SESSION_API = fetchActionTypes('GET_SESSION');
export const getSession = () =>
  makeApiFetchActions('GET_SESSION', 
    `${API_URL}/api/session/`,
    {
      credentials: 'include',
    }
  );

export const CREATE_SESSION_API = fetchActionTypes('CREATE_SESSION');
export const createSession = authToken =>
  makeAuthFetchActions(authToken, 'CREATE_SESSION', `${API_URL}/api/session/`, {
    method: 'POST',
  });

export const DELETE_SESSION_API = fetchActionTypes('DELETE_SESSION');
export const deleteSession = () =>
  makeApiFetchActions(
    'DELETE_SESSION',
    `${API_URL}/api/session/`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );

export const ALL_CONTACTS = 'ALL_CONTACTS';
export const ALL_CONTACTS_API = fetchActionTypes(ALL_CONTACTS);
const apiGetAllContacts = () =>
  makeApiFetchActions(ALL_CONTACTS, `${API_URL}/api/contacts/`);

// const apiGetContact = contactId =>
//   makeApiFetchActions(CONTACT, `${API_URL}/api/contacts/${contactId}/`);

const apiAddContact = (authToken, contact) =>
  makeAuthFetchActions(authToken, ADD_CONTACT, `${API_URL}/api/contacts/`, {
    body: JSON.stringify(contact),
    method: 'POST',
  });

// Get a contact
export const GET_CONTACT = 'GET_CONTACT';
export const GET_CONTACT_API = fetchActionTypes(GET_CONTACT);
export const apiGetContact = contactId =>
  makeApiFetchActions(GET_CONTACT, `${API_URL}/api/contacts/${contactId}/`);

export const GET_CONTACT_CAPABILITIES = 'GET_CONTACT_CAPABILITIES';
export const GET_CONTACT_CAPABILITIES_API = fetchActionTypes(
  GET_CONTACT_CAPABILITIES
);
export const getContactCapabilities = contactId =>
  makeApiFetchActions(
    GET_CONTACT_CAPABILITIES,
    `${API_URL}/api/contacts/${contactId}/capabilities/`
  );

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

export const UPDATE_CONTACT_SKILL = 'UPDATE_CONTACT_SKILL';
export const updateContactSkill = (contactId, result) => ({
  type: UPDATE_CONTACT_SKILL,
  contactId,
  result: result.body.data,
});

export const ADD_CONTACT_SKILL = 'ADD_CONTACT_SKILL';
export const ADD_CONTACT_SKILL_API = fetchActionTypes(ADD_CONTACT_SKILL);
export const addContactSkill = (contactId, skill) =>
  async function(dispatch) {
    const payload = {
      contact_id: contactId,
      ...skill,
    };
    dispatch({
      type: ADD_CONTACT_SKILL,
      payload,
    });

    const result = await makeApiFetchActions(
      ADD_CONTACT_SKILL,
      `${API_URL}/api/contacts/${contactId}/skills/`,
      {
        body: JSON.stringify(payload),
        method: 'POST',
      }
    )(dispatch);

    if (result.statusCode === 201 || result.statusCode === 200) {
      dispatch(updateContactSkill(contactId, result));
    }
    return result;
  };

export const DELETE_CONTACT_SKILL = 'DELETE_CONTACT_SKILL';
export const DELETE_CONTACT_SKILL_API = fetchActionTypes(DELETE_CONTACT_SKILL);
export const deleteContactSkill = (contactId, skill) =>
  async function(dispatch) {
    const result = await makeApiFetchActions(
      DELETE_CONTACT_SKILL,
      `${API_URL}/api/contacts/${contactId}/skills/${skill.id}/`,
      {
        method: 'DELETE',
      }
    )(dispatch);

    if (result.statusCode === 200) {
      dispatch({
        type: DELETE_CONTACT_SKILL,
        payload: {
          contactId,
          skillId: skill.id,
        },
      });
    }

    return result;
  };

export const ADD_SKILL_SUGGESTION = 'ADD_CAPABILITY_SKILL_SUGGESTION';
export const ADD_SKILL_SUGGESTION_API = fetchActionTypes(ADD_SKILL_SUGGESTION);
export const addSkillSuggestion = (contactId, capabilityId, skill) =>
  async function(dispatch) {
    const payload = {
      contact_id: contactId,
      capability_id: capabilityId,
      name: skill.name,
    };
    dispatch({
      type: ADD_SKILL_SUGGESTION,
      payload,
    });

    const result = await makeApiFetchActions(
      ADD_SKILL_SUGGESTION,
      `${API_URL}/api/contacts/${contactId}/capabilities/${capabilityId}/suggestion/`,
      {
        body: JSON.stringify(payload),
        method: 'POST',
      }
    )(dispatch);

    if (result.statusCode === 201 || result.statusCode === 200) {
      dispatch(updateContactSkill(contactId, result));
    }
    return result;
  };

export const DELETE_SKILL_SUGGESTION_API = fetchActionTypes('DELETE_CAPABILITY_SKILL_SUGGESTION');
export const deleteSkillSuggestion = (contactId, capabilityId, skill) =>
  async function(dispatch) {
    const result = await makeApiFetchActions(
      'DELETE_CAPABILITY_SKILL_SUGGESTION',
      `${API_URL}/api/contacts/${contactId}/capabilities/${capabilityId}/suggestion/${skill.id}/`,
      {
        method: 'DELETE',
      }
    )(dispatch);

    if (result.statusCode === 200) {
      dispatch({
        type: DELETE_CONTACT_SKILL,
        payload: {
          contactId,
          skillId: skill.id,
        },
      });
    }

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

    return await makeApiFetchActions(
      UPDATE_CONTACT,
      `${API_URL}/api/contacts/${contact.id}/`,
      {
        body: JSON.stringify(contact),
        method: 'PUT',
      }
    )(dispatch);
  };

// Update/Edit a contact
export const updateContactSkills = (contactId, skills) =>
  async function(dispatch) {
    const contact = {
      id: contactId,
      skills,
    };

    const result = await updateContact(contact)(dispatch);
    if (result.statusCode === 200) {
      await getContactCapabilities(contactId)(dispatch);
    }
    return result;
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
      state[contact.id] = {
        ...state[contact.id],
        ...contact,
      };
    },
    [GET_MY_CONTACT_API.RESOLVE]: (state, action) => {
      const contact = action.body.data;
      state[contact.id] = {
        ...state[contact.id],
        ...contact,
      };
    },

    [UPDATE_CONTACT_API.RESOLVE]: (state, action) => {
      const contact = action.body.data;
      state[contact.id] = {
        ...state[contact.id],
        ...contact,
      };
    },
    [ADD_CONTACT_API.RESOLVE]: (state, action) => {
      const contact = action.body.data;
      state[contact.id] = contact;
    },
    [GET_SESSION_API.RESOLVE]: (state, action) => {
      const contact = action.body.data.contact;
      state[contact.id] = {
        ...state[contact.id],
        ...contact,
      };
    },
    [CREATE_SESSION_API.RESOLVE]: (state, action) => {
      const contact = action.body.data.contact;
      state[contact.id] = {
        ...state[contact.id],
        ...contact,
      };
    },
    [GET_CONTACT_CAPABILITIES_API.RESOLVE]: (state, action) => {
      const result = action.body.data;
      const contact_id = result.contact_id;
      if (state[contact_id] === undefined) {
        state[contact_id] = {id: contact_id};
      }

      state[contact_id].capabilities = {};
      result.capabilities.forEach(capability => {
        state[contact_id].capabilities[capability.id] = capability;
      });
      state[contact_id].other_skills = result.other_skills;
    },
    [DELETE_CONTACT_SKILL]: (state, action) => {
      const {skillId, contactId} = action.payload;

      const contact = state[contactId];
      if (!contact) {
        return state;
      }

      if (contact.capabilities) {
        // Clear skill out of everything
        Object.values(contact.capabilities).forEach(capability => {
          contact.capabilities[capability.id].skills = capability.skills.filter(
            skill => skill.id !== skillId
          );
          contact.capabilities[
            capability.id
          ].suggested_skills = capability.suggested_skills.filter(
            skill => skill.id !== skillId
          );
        });
      }
      if (contact.other_skills) {
        contact.other_skills = contact.other_skills.filter(
          skill => skill.id !== skillId
        );
      }
    },
    [UPDATE_CONTACT_SKILL]: (state, action) => {
      const {result, contactId} = action;

      // Make sure the contact has all the necessary properties
      state[contactId] = {
        id: contactId,
        capabilities: {},
        other_skills: [],
        ...state[contactId],
      };

      const newSkill = result;
      const contact = state[contactId];
      if (contact.capabilities === undefined) {
        contact.capabilities = {};
      }
      if (contact.other_skills === undefined) {
        contact.other_skills = [];
      }

      // Clear skill out of everything first
      Object.values(contact.capabilities).forEach(capability => {
        contact.capabilities[capability.id].skills = capability.skills.filter(
          skill => skill.id !== newSkill.id
        );
        contact.capabilities[
          capability.id
        ].suggested_skills = capability.suggested_skills.filter(
          skill => skill.id !== newSkill.id
        );
      });
      contact.other_skills = contact.other_skills.filter(
        skill => skill.id !== newSkill.id
      );

      // If this skill isn't associated with any capabilities, add it to the
      // other skills
      if (
        newSkill.capabilities.length === 0 &&
        newSkill.suggested_capabilities.length === 0
      ) {
        contact.other_skills.push({id: newSkill.id, name: newSkill.name});
      } else {
        // Otherwise, add it to the relevant capabilities
        const alreadyAdded = {};
        const addSkill = key => capability => {
          // Don't add this skill more than once to the same capability
          if (alreadyAdded[capability.id]) {
            return;
          }

          if (contact.capabilities[capability.id] === undefined) {
            contact.capabilities[capability.id] = {
              skills: [],
              suggested_skills: [],
              ...capability,
            };
          }

          contact.capabilities[capability.id][key].push({
            id: newSkill.id,
            name: newSkill.name,
          });

          alreadyAdded[capability.id] = true;
        };
        newSkill.capabilities.forEach(addSkill('skills'));
        newSkill.suggested_capabilities.forEach(addSkill('suggested_skills'));
      }
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
    [DELETE_SESSION_API.RESOLVE]: (state, action) => {
      state.has_session = false;
      state.contact = null;
    },
    [ADD_CONTACT_API.RESOLVE]: (state, action) => {
      state.has_session = true;
      state.contact = action.body.data;
    },
  }
);
