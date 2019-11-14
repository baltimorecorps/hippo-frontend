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

const rootReducer = combineReducers({
  accounts,
  contacts,
  experiences,
  resume,
  tags,
  tagItems,
});

export default rootReducer;
