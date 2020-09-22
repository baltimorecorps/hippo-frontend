import fetchMock from 'fetch-mock';

// import {experiencesReducer} from './profile';
// import {
// ADD_NEW_PROGRAM,
// ADD_NEW_PROGRAM_API,
// addNewProgram,
// UPDATE_PROGRAM,
// UPDATE_PROGRAM_API,
// updateProgram,
// GET_ALL_PROGRAMS,
// GET_ALL_PROGRAMS_API,
// refreshPrograms,
// GET_PROGRAM_QUESTIONS,
// GET_PROGRAM_QUESTIONS_API,
// refreshQuestions,
// programsReducer,
// } from './programs';

afterEach(() => {
  fetchMock.restore();
});

describe('Programs', () => {
  test('Create new program action - success', async function() {
    const dispatch = jest.fn();
    //     const contactId = 1234;

    //     const program = {data: 'test', contact_id: contactId};
    //     const response = {response: 'win'};

    //     fetchMock.post(`path:/api/contacts/${contactId}/programs/`, response);

    //     await addNewProgram(program)(dispatch);

    // expect(dispatch.mock.calls.length).toBe(3);
    //     expect(dispatch.mock.calls[0][0].type).toBe(ADD_NEW_PROGRAM);
    //     expect(dispatch.mock.calls[0][0].program).toEqual(program);
    //     expect(dispatch.mock.calls[1][0].type).toBe(ADD_NEW_PROGRAM_API.REQUEST);
    //     expect(dispatch.mock.calls[2][0].type).toBe(ADD_NEW_PROGRAM_API.RESOLVE);
    //     expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });
});

// describe('Program state', () => {
//   let initialState = {};
//   beforeEach(() => {
//     initialState = {};
//   });
//   test('initial state', () => {
//     const newState = experiencesReducer(undefined, {});
//     expect(newState).toEqual(initialState);
//   });
//   test('Add new program - request resolved', () => {
//     const program = {id: 1234, other_stuff: 'data'};
//     const newState = programsReducer(initialState, {
//       type: ADD_NEW_PROGRAM_API.RESOLVE,
//       body: {data: program},
//     });
//     expect(newState).toHaveProperty('1234');
//     expect(newState[1234]).toEqual(program);
//   });

//   test('Add new program - request resolved', () => {
//     const oldProgram = {id: 1234, other_stuff: 'data'};
//     const program = {id: 1234, other_stuff: 'new data'};
//     initialState[1234] = oldProgram;

//     const newState = programsReducer(initialState, {
//       type: ADD_NEW_PROGRAM_API.RESOLVE,
//       body: {data: program},
//     });
//     expect(newState).toHaveProperty('1234');
//     expect(newState[1234]).toEqual(program);
//   });

//   test('Add new program - request rejected', () => {
//     const oldProgram = {id: 1234, other_stuff: 'data'};
//     const program = {id: 1234, other_stuff: 'new data'};
//     const startState = initialState;
//     startState[1234] = oldProgram;
//     const newState = programsReducer(startState, {
//       type: ADD_NEW_PROGRAM_API.REJECT,
//       program: program,
//     });
//     expect(newState).toEqual(startState);
//   });

//   test('Refresh all programs', () => {
//     const programs = [
//       {id: 11, title: 'program 1'},
//       {id: 12, title: 'program 2'},
//       {id: 16, title: 'program 6'},
//       {id: 15, title: 'program 5'},
//     ];

//     initialState = {
//       10: {id: 10, title: 'program 0'},
//     };
//     const newState = programsReducer(initialState, {
//       type: GET_ALL_PROGRAMS_API.RESOLVE,
//       body: {status: 'success', data: programs},
//     });
//     expect(newState).toEqual({
//       11: {id: 11, title: 'program 1'},
//       12: {id: 12, title: 'program 2'},
//       16: {id: 16, title: 'program 6'},
//       15: {id: 15, title: 'program 5'},
//     });
//   });
// });
