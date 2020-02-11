import fetchMock from 'fetch-mock';
import {
  opportunitiesReducer,
  applicationsReducer,
  addOpportunity,
  ADD_OPPORTUNITY,
  ADD_OPPORTUNITY_API,
  GET_ALL_OPPORTUNITIES_API,
  START_APPLICATION,
  START_APPLICATION_API,
  startApplication,
  UPDATE_APPLICATION,
  UPDATE_APPLICATION_API,
  updateApplication,
  SUBMIT_APPLICATION,
  SUBMIT_APPLICATION_API,
  submitApplication,
  GET_APPLICATION,
  GET_APPLICATION_API,
  getApplication,
} from './opportunity';

afterEach(() => {
  fetchMock.restore();
});

describe('Opportunities actions', () => {
  test('addOpportunity', async function() {
    const dispatch = jest.fn();
    const opportunity = {data: 'test'};
    const response = {response: 'win'};

    fetchMock.post(`path:/api/opportunity/`, response);

    await addOpportunity(opportunity)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0].type).toBe(ADD_OPPORTUNITY);
    expect(dispatch.mock.calls[0][0].opportunity).toEqual(opportunity);
    expect(dispatch.mock.calls[1][0].type).toBe(ADD_OPPORTUNITY_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(ADD_OPPORTUNITY_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });

  test('startApplication', async function() {
    const dispatch = jest.fn();
    const response = {response: 'win'};

    fetchMock.post(`path:/api/contacts/123/app/123abc/`, response);

    await startApplication(123, '123abc')(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0].type).toBe(START_APPLICATION);
    expect(dispatch.mock.calls[0][0].contact_id).toEqual(123);
    expect(dispatch.mock.calls[0][0].opportunity_id).toEqual('123abc');
    expect(dispatch.mock.calls[1][0].type).toBe(START_APPLICATION_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(START_APPLICATION_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });

  test('getApplication', async function() {
    const dispatch = jest.fn();
    const response = {response: 'win'};

    fetchMock.get(`path:/api/contacts/123/app/123abc/`, response);

    await getApplication(123, '123abc')(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toBe(GET_APPLICATION_API.REQUEST);
    expect(dispatch.mock.calls[1][0].type).toBe(GET_APPLICATION_API.RESOLVE);
    expect(dispatch.mock.calls[1][0].body).toEqual(response);
  });

  test('updateApplication', async function() {
    const dispatch = jest.fn();
    const response = {response: 'win'};
    const application = {
      id: 'a1',
      contact_id: 123,
      opportunity_id: '123abc',
      other_data: 'stuff',
    }

    fetchMock.put(`path:/api/contacts/123/app/123abc/`, response);

    await updateApplication(application)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_APPLICATION);
    expect(dispatch.mock.calls[0][0].application).toEqual(application);
    expect(dispatch.mock.calls[1][0].type).toBe(UPDATE_APPLICATION_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(UPDATE_APPLICATION_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });

  test('submitApplication', async function() {
    const dispatch = jest.fn();
    const response = {response: 'win'};
    const application = {
      id: 'a1',
      contact_id: 123,
      opportunity_id: '123abc',
      other_data: 'stuff',
    }

    fetchMock.post(`path:/api/contacts/123/app/123abc/submit/`, response);

    await submitApplication(application)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0].type).toBe(SUBMIT_APPLICATION);
    expect(dispatch.mock.calls[0][0].application).toEqual(application);
    expect(dispatch.mock.calls[1][0].type).toBe(SUBMIT_APPLICATION_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(SUBMIT_APPLICATION_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });





})


describe('Opportunity state', () => {
  let initialState = {};
  beforeEach(() => {
    initialState = {};
  });
  test('initial state', () => {
    const newState = opportunitiesReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test('Add new opportunity - request resolved', () => {
    const opportunity = {id: '123abc', other_stuff: 'data'};
    const newState = opportunitiesReducer(initialState, {
      type: ADD_OPPORTUNITY_API.RESOLVE,
      body: {data: opportunity},
    });
    expect(newState).toHaveProperty('123abc');
    expect(newState['123abc']).toEqual(opportunity);
  });
  test('Get all opportunities', () => {
    const opportunities = [
      {id: 'a11', title: 'opp 1'},
      {id: 'b12', title: 'opp 2'},
      {id: 'c16', title: 'opp 6'},
      {id: 'd15', title: 'opp 5'},
    ];

    initialState = {
      a10: {id: 'a10', title: 'opp 0'},
    };
    const newState = opportunitiesReducer(initialState, {
      type: GET_ALL_OPPORTUNITIES_API.RESOLVE,
      body: {status: 'success', data: opportunities},
    });
    expect(newState).toEqual({
      a11: {id: 'a11', title: 'opp 1'},
      b12: {id: 'b12', title: 'opp 2'},
      c16: {id: 'c16', title: 'opp 6'},
      d15: {id: 'd15', title: 'opp 5'},
    });
  });
})

describe('Applications state', () => {
  let initialState = {};
  beforeEach(() => {
    initialState = {};
  });
  test('initial state', () => {
    const newState = applicationsReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  test('Start new application ', () => {
    const application = {id: 'a1', other_stuff: 'data'};
    const newState = applicationsReducer(initialState, {
      type: START_APPLICATION_API.RESOLVE,
      body: {data: application},
    });
    expect(newState).toHaveProperty('a1');
    expect(newState['a1']).toEqual(application);
  });
  test('Get application ', () => {
    const application = {id: 'a1', other_stuff: 'data'};
    const newState = applicationsReducer(initialState, {
      type: GET_APPLICATION_API.RESOLVE,
      body: {data: application},
    });
    expect(newState).toHaveProperty('a1');
    expect(newState['a1']).toEqual(application);
  });

  test('Update application ', () => {
    const application = {id: 'a1', other_stuff: 'data'};
    const newState = applicationsReducer(initialState, {
      type: UPDATE_APPLICATION_API.RESOLVE,
      body: {data: application},
    });
    expect(newState).toHaveProperty('a1');
    expect(newState['a1']).toEqual(application);
  });
  test('Submit application ', () => {
    const application = {id: 'a1', other_stuff: 'data'};
    const newState = applicationsReducer(initialState, {
      type: SUBMIT_APPLICATION_API.RESOLVE,
      body: {data: application},
    });
    expect(newState).toHaveProperty('a1');
    expect(newState['a1']).toEqual(application);
  });
})
