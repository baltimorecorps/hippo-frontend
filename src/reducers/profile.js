import {createReducer} from 'redux-starter-kit';
import {combineReducers} from 'redux';
import {
  ADD_EXPERIENCE, 
  REFRESH_EXPERIENCES,
  REFRESH_EXPERIENCE_TYPE,
  GET_EXPERIENCE,
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
      action.body.data.forEach((experience) => {
        newState[experience.id] = experience;
      });
      return newState;
    },
    [`RESOLVE_${REFRESH_EXPERIENCE_TYPE}`]: (state, action) => {
      const newState = {};
      // clear out all old entries with the rfreshed type
      Object.entries(state).forEach(([key, value]) => {
        if (value.type !== action.filter) {
          newState[key] = value;
        }
      });

      action.body.data.forEach((experience) => {
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

export default experiencesReducer;
