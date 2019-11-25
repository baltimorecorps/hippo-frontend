import {createReducer} from 'redux-starter-kit';

/* eslint-disable no-unused-vars */
import {
  GET_CONTACT_API,
  ALL_CONTACTS,
  ALL_CONTACTS_API,
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

    [UPDATE_CONTACT_API.RESOLVE]: (state, action) => {
      const contact = action.body.data;
      state[contact.id] = contact;
    },

    [CREATE_RESUME_API.RESOLVE]: (state, action) => {
      if (!action.body) {
        return {};
      }
      const {data} = action.body;
      return {
        ...state,
        [data.contact.id]: {
          ...data.contact,
        },
      };
    },
  }
);

export default contactsReducer;
