import { createReducer } from 'redux-starter-kit';

import { ALL_CONTACTS } from '../actions/contacts';

export const contactsReducer = createReducer([], {
  [`RESOLVE_${ALL_CONTACTS}`]: (state, action) => {
    if (!action.body) {
      return [];
    } else {
      return action.body.data;
    }
  },
});

export default contactsReducer;
