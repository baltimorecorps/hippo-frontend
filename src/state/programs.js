import {API_URL} from 'app/constants';
import {makeApiFetchActions} from 'lib/helperFunctions/helpers';
import {fetchActionTypes} from 'redux-fetch-wrapper';
import {createReducer} from 'redux-starter-kit';

// ---------------------------------------------------------------------------

export const GET_ALL_PROGRAM_NAMES = 'GET_PROGRAM_NAMES';
export const GET_ALL_PROGRAM_NAMES_API = fetchActionTypes(
  GET_ALL_PROGRAM_NAMES
);
export const getAllProgramNames = () =>
  makeApiFetchActions(GET_ALL_PROGRAM_NAMES, `${API_URL}/api/programs/`);

// ---------------------------------------------------------------------------

export const programsReducer = createReducer(
  {},
  {
    [GET_ALL_PROGRAM_NAMES_API.RESOLVE]: (state, action) => {
      const newState = {};
      // clear out all old entries
      action.body.data.forEach(program => {
        newState[program.id] = program;
      });
      return newState;
    },
  }
);
