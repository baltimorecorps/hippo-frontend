import fetchMock from 'fetch-mock';
import {
  CREATE_RESUME,
  CREATE_RESUME_API,
  createResume
} from './resume';

describe('Top level resume actions', () => {
  test('Create new resume', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const name = 'Test Resume'
    const response = { response: 'win' };

    fetchMock.post(`path:/api/contacts/${contactId}/resumes/`, response);

    await createResume(contactId, name)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0].type).toBe(CREATE_RESUME);
    expect(dispatch.mock.calls[0][0].resume.contact_id).toBe(contactId);
    expect(dispatch.mock.calls[0][0].resume.name).toBe(name);
    expect(dispatch.mock.calls[0][0].resume).toHaveProperty('date_created');
    expect(dispatch.mock.calls[2][0].type).toBe(CREATE_RESUME_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });
});

