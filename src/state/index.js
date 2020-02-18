import {combineReducers} from 'redux';
import {
  contactsReducer as contacts,
  accountsReducer as accounts,
} from './contacts';
import {capabilitiesReducer as capabilities} from './capabilities';
import {
  experiencesReducer as experiences,
  tagReducer as tags,
  tagItemReducer as tagItems,
} from './profile';
import resume from './resume';
import {
  opportunitiesReducer as opportunities,
  applicationsReducer as applications,
}from './opportunity';

import {programsReducer as programs} from './programs';

const rootReducer = combineReducers({
  accounts,
  contacts,
  capabilities,
  programs,
  experiences,
  resume,
  tags,
  tagItems,
  opportunities,
  applications,
});

export default rootReducer;
