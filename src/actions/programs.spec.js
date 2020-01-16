import fetchMock from 'fetch-mock';
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
} from './programs';

afterEach(() => {
  fetchMock.restore();
});

describe('Programs', () => {
  test('Create new program action - success', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    // const data = {
    //   program_id: 1,
    //   contact_id: contactId,
    //   card_id: 'card',
    //   is_approved: false,
    //   is_active: true,
    //   stage: 1,
    //   responses: [
    //     {
    //       program_contact_id: 1,
    //       question_id: 1,
    //       response_text: 'Race and equity answer',
    //     },
    //     {
    //       program_contact_id: 1,
    //       question_id: 2,
    //       response_text: 'Race and equity answer',
    //     },
    //   ],
    // };

    // const program = data;

    // ---------------------------------------------------------------------
      const program = {data: 'test', contact_id: contactId};
      const response = {response: 'win'};

      fetchMock.post(`path:/api/contacts/${contactId}/programs/`, response);

      await addNewProgram(program)(dispatch);

      expect(dispatch.mock.calls.length).toBe(3);
      expect(dispatch.mock.calls[0][0].type).toBe(ADD_NEW_PROGRAM);
      expect(dispatch.mock.calls[0][0].program).toEqual(program);
      console.log(dispatch.mock.calls);
      expect(dispatch.mock.calls[1][0].type).toBe(ADD_NEW_PROGRAM_API.REQUEST);
      expect(dispatch.mock.calls[2][0].type).toBe(ADD_NEW_PROGRAM_API.RESOLVE);
      expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });

  // ---------------------------------------------------------------------

  // test('Create new experience action - failure', async function() {
  //   const dispatch = jest.fn();
  //   const contactId = 1234;
  //   const experience = {data: 'test', contact_id: contactId};

  //   fetchMock.post(`path:/api/contacts/${contactId}/experiences/`, {
  //     status: 500,
  //     body: '',
  //   });

  //   await addExperience(experience)(dispatch);

  //   expect(dispatch.mock.calls.length).toBe(3);
  //   expect(dispatch.mock.calls[2][0].type).toBe(ADD_EXPERIENCE_API.REJECT);
  //   expect(dispatch.mock.calls[2][0].statusCode).toBe(500);
  // });

  // test('Update experience action', async function() {
  //   const dispatch = jest.fn();
  //   const experience = {id: 4321, new_data: 'update'};

  //   fetchMock.put(`path:/api/experiences/${experience.id}/`, {
  //     body: {status: 'success'},
  //   });
  //   fetchMock.get(`path:/api/experiences/${experience.id}/`, {
  //     body: {status: 'success', data: experience},
  //   });

  //   await updateExperience(experience)(dispatch);

  //   expect(dispatch.mock.calls.length).toBe(5);
  //   expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_EXPERIENCE);
  //   expect(dispatch.mock.calls[1][0].type).toBe(UPDATE_EXPERIENCE_API.REQUEST);
  //   expect(dispatch.mock.calls[2][0].type).toBe(UPDATE_EXPERIENCE_API.RESOLVE);
  //   expect(dispatch.mock.calls[3][0].type).toBe(GET_EXPERIENCE_API.REQUEST);
  //   expect(dispatch.mock.calls[4][0].type).toBe(GET_EXPERIENCE_API.RESOLVE);
  //   expect(dispatch.mock.calls[0][0].experience).toBe(experience);
  // });

  // test('Refresh experiences by type action', async function() {
  //   const dispatch = jest.fn();
  //   const contactId = 1234;
  //   const expType = 'test';

  //   fetchMock.get(
  //     `path:/api/contacts/${contactId}/experiences/`,
  //     {body: {status: 'success', data: []}},
  //     {query: {type: expType}}
  //   );

  //   await refreshExperienceType(contactId, expType)(dispatch);

  //   expect(dispatch.mock.calls.length).toBe(2);
  //   expect(dispatch.mock.calls[0][0].type).toBe(
  //     REFRESH_EXPERIENCE_TYPE_API.REQUEST
  //   );
  //   expect(dispatch.mock.calls[1][0].type).toBe(
  //     REFRESH_EXPERIENCE_TYPE_API.RESOLVE
  //   );
  //   expect(dispatch.mock.calls[1][0].filter).toBe(expType);
  //   expect(
  //     fetchMock.called(`path:/api/contacts/${contactId}/experiences/`, {
  //       query: {type: expType},
  //     })
  //   ).toBe(true);
  // });

  // test('Delete experience action', async function() {
  //   const dispatch = jest.fn();
  //   const experience = {
  //     id: 4321,
  //     new_data: 'update',
  //     contact_id: 1234,
  //     type: 'Test',
  //   };

  //   fetchMock.delete(`path:/api/experiences/${experience.id}/`, {
  //     body: {status: 'success'},
  //   });
  //   fetchMock.get(
  //     `path:/api/contacts/${experience.contact_id}/experiences/`,
  //     {body: {status: 'success', data: []}},
  //     {query: {type: 'test'}}
  //   );

  //   await deleteExperience(experience)(dispatch);
  //   expect(dispatch.mock.calls.length).toBe(5);
  //   expect(dispatch.mock.calls[0][0].type).toBe(DELETE_EXPERIENCE);
  //   expect(dispatch.mock.calls[1][0].type).toBe(DELETE_EXPERIENCE_API.REQUEST);
  //   expect(dispatch.mock.calls[2][0].type).toBe(DELETE_EXPERIENCE_API.RESOLVE);
  //   expect(dispatch.mock.calls[3][0].type).toBe(
  //     REFRESH_EXPERIENCE_TYPE_API.REQUEST
  //   );
  //   expect(dispatch.mock.calls[4][0].type).toBe(
  //     REFRESH_EXPERIENCE_TYPE_API.RESOLVE
  //   );
  // });
});
