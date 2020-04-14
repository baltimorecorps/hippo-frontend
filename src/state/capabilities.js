import {createReducer} from 'redux-starter-kit';
import {fetchActionTypes} from 'redux-fetch-wrapper';
import {makeApiFetchActions} from 'lib/helperFunctions/helpers';
import {makeAuthFetchActions} from 'lib/Auth0/auth0';

import {API_URL} from 'app/constants';

export const GET_CAPABILITIES_API = fetchActionTypes('GET_CAPABILITIES');
export const getCapabilities = 
  makeApiFetchActions('GET_CAPABILITIES', `${API_URL}/api/capabilities/`);

export const capabilitiesReducer = createReducer(
  [],
  {
    [GET_CAPABILITIES_API.RESOLVE]: (state, action) => {
      return action.body.data;
    },

  }
);


