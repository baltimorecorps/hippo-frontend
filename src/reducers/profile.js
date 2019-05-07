import {createReducer} from 'redux-starter-kit';
import {combineReducers} from 'redux';
import {
  ADD_EXPERIENCE,
  REFRESH_EXPERIENCES,
  REFRESH_EXPERIENCE_TYPE,
  GET_EXPERIENCE,
  ADD_TAG,
  REFRESH_TAGS,
  ADD_TAG_ITEM,
  UPDATE_TAG_ITEM,
  REFRESH_TAG_ITEMS,
} from '../actions/profile';

export const experiencesReducer = createReducer(
  {},
  {
    [`RESOLVE_${ADD_EXPERIENCE}`]: (state, action) => {
      const experience = action.body.data;
      state[experience.id] = experience;
    },
    [`RESOLVE_${REFRESH_EXPERIENCES}`]: (state, action) => {
      const newState = {};
      // clear out all old entries
      action.body.data.forEach(experience => {
        newState[experience.id] = experience;
      });
      return newState;
    },
    [`RESOLVE_${REFRESH_EXPERIENCE_TYPE}`]: (state, action) => {
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
    [`RESOLVE_${GET_EXPERIENCE}`]: (state, action) => {
      const experience = action.body.data;
      state[experience.id] = experience;
    },
  },
);

export const tagReducer = createReducer(
  {},
  {
    [`RESOLVE_${ADD_TAG}`]: (state, action) => {
      const tag = action.body.data;
      state[tag.id] = tag;
    },
    [`RESOLVE_${REFRESH_TAGS}`]: (state, action) => {
      const newState = {};
      // clear out all old entries
      action.body.data.forEach(tag => {
        newState[tag.id] = tag;
      });
      return newState;
    },
  },
);

export const tagItemReducer = createReducer(
  {},
  {
    [`RESOLVE_${ADD_TAG_ITEM}`]: (state, action) => {
      const tagItem = action.body.data;
      if (!state.hasOwnProperty(tagItem.contact_id)) {
        state[tagItem.contact_id] = {};
      }
      state[tagItem.contact_id][tagItem.tag_id] = tagItem;
    },
    [`RESOLVE_${REFRESH_TAG_ITEMS}`]: (state, action) => {
      const contactState = state[action.contactId];
      let newContactState = {};
      // clear out all old entries with the refreshed type
      Object.entries(contactState).forEach(([key, value]) => {
        if (value.type.toLowerCase() !== action.filter.toLowerCase()) {
          newContactState[key] = value;
        }
      });

      action.body.data.forEach(tagItem => {
        newContactState[tagItem.tag_id] = tagItem;
      });
      state[action.contactId] = newContactState;
    },
    [`RESOLVE_${UPDATE_TAG_ITEM}`]: (state, action) => {
      const tagItem = action.body.data;
      state[tagItem.contact_id][tagItem.tag_id] = tagItem;
    },
  },
);
