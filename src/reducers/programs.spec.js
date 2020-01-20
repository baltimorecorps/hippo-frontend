import {experiencesReducer, tagReducer, tagItemReducer} from './profile';
import {programsReducer} from './programs';

import {
  ADD_NEW_PROGRAM,
  ADD_NEW_PROGRAM_API,
  addNewProgram,
  UPDATE_PROGRAM,
  UPDATE_PROGRAM_API,
  updateProgram,
  GET_ALL_PROGRAMS,
  GET_ALL_PROGRAMS_API,
  refreshPrograms,
  GET_PROGRAM_QUESTIONS,
  GET_PROGRAM_QUESTIONS_API,
  refreshQuestions,
} from '../actions/programs';

describe('Program state', () => {
  let initialState = {};
  beforeEach(() => {
    initialState = {};
  });
  test('initial state', () => {
    const newState = experiencesReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test('Add new program - request resolved', () => {
    const program = {id: 1234, other_stuff: 'data'};
    const newState = programsReducer(initialState, {
      type: ADD_NEW_PROGRAM_API.RESOLVE,
      body: {data: program},
    });
    expect(newState).toHaveProperty('1234');
    expect(newState[1234]).toEqual(program);
  });

  test('Add new program - request resolved', () => {
    const oldProgram = {id: 1234, other_stuff: 'data'};
    const program = {id: 1234, other_stuff: 'new data'};
    initialState[1234] = oldProgram;

    const newState = programsReducer(initialState, {
      type: ADD_NEW_PROGRAM_API.RESOLVE,
      body: {data: program},
    });
    expect(newState).toHaveProperty('1234');
    expect(newState[1234]).toEqual(program);
  });

  test('Add new program - request rejected', () => {
    const oldProgram = {id: 1234, other_stuff: 'data'};
    const program = {id: 1234, other_stuff: 'new data'};
    const startState = initialState;
    startState[1234] = oldProgram;
    const newState = programsReducer(startState, {
      type: ADD_NEW_PROGRAM_API.REJECT,
      program: program,
    });
    expect(newState).toEqual(startState);
  });

  test('Refresh all programs', () => {
    const programs = [
      {id: 11, title: 'program 1'},
      {id: 12, title: 'program 2'},
      {id: 16, title: 'program 6'},
      {id: 15, title: 'program 5'},
    ];

    initialState = {
      10: {id: 10, title: 'program 0'},
    };
    const newState = programsReducer(initialState, {
      type: GET_ALL_PROGRAMS_API.RESOLVE,
      body: {status: 'success', data: programs},
    });
    expect(newState).toEqual({
      11: {id: 11, title: 'program 1'},
      12: {id: 12, title: 'program 2'},
      16: {id: 16, title: 'program 6'},
      15: {id: 15, title: 'program 5'},
    });
  });
});
