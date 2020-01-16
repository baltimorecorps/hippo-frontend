import {combineReducers} from 'redux';
import {
  contactsReducer as contacts,
  accountsReducer as accounts,
} from './contacts';
import {
  experiencesReducer as experiences,
  tagReducer as tags,
  tagItemReducer as tagItems,
} from './profile';
import resume from './resume';

import {programsReducer as programs} from './programs';

const rootReducer = combineReducers({
  accounts,
  contacts,
  programs,
  experiences,
  resume,
  tags,
  tagItems,
});

export default rootReducer;
