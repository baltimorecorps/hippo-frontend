import { createReducer } from 'redux-starter-kit';

import { ALL_CONTACTS, ALL_CONTACTS_API } from '../actions/contacts';

export const contactsReducer = createReducer({}, {
  [ALL_CONTACTS_API.RESOLVE]: (state, action) => {
    if (!action.body) {
      return {};
    } else {
      let newState = {};
      action.body.data.forEach((contact) => {
        newState[contact.id] = contact;
      });
      return newState;
    }
  },
});

export default contactsReducer;
