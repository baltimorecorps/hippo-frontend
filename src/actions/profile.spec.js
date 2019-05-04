import fetchMock from 'fetch-mock';
import {
  ADD_EXPERIENCE,
  addExperience,
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

