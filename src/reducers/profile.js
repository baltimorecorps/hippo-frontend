import {createReducer} from 'redux-starter-kit';
/* eslint-disable no-unused-vars */
import {
  ADD_EXPERIENCE,
  ADD_EXPERIENCE_API,
  REFRESH_EXPERIENCES,
  REFRESH_EXPERIENCES_API,
  REFRESH_EXPERIENCE_TYPE,
  REFRESH_EXPERIENCE_TYPE_API,
  GET_EXPERIENCE,
  GET_EXPERIENCE_API,
  ADD_TAG,
  ADD_TAG_API,
  REFRESH_TAGS,
  REFRESH_TAGS_API,
  ADD_TAG_ITEM,
  ADD_TAG_ITEM_API,
  UPDATE_TAG_ITEM,
  UPDATE_TAG_ITEM_API,
  REFRESH_TAG_ITEMS,
  REFRESH_TAG_ITEMS_API,
} from '../actions/profile';
/* eslint-enable no-unused-vars */

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
