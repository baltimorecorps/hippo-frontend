import fetchMock from 'fetch-mock';
import {
  GET_EXPERIENCE,
  ADD_EXPERIENCE,
  UPDATE_EXPERIENCE,
  DELETE_EXPERIENCE,
  REFRESH_EXPERIENCE_TYPE,
  addExperience,
  updateExperience,
  deleteExperience,
  refreshExperienceType,
} from './profile';

afterEach(() => {
  fetchMock.restore();
});

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
  expect(dispatch.mock.calls[1][0].type).toBe(`REQUEST_${ADD_EXPERIENCE}`);
  expect(dispatch.mock.calls[2][0].type).toBe(`RESOLVE_${ADD_EXPERIENCE}`);
  expect(dispatch.mock.calls[2][0].body).toEqual(response);
});

test('Create new experience action - failure', async function() {
  const dispatch = jest.fn();
  const contactId = 1234;
  const experience = {data: 'test', contact_id: contactId};

  fetchMock.post(`path:/api/contacts/${contactId}/experiences/`, 500);

  await addExperience(experience)(dispatch);

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[2][0].type).toBe(`REJECT_${ADD_EXPERIENCE}`);
  expect(dispatch.mock.calls[2][0].statusCode).toBe(500);
});

test('Update experience action', async function() {
  const dispatch = jest.fn();
  const experience = {id: 4321, new_data: 'update'};

  fetchMock.put(`path:/api/experiences/${experience.id}/`, {
    body: {status: 'success'},
  });
  fetchMock.get(`path:/api/experiences/${experience.id}/`, {
    body: {status: 'success', data: experience},
  });

  await updateExperience(experience)(dispatch);

  expect(dispatch.mock.calls.length).toBe(5);
  expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_EXPERIENCE);
  expect(dispatch.mock.calls[1][0].type).toBe(`REQUEST_${UPDATE_EXPERIENCE}`);
  expect(dispatch.mock.calls[2][0].type).toBe(`RESOLVE_${UPDATE_EXPERIENCE}`);
  expect(dispatch.mock.calls[3][0].type).toBe(`REQUEST_${GET_EXPERIENCE}`);
  expect(dispatch.mock.calls[4][0].type).toBe(`RESOLVE_${GET_EXPERIENCE}`);
  expect(dispatch.mock.calls[0][0].experience).toBe(experience);
});

test('Refresh experiences by type action', async function() {
  const dispatch = jest.fn();
  const contactId = 1234;
  const expType = 'test';

  fetchMock.get(
    `path:/api/contacts/${contactId}/experiences/`,
    {body: {status: 'success', data: []}},
    {query: {type: expType}},
  );

  await refreshExperienceType(contactId, expType)(dispatch);

  expect(dispatch.mock.calls.length).toBe(2);
  expect(dispatch.mock.calls[0][0].type).toBe(`REQUEST_${REFRESH_EXPERIENCE_TYPE}`);
  expect(dispatch.mock.calls[1][0].type).toBe(`RESOLVE_${REFRESH_EXPERIENCE_TYPE}`);
  expect(dispatch.mock.calls[1][0].filter).toBe(expType);
  expect(
    fetchMock.called(
      `path:/api/contacts/${contactId}/experiences/`,
      {query: {type: expType}},
    ),
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
    {query: {type: 'test'}},
  );

  await deleteExperience(experience)(dispatch);
  expect(dispatch.mock.calls.length).toBe(5);
  expect(dispatch.mock.calls[0][0].type).toBe(DELETE_EXPERIENCE);
  expect(dispatch.mock.calls[1][0].type).toBe(`REQUEST_${DELETE_EXPERIENCE}`);
  expect(dispatch.mock.calls[2][0].type).toBe(`RESOLVE_${DELETE_EXPERIENCE}`);
  expect(dispatch.mock.calls[3][0].type).toBe(
    `REQUEST_${REFRESH_EXPERIENCE_TYPE}`,
  );
  expect(dispatch.mock.calls[4][0].type).toBe(
    `RESOLVE_${REFRESH_EXPERIENCE_TYPE}`,
  );
});
