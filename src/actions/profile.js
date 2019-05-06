import {API_URL} from '../constants';
import fetchActionCreator from 'fetch-action-creator';

// Rules for action creators:
//
// Each action creator should make sure to include any actions necessary to
// ensure that the Redux state doesn't get out of date (e.g. any state that
// we had that was updated should be updated)

export const ADD_EXPERIENCE = 'ADD_EXPERIENCE';
export const addExperience = experience =>
  async function(dispatch) {
    dispatch({
      type: ADD_EXPERIENCE,
      experience,
    });

    await fetchActionCreator(
      ADD_EXPERIENCE,
      `${API_URL}/api/contacts/${experience.contact_id}/experiences/`,
      {
        body: JSON.stringify(experience),
        method: 'POST',
      },
    )(dispatch);
  };

export const GET_EXPERIENCE = 'GET_EXPERIENCE';
export const getExperience = expId =>
  fetchActionCreator(GET_EXPERIENCE, `${API_URL}/api/experiences/${expId}/`);

export const UPDATE_EXPERIENCE = 'UPDATE_EXPERIENCE';
export const updateExperience = experience =>
  async function(dispatch) {
    dispatch({
      type: UPDATE_EXPERIENCE,
      experience,
    });

    await fetchActionCreator(
      UPDATE_EXPERIENCE,
      `${API_URL}/api/experiences/${experience.id}/`,
      {
        body: JSON.stringify(experience),
        method: 'PUT',
      },
    )(dispatch);
    await getExperience(experience.id)(dispatch);
  };

export const REFRESH_EXPERIENCES = 'REFRESH_EXPERIENCES';
export const refreshExperiences = contactId =>
  fetchActionCreator(
    REFRESH_EXPERIENCES,
    `${API_URL}/api/contacts/${contactId}/experiences/`,
  );

export const REFRESH_EXPERIENCE_TYPE = 'REFRESH_EXPERIENCE_TYPE';
export const refreshExperienceType = (contactId, expType) =>
  fetchActionCreator(
    REFRESH_EXPERIENCE_TYPE,
    `${API_URL}/api/contacts/${contactId}/experiences/?type=${expType}`,
    null,
    {
      onResolve: resolveAction => ({
        ...resolveAction,
        filter: expType,
      }),
    },
  );

export const DELETE_EXPERIENCE = 'DELETE_EXPERIENCE';
export const deleteExperience = experience =>
  async function(dispatch) {
    dispatch({
      type: DELETE_EXPERIENCE,
      experience: experience,
    });

    await fetchActionCreator(
      DELETE_EXPERIENCE,
      `${API_URL}/api/experiences/${experience.id}/`,
      {method: 'DELETE'},
    )(dispatch);

    await refreshExperienceType(experience.contact_id, experience.type)(
      dispatch,
    );
  };
