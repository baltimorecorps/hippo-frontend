import {API_URL} from 'app/constants';
import {makeApiFetchActions} from 'lib/helperFunctions/helpers';
import {fetchActionTypes} from 'redux-fetch-wrapper';
import {createReducer} from 'redux-starter-kit';

import {getContactCapabilities} from './contacts';

// Rules for action creators:
//
// Each action creator should make sure to include any actions necessary to
// ensure that the Redux state doesn't get out of date (e.g. any state that
// we had that was updated should be updated)

export const ADD_EXPERIENCE = 'ADD_EXPERIENCE';
export const ADD_EXPERIENCE_API = fetchActionTypes(ADD_EXPERIENCE);
export const addExperience = experience =>
  async function(dispatch) {
    dispatch({
      type: ADD_EXPERIENCE,
      experience,
    });

    await makeApiFetchActions(
      ADD_EXPERIENCE,
      `${API_URL}/api/contacts/${experience.contact_id}/experiences/`,
      {
        body: JSON.stringify(experience),
        method: 'POST',
        credentials: 'include',
      }
    )(dispatch);
  };

export const GET_EXPERIENCE = 'GET_EXPERIENCE';
export const GET_EXPERIENCE_API = fetchActionTypes(GET_EXPERIENCE);
export const getExperience = expId =>
  makeApiFetchActions(GET_EXPERIENCE, `${API_URL}/api/experiences/${expId}/`);

export const UPDATE_EXPERIENCE = 'UPDATE_EXPERIENCE';
export const UPDATE_EXPERIENCE_API = fetchActionTypes(UPDATE_EXPERIENCE);
export const updateExperience = experience =>
  async function(dispatch) {
    dispatch({
      type: UPDATE_EXPERIENCE,
      experience,
    });

    await makeApiFetchActions(
      UPDATE_EXPERIENCE,
      `${API_URL}/api/experiences/${experience.id}/`,
      {
        body: JSON.stringify(experience),
        method: 'PUT',
      }
    )(dispatch);
    await Promise.all([
      getExperience(experience.id)(dispatch),
      getContactCapabilities(experience.contact_id)(dispatch),
    ]);
  };

export const REFRESH_EXPERIENCES = 'REFRESH_EXPERIENCES';
export const REFRESH_EXPERIENCES_API = fetchActionTypes(REFRESH_EXPERIENCES);
export const refreshExperiences = contactId =>
  makeApiFetchActions(
    REFRESH_EXPERIENCES,
    `${API_URL}/api/contacts/${contactId}/experiences/`
  );

export const REFRESH_EXPERIENCE_TYPE = 'REFRESH_EXPERIENCE_TYPE';
export const REFRESH_EXPERIENCE_TYPE_API = fetchActionTypes(
  REFRESH_EXPERIENCE_TYPE
);
export const refreshExperienceType = (contactId, expType) => {
  expType = expType.toLowerCase();
  return makeApiFetchActions(
    REFRESH_EXPERIENCE_TYPE,
    `${API_URL}/api/contacts/${contactId}/experiences/?type=${expType}`,
    null,
    {
      onResolve: resolveAction => ({
        ...resolveAction,
        filter: expType,
      }),
    }
  );
};

export const DELETE_EXPERIENCE = 'DELETE_EXPERIENCE';
export const DELETE_EXPERIENCE_API = fetchActionTypes(DELETE_EXPERIENCE);
export const deleteExperience = experience =>
  async function(dispatch) {
    dispatch({
      type: DELETE_EXPERIENCE,
      experience: experience,
    });

    await makeApiFetchActions(
      DELETE_EXPERIENCE,
      `${API_URL}/api/experiences/${experience.id}/`,
      {
        method: 'DELETE',
      }
    )(dispatch);

    await refreshExperienceType(
      experience.contact_id,
      experience.type
    )(dispatch);
  };
// ---------------------------------------------------------------------------

//////////////
// REDUCERS //
//////////////

export const experiencesReducer = createReducer(
  {},
  {
    [ADD_EXPERIENCE_API.RESOLVE]: (state, action) => {
      const experience = action.body.data;
      state[experience.id] = experience;
    },
    [REFRESH_EXPERIENCES_API.RESOLVE]: (state, action) => {
      const newState = {};
      // clear out all old entries
      action.body.data.forEach(experience => {
        newState[experience.id] = experience;
      });
      return newState;
    },
    [REFRESH_EXPERIENCE_TYPE_API.RESOLVE]: (state, action) => {
      const newState = {};
      // clear out all old entries with the rfreshed type
      Object.entries(state).forEach(([key, value]) => {
        if (value.type.toLowerCase() !== action.filter.toLowerCase()) {
          newState[key] = value;
        }
      });

      action.body.data.forEach(experience => {
        newState[experience.id] = experience;
      });
      return newState;
    },
    [GET_EXPERIENCE_API.RESOLVE]: (state, action) => {
      const experience = action.body.data;
      state[experience.id] = experience;
    },
  }
);
