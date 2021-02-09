import fetchMock from 'fetch-mock';
import {
  experiencesReducer,
  GET_EXPERIENCE,
  GET_EXPERIENCE_API,
  ADD_EXPERIENCE,
  ADD_EXPERIENCE_API,
  UPDATE_EXPERIENCE,
  UPDATE_EXPERIENCE_API,
  DELETE_EXPERIENCE,
  DELETE_EXPERIENCE_API,
  REFRESH_EXPERIENCES,
  REFRESH_EXPERIENCES_API,
  REFRESH_EXPERIENCE_TYPE,
  REFRESH_EXPERIENCE_TYPE_API,
  addExperience,
  updateExperience,
  deleteExperience,
  refreshExperienceType,
} from './profile';

import {GET_CONTACT_CAPABILITIES_API} from './contacts/contacts.actions';

afterEach(() => {
  fetchMock.restore();
});

describe('Experiences', () => {
  test('Create new experience action - success', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const experience = {data: 'test', contact_id: contactId};
    const response = {response: 'win'};

    fetchMock.post(`path:/api/contacts/${contactId}/experiences/`, response);

    await addExperience(experience)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0].type).toBe(ADD_EXPERIENCE);
    expect(dispatch.mock.calls[0][0].experience).toEqual(experience);
    expect(dispatch.mock.calls[1][0].type).toBe(ADD_EXPERIENCE_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(ADD_EXPERIENCE_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });

  test('Create new experience action - failure', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const experience = {data: 'test', contact_id: contactId};

    fetchMock.post(`path:/api/contacts/${contactId}/experiences/`, {
      status: 500,
      body: '',
    });

    await addExperience(experience)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[2][0].type).toBe(ADD_EXPERIENCE_API.REJECT);
    expect(dispatch.mock.calls[2][0].statusCode).toBe(500);
  });

  test('Update experience action', async function() {
    const dispatch = jest.fn();
    const experience = {id: 4321, contact_id: 123, new_data: 'update'};

    fetchMock.put(`path:/api/experiences/${experience.id}/`, {
      body: {status: 'success'},
    });
    fetchMock.get(`path:/api/experiences/${experience.id}/`, {
      body: {status: 'success', data: experience},
    });
    fetchMock.get(`path:/api/contacts/${experience.contact_id}/capabilities/`, {
      body: {status: 'success'},
    });

    await updateExperience(experience)(dispatch);

    expect(dispatch.mock.calls.length).toBe(7);
    expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_EXPERIENCE);
    expect(dispatch.mock.calls[1][0].type).toBe(UPDATE_EXPERIENCE_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(UPDATE_EXPERIENCE_API.RESOLVE);
    expect(dispatch.mock.calls[3][0].type).toBe(GET_EXPERIENCE_API.REQUEST);
    expect(dispatch.mock.calls[4][0].type).toBe(
      GET_CONTACT_CAPABILITIES_API.REQUEST
    );
    expect(dispatch.mock.calls[5][0].type).toBe(GET_EXPERIENCE_API.RESOLVE);
    expect(dispatch.mock.calls[6][0].type).toBe(
      GET_CONTACT_CAPABILITIES_API.RESOLVE
    );

    expect(dispatch.mock.calls[0][0].experience).toBe(experience);
  });

  test('Refresh experiences by type action', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const expType = 'test';

    fetchMock.get(
      `path:/api/contacts/${contactId}/experiences/`,
      {body: {status: 'success', data: []}},
      {query: {type: expType}}
    );

    await refreshExperienceType(contactId, expType)(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toBe(
      REFRESH_EXPERIENCE_TYPE_API.REQUEST
    );
    expect(dispatch.mock.calls[1][0].type).toBe(
      REFRESH_EXPERIENCE_TYPE_API.RESOLVE
    );
    expect(dispatch.mock.calls[1][0].filter).toBe(expType);
    expect(
      fetchMock.called(`path:/api/contacts/${contactId}/experiences/`, {
        query: {type: expType},
      })
    ).toBe(true);
  });

  test('Delete experience action', async function() {
    const dispatch = jest.fn();
    const experience = {
      id: 4321,
      new_data: 'update',
      contact_id: 1234,
      type: 'Test',
    };

    fetchMock.delete(`path:/api/experiences/${experience.id}/`, {
      body: {status: 'success'},
    });
    fetchMock.get(
      `path:/api/contacts/${experience.contact_id}/experiences/`,
      {body: {status: 'success', data: []}},
      {query: {type: 'test'}}
    );

    await deleteExperience(experience)(dispatch);
    expect(dispatch.mock.calls.length).toBe(5);
    expect(dispatch.mock.calls[0][0].type).toBe(DELETE_EXPERIENCE);
    expect(dispatch.mock.calls[1][0].type).toBe(DELETE_EXPERIENCE_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(DELETE_EXPERIENCE_API.RESOLVE);
    expect(dispatch.mock.calls[3][0].type).toBe(
      REFRESH_EXPERIENCE_TYPE_API.REQUEST
    );
    expect(dispatch.mock.calls[4][0].type).toBe(
      REFRESH_EXPERIENCE_TYPE_API.RESOLVE
    );
  });
});

describe('Experience state', () => {
  let initialState = {};
  beforeEach(() => {
    initialState = {};
  });
  test('initial state', () => {
    const newState = experiencesReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test('Add new experience - request resolved', () => {
    const experience = {id: 1234, other_stuff: 'data'};
    const newState = experiencesReducer(initialState, {
      type: ADD_EXPERIENCE_API.RESOLVE,
      body: {data: experience},
    });
    expect(newState).toHaveProperty('1234');
    expect(newState[1234]).toEqual(experience);
  });

  test('Add new experience - request resolved', () => {
    const oldExperience = {id: 1234, other_stuff: 'data'};
    const experience = {id: 1234, other_stuff: 'new data'};
    initialState[1234] = oldExperience;

    const newState = experiencesReducer(initialState, {
      type: ADD_EXPERIENCE_API.RESOLVE,
      body: {data: experience},
    });
    expect(newState).toHaveProperty('1234');
    expect(newState[1234]).toEqual(experience);
  });

  test('Add new experience - request rejected', () => {
    const oldExperience = {id: 1234, other_stuff: 'data'};
    const experience = {id: 1234, other_stuff: 'new data'};
    const startState = initialState;
    startState[1234] = oldExperience;
    const newState = experiencesReducer(startState, {
      type: ADD_EXPERIENCE_API.REJECT,
      experience: experience,
    });
    expect(newState).toEqual(startState);
  });

  test('Refresh all experiences', () => {
    const experiences = [
      {id: 11, title: 'exp 1'},
      {id: 12, title: 'exp 2'},
      {id: 16, title: 'exp 6'},
      {id: 15, title: 'exp 5'},
    ];

    initialState = {
      10: {id: 10, title: 'exp 0'},
    };
    const newState = experiencesReducer(initialState, {
      type: REFRESH_EXPERIENCES_API.RESOLVE,
      body: {status: 'success', data: experiences},
    });
    expect(newState).toEqual({
      11: {id: 11, title: 'exp 1'},
      12: {id: 12, title: 'exp 2'},
      16: {id: 16, title: 'exp 6'},
      15: {id: 15, title: 'exp 5'},
    });
  });

  test('Refresh experiences by type', () => {
    const experiences = [
      {id: 11, title: 'exp 1', type: 'Test'},
      {id: 15, title: 'exp 5', type: 'Test'},
    ];

    initialState = {
      10: {id: 10, title: 'exp 0', type: 'Stay'},
      12: {id: 12, title: 'exp 2', type: 'Test'},
    };
    const newState = experiencesReducer(initialState, {
      type: REFRESH_EXPERIENCE_TYPE_API.RESOLVE,
      body: {status: 'success', data: experiences},
      filter: 'test',
    });
    expect(newState).toEqual({
      10: {id: 10, title: 'exp 0', type: 'Stay'},
      11: {id: 11, title: 'exp 1', type: 'Test'},
      15: {id: 15, title: 'exp 5', type: 'Test'},
    });
  });

  test('Refresh one experience', () => {
    const experience = {id: 11, data: 'exp data'};

    const oldExperience = {id: 11, data: 'old exp data'};
    const bystander = {id: 12, data: 'bystander'};
    initialState = {
      11: oldExperience,
      12: bystander,
    };
    const newState = experiencesReducer(initialState, {
      type: GET_EXPERIENCE_API.RESOLVE,
      body: {status: 'success', data: experience},
    });
    expect(newState).toEqual({
      11: experience,
      12: bystander,
    });
  });
});
