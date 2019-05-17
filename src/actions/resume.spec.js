import fetchMock from 'fetch-mock';
import {
  CREATE_RESUME,
  CREATE_RESUME_API,
  REFRESH_RESUMES_API,
  UPDATE_RESUME,
  UPDATE_RESUME_API,
  DELETE_RESUME,
  DELETE_RESUME_API,
  createResume,
  refreshResumes,
  updateResume,
  deleteResume,
} from './resume';

afterEach(() => {
  fetchMock.restore();
});

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

  test('Get resumes', async function() {
    const dispatch = jest.fn();
    const contactId = 1234;
    const response = { response: 'win' };

    fetchMock.get(`path:/api/contacts/${contactId}/resumes/`, response);

    await refreshResumes(contactId)(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[1][0].type).toBe(REFRESH_RESUMES_API.RESOLVE);
    expect(dispatch.mock.calls[1][0].body).toEqual(response);
  });

  test('Update resume', async function() {
    const dispatch = jest.fn();
    const resumeId = 111;
    const name = 'Test Resume'
    const response = { response: 'win' };

    fetchMock.put(`path:/api/resumes/${resumeId}/`, response);

    await updateResume(resumeId, name)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_RESUME);
    expect(dispatch.mock.calls[0][0].update.name).toEqual(name);
    expect(dispatch.mock.calls[2][0].type).toBe(UPDATE_RESUME_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });

  test('Delete resume', async function() {
    const dispatch = jest.fn();
    const resumeId = 111;
    const contactId = 1234;

    fetchMock.delete(`path:/api/resumes/${resumeId}/`, {
      body: { status: 'success' },
    });
    fetchMock.get(
      `path:/api/contacts/${contactId}/resumes/`,
      { body: { status: 'success', data: [] } },
    );

    await deleteResume(resumeId, contactId)(dispatch);
    expect(dispatch.mock.calls.length).toBe(5);
    expect(dispatch.mock.calls[0][0].type).toBe(DELETE_RESUME);
    expect(dispatch.mock.calls[1][0].type).toBe(DELETE_RESUME_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(DELETE_RESUME_API.RESOLVE);
    expect(dispatch.mock.calls[3][0].type).toBe(REFRESH_RESUMES_API.REQUEST);
    expect(dispatch.mock.calls[4][0].type).toBe(REFRESH_RESUMES_API.RESOLVE);
  });

});

