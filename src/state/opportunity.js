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
export const GET_ALL_OPPORTUNITIES_API = fetchActionTypes(GET_ALL_OPPORTUNITIES);
export const getAllOpportunities = makeApiFetchActions(
    GET_ALL_OPPORTUNITIES,
    `${API_URL}/api/opportunity/`
  );

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
)




