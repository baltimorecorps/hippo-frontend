import fetchMock from 'fetch-mock';
import {
  EXPERIENCE,
  ADD_EXPERIENCE,
  UPDATE_EXPERIENCE,
  addExperience,
  updateExperience,
} from './profile';

afterEach(() => {
  fetchMock.restore();
});

test('Create new experience action - success', async function() {
  const dispatch = jest.fn();
  const contactId = 1234;
  const experience = {data: 'test'};
  const response = {response: 'win'};

  fetchMock.post(`path:/api/contacts/${contactId}/experiences/`, response);

  await addExperience(contactId, experience)(dispatch);

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
  const experience = {data: 'test'};

  fetchMock.post(`path:/api/contacts/${contactId}/experiences/`, 500);

  await addExperience(contactId, experience)(dispatch);

  expect(dispatch.mock.calls.length).toBe(3);
  expect(dispatch.mock.calls[2][0].type).toBe(`REJECT_${ADD_EXPERIENCE}`);
  expect(dispatch.mock.calls[2][0].contactId).toBe(contactId);
  expect(dispatch.mock.calls[2][0].experience).toBe(experience);
  expect(dispatch.mock.calls[2][0].statusCode).toBe(500);
});

test('Update experience action', async function() {
  const dispatch = jest.fn();
  const experience = {id: 4321, new_data: 'update'};

  fetchMock.put(`path:/api/experiences/${experience.id}/`, 
    {body: {status: 'success'}});
  fetchMock.get(`path:/api/experiences/${experience.id}/`, 
    {body: {status: 'success', data: experience}});

  await updateExperience(experience)(dispatch);

  expect(dispatch.mock.calls.length).toBe(5);
  expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_EXPERIENCE);
  expect(dispatch.mock.calls[1][0].type).toBe(`REQUEST_${UPDATE_EXPERIENCE}`);
  expect(dispatch.mock.calls[2][0].type).toBe(`RESOLVE_${UPDATE_EXPERIENCE}`);
  expect(dispatch.mock.calls[3][0].type).toBe(`REQUEST_${EXPERIENCE}`);
  expect(dispatch.mock.calls[4][0].type).toBe(`RESOLVE_${EXPERIENCE}`);
  expect(dispatch.mock.calls[0][0].experience).toBe(experience);
});

