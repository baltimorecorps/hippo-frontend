import {createReducer} from 'redux-starter-kit';
import {CREATE_SESSION_API,GET_SESSION_API, DELETE_SESSION_API} from './auth.actions'
import {GET_ALL_CONTACTS_API, GET_MY_CONTACT_API, ADD_CONTACT_API} from '../contacts/contacts.actions'

export const authReducer = createReducer(
    {},
    {
      [GET_ALL_CONTACTS_API.RESOLVE]: (state, action) => {
        if (!action.body) {
          return {};
        } else {
          state.short = action.body.data;
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