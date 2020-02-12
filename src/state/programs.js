import {API_URL} from '../app/constants';
import {makeFetchActions, fetchActionTypes} from 'redux-fetch-wrapper';
import {createReducer} from 'redux-starter-kit';

// ## REDUX ACTION TYPES ##
export const ADD_NEW_PROGRAM = 'ADD_NEW_PROGRAM';
export const UPDATE_PROGRAM = 'UPDATE_PROGRAM';

export const GET_ALL_PROGRAMS = 'GET_ALL_PROGRAMS';
export const GET_PROGRAM_QUESTIONS = 'GET_PROGRAM_QUESTIONS';

// ## API ACTION TYPES ##
export const ADD_NEW_PROGRAM_API = fetchActionTypes(ADD_NEW_PROGRAM);
export const UPDATE_PROGRAM_API = fetchActionTypes(UPDATE_PROGRAM);
export const GET_ALL_PROGRAMS_API = fetchActionTypes(GET_ALL_PROGRAMS);
export const GET_PROGRAM_QUESTIONS_API = fetchActionTypes(
  GET_PROGRAM_QUESTIONS
);

// Note on naming convention here:
// All fetch API methods creators are prefixed with 'api' for clarity in use
// ## API ACTION CREATORS ##

// Creates a new program_contact record, and related response records (if provided)
const apiAddNewProgram = program =>
  makeFetchActions(
    ADD_NEW_PROGRAM,
    `${API_URL}/api/contacts/${program.contact_id}/programs/`,
    {
      body: JSON.stringify(program),
      method: 'POST',
    }
  );

// Updates the program member record, including responses to the related questions
const apiUpdateProgram = program =>
  makeFetchActions(
    UPDATE_PROGRAM,
    `${API_URL}/api/contacts/${program.contact_id}/programs/${program.program.id}/`,
    {
      body: JSON.stringify(program),
      method: 'PUT',
    }
  );

// Get a list of all of the programs the contact is being considered
// for and the stage of their application for that program
export const apiGetAllPrograms = contactId =>
  makeFetchActions(
    GET_ALL_PROGRAMS,
    `${API_URL}/api/contacts/${contactId}/programs/`
  );

// Returns a list of all of the questions associated with a particular program
export const apiGetProgramQuestions = program =>
  makeFetchActions(
    GET_PROGRAM_QUESTIONS,
    `${API_URL}/api/contacts/${program.contact_id}/programs/${program.id}/`
  );

// ---------------------------------------------------------------------------------------------------

// ## ACTION CREATORS ##
// export const refreshPrograms = apiGetAllPrograms();

export const refreshPrograms = contactId =>
  async function(dispatch) {
    dispatch({
      type: GET_ALL_PROGRAMS,
    });

    return await apiGetAllPrograms(contactId)(dispatch);
  };

export const addNewProgram = program =>
  async function(dispatch) {
    dispatch(addNewProgramLocal(program));
    const result = await apiAddNewProgram(program)(dispatch);
    return result;
  };

const addNewProgramLocal = program => ({
  type: ADD_NEW_PROGRAM,
  program,
});

export const updateProgram = program =>
  async function(dispatch) {
    dispatch({
      type: UPDATE_PROGRAM,
      program,
    });

    return await apiUpdateProgram(program)(dispatch);
  };

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
