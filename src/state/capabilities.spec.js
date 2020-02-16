import fetchMock from 'fetch-mock';
import {
  GET_CAPABILITIES_API,
  getCapabilities,
  capabilitiesReducer,
} from './capabilities';

afterEach(() => {
  fetchMock.restore();
});

test('Get capabilites', async function() {
  const dispatch = jest.fn();
  const response = {result: 'win'};

  fetchMock.get(`path:/api/capabilities/`, response);


  const res = await getCapabilities(dispatch);

  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[0][0].type).toBe(GET_CAPABILITIES_API.REQUEST);
  expect(dispatch.mock.calls[1][0].type).toBe(GET_CAPABILITIES_API.RESOLVE);
  expect(dispatch.mock.calls[1][0].body).toEqual(response);
});


describe('Contacts state', () => {
  const initialState = [];
  test('inital state', () => {
    const newState = capabilitiesReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  test('Fetch all capabilities', () => {
    const capabilities = [{id: 1}, {id: 2}, {id: 3}];
    const newState = capabilitiesReducer([{id: 4}], {
      type: GET_CAPABILITIES_API.RESOLVE,
      body: {status: 'success', data: capabilities},
    });
    expect(newState).toEqual([
      {id: 1},
      {id: 2},
      {id: 3},
    ]);
  });

});
