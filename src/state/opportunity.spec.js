import fetchMock from 'fetch-mock';
import {
  opportunitiesReducer,
  addOpportunity,
  ADD_OPPORTUNITY,
  ADD_OPPORTUNITY_API,
  GET_ALL_OPPORTUNITIES_API,
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
