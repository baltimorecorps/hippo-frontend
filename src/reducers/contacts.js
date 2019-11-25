import {createReducer} from 'redux-starter-kit';

/* eslint-disable no-unused-vars */
import {
  ALL_CONTACTS,
  ALL_CONTACTS_API,
  ADD_CONTACT_API,
  GET_CONTACT_API,
  GET_MY_CONTACT_API,
  UPDATE_CONTACT_API,
} from '../actions/contacts';
import {CREATE_RESUME, CREATE_RESUME_API} from 'actions/resume';
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
    [ADD_CONTACT_API.RESOLVE]: (state, action) => {
      const contact = action.body.data;
      if (contact.account_id) {
        state[contact.account_id] = contact;
      }
    },
  }
);
