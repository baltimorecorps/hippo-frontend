import {combineReducers} from 'redux';
// import {
//   contactsReducer as contacts,
//   // accountsReducer as accounts,
// } from './contacts';
import {capabilitiesReducer as capabilities} from './capabilities';
import {experiencesReducer as experiences} from './profile';
import {
  opportunitiesReducer as opportunities,
  applicationsReducer as applications,
  applicantsReducer as applicants,
} from './opportunity';

import {programsReducer as programs} from './programs';

import {authReducer as auth} from './auth/auth.reducer'
import {contactsReducer as contacts } from './contacts/contacts.reducer'


const rootReducer = combineReducers({
  auth,
  contacts,
  capabilities,
  programs,
  experiences,
  opportunities,
  applications,
  applicants,
});

export default rootReducer;
