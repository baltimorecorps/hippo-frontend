import {createReducer} from 'redux-starter-kit';
/* eslint-disable no-unused-vars */
import {
  ADD_NEW_PROGRAM,
  ADD_NEW_PROGRAM_API,
  UPDATE_PROGRAM,
  UPDATE_PROGRAM_API,
  GET_ALL_PROGRAMS,
  GET_ALL_PROGRAMS_API,
  GET_PROGRAM_QUESTIONS,
  GET_PROGRAM_QUESTIONS_API,
} from '../actions/programs';
/* eslint-enable no-unused-vars */

export const programsReducer = createReducer(
  {},
  {
    [ADD_NEW_PROGRAM_API.RESOLVE]: (state, action) => {
      const program = action.body.data;
      state[program.id] = program;
    },
    [GET_ALL_PROGRAMS_API.RESOLVE]: (state, action) => {
      const newState = {};
      // clear out all old entries
      action.body.data.forEach(program => {
        newState[program.id] = program;
      });
      return newState;
    },
    [GET_PROGRAM_QUESTIONS_API.RESOLVE]: (state, action) => {
      const newState = {};
      // clear out all old entries
      action.body.data.forEach(program => {
        newState[program.id] = program;
      });
      return newState;
    },

    [UPDATE_PROGRAM_API.RESOLVE]: (state, action) => {
      const program = action.body.data;
      state[program.id] = program;
    },
  }
);
