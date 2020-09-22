import {combineReducers} from 'redux';
import {
  contactsReducer as contacts,
  accountsReducer as accounts,
} from './contacts';
import {capabilitiesReducer as capabilities} from './capabilities';
import {experiencesReducer as experiences} from './profile';
import resume from './resume';
import {
  opportunitiesReducer as opportunities,
  applicationsReducer as applications,
  applicantsReducer as applicants,
} from './opportunity';

import {programsReducer as programs} from './programs';

const rootReducer = combineReducers({
  accounts,
  contacts,
  capabilities,
  programs,
  experiences,
  resume,
  opportunities,
  applications,
  applicants,
});

export default rootReducer;
