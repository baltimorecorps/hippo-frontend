import {API_URL} from '../constants';
import {makeApiFetchActions} from '../lib/helpers';
import {fetchActionTypes} from 'redux-fetch-wrapper';
import {createReducer} from 'redux-starter-kit';

export const ADD_OPPORTUNITY = 'ADD_OPPORTUNITY';
export const ADD_OPPORTUNITY_API = fetchActionTypes(ADD_OPPORTUNITY);
export const addOpportunity = opportunity =>
  async function(dispatch) {
    dispatch({
      type: ADD_OPPORTUNITY,
      opportunity,
    });

    return await makeApiFetchActions(
      ADD_OPPORTUNITY,
      `${API_URL}/api/opportunity/`,
      {
        body: JSON.stringify(opportunity),
        method: 'POST',
      }
    )(dispatch);
  };

export const GET_ALL_OPPORTUNITIES = 'GET_ALL_OPPORTUNITIES';
export const GET_ALL_OPPORTUNITIES_API = fetchActionTypes(
  GET_ALL_OPPORTUNITIES
);
export const getAllOpportunities = makeApiFetchActions(
  GET_ALL_OPPORTUNITIES,
  `${API_URL}/api/opportunity/`
);

export const START_APPLICATION = 'START_APPLICATION';
export const START_APPLICATION_API = fetchActionTypes(START_APPLICATION);
export const startApplication = (contactId, opportunityId) =>
  async function(dispatch) {
    dispatch({
      type: START_APPLICATION,
      contact_id: contactId,
      opportunity_id: opportunityId,
    });

    return await makeApiFetchActions(
      START_APPLICATION,
      `${API_URL}/api/contacts/${contactId}/app/${opportunityId}/`,
      {
        method: 'POST',
      }
    )(dispatch);
  };

export const GET_APPLICATION = 'GET_APPLICATION';
export const GET_APPLICATION_API = fetchActionTypes(GET_APPLICATION);
export const getApplication = (contactId, opportunityId) =>
  makeApiFetchActions(
    GET_APPLICATION,
    `${API_URL}/api/contacts/${contactId}/app/${opportunityId}/`
  );

export const UPDATE_APPLICATION = 'UPDATE_APPLICATION';
export const UPDATE_APPLICATION_API = fetchActionTypes(UPDATE_APPLICATION);
export const updateApplication = application =>
  async function(dispatch) {
    dispatch({
      type: UPDATE_APPLICATION,
      application,
    });

    return await makeApiFetchActions(
      UPDATE_APPLICATION,
      `${API_URL}/api/contacts/${application.contact.id}/app/${application.opportunity.id}/`,
      {
        body: JSON.stringify(application),
        method: 'PUT',
      }
    )(dispatch);
  };

export const SUBMIT_APPLICATION = 'SUBMIT_APPLICATION';
export const SUBMIT_APPLICATION_API = fetchActionTypes(SUBMIT_APPLICATION);
export const submitApplication = application =>
  async function(dispatch) {
    dispatch({
      type: SUBMIT_APPLICATION,
      application,
    });

    return await makeApiFetchActions(
      SUBMIT_APPLICATION,
      `${API_URL}/api/contacts/${application.contact.id}/app/${application.opportunity.id}/submit/`,
      {
        method: 'POST',
      }
    )(dispatch);
  };

export const opportunitiesReducer = createReducer(
  {},
  {
    [ADD_OPPORTUNITY_API.RESOLVE]: (state, action) => {
      const opportunity = action.body.data;
      state[opportunity.id] = opportunity;
    },
    [GET_ALL_OPPORTUNITIES_API.RESOLVE]: (state, action) => {
      const newState = {};
      // clear out all old entries
      action.body.data.forEach(opportunity => {
        newState[opportunity.id] = opportunity;
      });
      return newState;
    },
  }
);
export const applicationsReducer = createReducer(
  {},
  {
    [START_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;
      state[application.id] = application;
    },
    [GET_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;
      state[application.id] = application;
    },
    [UPDATE_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;
      state[application.id] = application;
    },
    [SUBMIT_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;
      state[application.id] = application;
    },
  }
);