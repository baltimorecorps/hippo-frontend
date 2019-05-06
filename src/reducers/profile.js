import {createReducer} from 'redux-starter-kit';
import {combineReducers} from 'redux';
import {
  ADD_EXPERIENCE, 
  EXPERIENCES,
  EXPERIENCE,
} from '../actions/profile';

export const experiencesReducer = createReducer(
  {},
  {
    [`RESOLVE_${ADD_EXPERIENCE}`]: (state, action) => {
      const experience = action.body.data;
      state[experience.id] = experience;
    },
    [`RESOLVE_${EXPERIENCES}`]: (state, action) => {
      action.body.data.forEach((experience) => {
        state[experience.id] = experience;
      });
    },
    [`RESOLVE_${EXPERIENCE}`]: (state, action) => {
      const experience = action.body.data;
      state[experience.id] = experience;
    },
  },
);

export default experiencesReducer;
