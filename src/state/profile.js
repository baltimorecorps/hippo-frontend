import {API_URL} from 'app/constants';
import {makeFetchActions, fetchActionTypes} from 'redux-fetch-wrapper';
import {createReducer} from 'redux-starter-kit';

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

    await makeFetchActions(
      ADD_EXPERIENCE,
      `${API_URL}/api/contacts/${experience.contact_id}/experiences/`,
      {
        body: JSON.stringify(experience),
        method: 'POST',
      }
    )(dispatch);
  };

export const GET_EXPERIENCE = 'GET_EXPERIENCE';
export const GET_EXPERIENCE_API = fetchActionTypes(GET_EXPERIENCE);
export const getExperience = expId =>
  makeFetchActions(GET_EXPERIENCE, `${API_URL}/api/experiences/${expId}/`);

export const UPDATE_EXPERIENCE = 'UPDATE_EXPERIENCE';
export const UPDATE_EXPERIENCE_API = fetchActionTypes(UPDATE_EXPERIENCE);
export const updateExperience = experience =>
  async function(dispatch) {
    dispatch({
      type: UPDATE_EXPERIENCE,
      experience,
    });

    await makeFetchActions(
      UPDATE_EXPERIENCE,
      `${API_URL}/api/experiences/${experience.id}/`,
      {
        body: JSON.stringify(experience),
        method: 'PUT',
      }
    )(dispatch);
    await getExperience(experience.id)(dispatch);
  };

export const REFRESH_EXPERIENCES = 'REFRESH_EXPERIENCES';
export const REFRESH_EXPERIENCES_API = fetchActionTypes(REFRESH_EXPERIENCES);
export const refreshExperiences = contactId =>
  makeFetchActions(
    REFRESH_EXPERIENCES,
    `${API_URL}/api/contacts/${contactId}/experiences/`
  );

export const REFRESH_EXPERIENCE_TYPE = 'REFRESH_EXPERIENCE_TYPE';
export const REFRESH_EXPERIENCE_TYPE_API = fetchActionTypes(
  REFRESH_EXPERIENCE_TYPE
);
export const refreshExperienceType = (contactId, expType) => {
  expType = expType.toLowerCase();
  return makeFetchActions(
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

    await makeFetchActions(
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

export const ADD_TAG = 'ADD_TAG';
export const ADD_TAG_API = fetchActionTypes(ADD_TAG);
export const addTag = tag =>
  makeFetchActions(ADD_TAG, `${API_URL}/api/tags/`, {
    method: 'POST',
    body: JSON.stringify(tag),
  });

export const REFRESH_TAGS = 'REFRESH_TAGS';
export const REFRESH_TAGS_API = fetchActionTypes(REFRESH_TAGS);
export const refreshTags = () =>
  makeFetchActions(REFRESH_TAGS, `${API_URL}/api/tags/`);

export const ADD_TAG_ITEM = 'ADD_TAG_ITEM';
export const ADD_TAG_ITEM_API = fetchActionTypes(ADD_TAG_ITEM);
export const addTagItem = tagItem =>
  async function(dispatch) {
    dispatch({
      type: ADD_TAG_ITEM,
      tag: tagItem,
    });

    if (!tagItem.hasOwnProperty('tag_id')) {
      const tag = {
        name: tagItem.name,
        type: tagItem.type,
      };

      const newTagAction = await addTag(tag)(dispatch);
      tagItem.tag_id = newTagAction.body.data.id;
    }

    await makeFetchActions(
      ADD_TAG_ITEM,
      `${API_URL}/api/contacts/${tagItem.contact_id}/tags/`,
      {
        method: 'POST',
        body: JSON.stringify(tagItem),
      }
    )(dispatch);
  };

export const UPDATE_TAG_ITEM = 'UPDATE_TAG_ITEM';
export const UPDATE_TAG_ITEM_API = fetchActionTypes(UPDATE_TAG_ITEM);
export const updateTagItem = tagItem =>
  async function(dispatch) {
    dispatch({
      type: UPDATE_TAG_ITEM,
      tag: tagItem,
    });

    await makeFetchActions(
      UPDATE_TAG_ITEM,
      `${API_URL}/api/contacts/${tagItem.contact_id}/tags/${tagItem.tag_id}/`,
      {
        method: 'PUT',
        body: JSON.stringify(tagItem),
      }
    )(dispatch);
  };

export const DELETE_TAG_ITEM = 'DELETE_TAG_ITEM';
export const DELETE_TAG_ITEM_API = fetchActionTypes(DELETE_TAG_ITEM);
export const deleteTagItem = tagItem =>
  async function(dispatch) {
    dispatch({
      type: DELETE_TAG_ITEM,
      tag: tagItem,
    });

    await makeFetchActions(
      DELETE_TAG_ITEM,
      `${API_URL}/api/contacts/${tagItem.contact_id}/tags/${tagItem.tag_id}/`,
      {
        method: 'DELETE',
      }
    )(dispatch);

    await refreshTagItems(tagItem.contact_id, tagItem.type)(dispatch);
  };

export const REFRESH_TAG_ITEMS = 'REFRESH_TAG_ITEMS';
export const REFRESH_TAG_ITEMS_API = fetchActionTypes(REFRESH_TAG_ITEMS);
export const refreshTagItems = (contactId, tagType) =>
  async function(dispatch) {
    tagType = tagType.toLowerCase();
    await makeFetchActions(
      REFRESH_TAG_ITEMS,
      `${API_URL}/api/contacts/${contactId}/tags/?type=${tagType}`,
      null,
      {
        onResolve: resolveAction => ({
          ...resolveAction,
          filter: tagType,
          contactId: contactId,
        }),
      }
    )(dispatch);
  };

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

export const tagReducer = createReducer(
  {},
  {
    [ADD_TAG_API.RESOLVE]: (state, action) => {
      const tag = action.body.data;
      state[tag.id] = tag;
    },
    [REFRESH_TAGS_API.RESOLVE]: (state, action) => {
      const newState = {};
      // clear out all old entries
      action.body.data.forEach(tag => {
        newState[tag.id] = tag;
      });
      return newState;
    },
  }
);

export const tagItemReducer = createReducer(
  {},
  {
    [ADD_TAG_ITEM_API.RESOLVE]: (state, action) => {
      const tagItem = action.body.data;
      if (!state.hasOwnProperty(tagItem.contact_id)) {
        state[tagItem.contact_id] = {};
      }
      state[tagItem.contact_id][tagItem.tag_id] = tagItem;
    },
    [REFRESH_TAG_ITEMS_API.RESOLVE]: (state, action) => {
      const contactState = state[action.contactId];
      let newContactState = {};

      if (contactState) {
        // clear out all old entries with the refreshed type
        Object.entries(contactState).forEach(([key, value]) => {
          if (value.type.toLowerCase() !== action.filter.toLowerCase()) {
            newContactState[key] = value;
          }
        });
      }
      action.body.data.forEach(tagItem => {
        newContactState[tagItem.tag_id] = tagItem;
      });
      state[action.contactId] = newContactState;
    },
    [UPDATE_TAG_ITEM_API.RESOLVE]: (state, action) => {
      const tagItem = action.body.data;
      state[tagItem.contact_id][tagItem.tag_id] = tagItem;
    },
  }
);
