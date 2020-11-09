import {fetchActionTypes} from 'redux-fetch-wrapper';

import {API_URL} from 'app/constants';
import {makeApiFetchActions} from 'lib/helperFunctions/helpers';
import {makeAuthFetchActions} from 'lib/Auth0/auth0';


export const GET_SESSION_API = fetchActionTypes('GET_SESSION');
export const getSession = () =>
  makeApiFetchActions('GET_SESSION', `${API_URL}/api/session/`, {
    credentials: 'include',
  });

export const CREATE_SESSION_API = fetchActionTypes('CREATE_SESSION');
export const createSession = authToken =>
  makeAuthFetchActions(authToken, 'CREATE_SESSION', `${API_URL}/api/session/`, {
    method: 'POST',
  });

export const DELETE_SESSION_API = fetchActionTypes('DELETE_SESSION');
export const deleteSession = () =>
  makeApiFetchActions('DELETE_SESSION', `${API_URL}/api/session/`, {
    method: 'DELETE',
    credentials: 'include',
  });