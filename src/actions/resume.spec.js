import fetchMock from 'fetch-mock';
import {
  CREATE_RESUME,
  CREATE_RESUME_API,
  CREATE_SECTION_API,
  REFRESH_RESUME_API,
  REFRESH_RESUMES_API,
  REFRESH_SECTION_API,
  UPDATE_RESUME,
  UPDATE_RESUME_ITEMS,
  UPDATE_RESUME_API,
  UPDATE_SECTION_API,
  DELETE_RESUME,
  DELETE_RESUME_API,
  DELETE_SECTION_API,
  createResume,
  createResumeSection,
  refreshResume,
  refreshResumeSection,
  refreshResumes,
  updateResume,
  updateResumeSection,
  updateResumeItems,
  deleteResume,
  deleteResumeSection,
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

  test('Get single resume', async function() {
    const dispatch = jest.fn();
    const resumeId = 1234;
    const response = { response: 'win' };

    fetchMock.get(`path:/api/resumes/${resumeId}/`, response);

    await refreshResume(resumeId)(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[1][0].type).toBe(REFRESH_RESUME_API.RESOLVE);
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

  test('Delete resume - failure', async function() {
    const dispatch = jest.fn();
    const resumeId = 111;
    const contactId = 1234;

    fetchMock.delete(`path:/api/resumes/${resumeId}/`, {
      status: 500,
      body: '',
    });
    fetchMock.get(
      `path:/api/contacts/${contactId}/resumes/`,
      { body: { status: 'success', data: [] } },
    );

    const result = await deleteResume(resumeId, contactId)(dispatch);
    expect(result.type).toBe(DELETE_RESUME_API.REJECT)

    expect(dispatch.mock.calls.length).toBe(5);
    expect(dispatch.mock.calls[0][0].type).toBe(DELETE_RESUME);
    expect(dispatch.mock.calls[1][0].type).toBe(DELETE_RESUME_API.REQUEST);
    expect(dispatch.mock.calls[2][0].type).toBe(DELETE_RESUME_API.REJECT);
    expect(dispatch.mock.calls[3][0].type).toBe(REFRESH_RESUMES_API.REQUEST);
    expect(dispatch.mock.calls[4][0].type).toBe(REFRESH_RESUMES_API.RESOLVE);
  });


});

describe('Resume section actions', () => {
  test('Create new resume section ', async function() {
    const dispatch = jest.fn();
    const section = {
      resume_id: 111,
      name: 'Test Resume Section',
      max_items: 0,
    }
    const response = { response: 'win' };

    fetchMock.post(`path:/api/resumes/${section.resume_id}/sections/`, response);

    await createResumeSection(section)(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[1][0].type).toBe(CREATE_SECTION_API.RESOLVE);
    expect(dispatch.mock.calls[1][0].body).toEqual(response);
  });

  test('Refresh resume section', async function() {
    const dispatch = jest.fn();
    const resumeId = 1234;
    const sectionId = 111;
    const response = { response: 'win' };

    fetchMock.get(`path:/api/resumes/${resumeId}/sections/${sectionId}/`, response);

    await refreshResumeSection(resumeId, sectionId)(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[1][0].type).toBe(REFRESH_SECTION_API.RESOLVE);
    expect(dispatch.mock.calls[1][0].body).toEqual(response);
  });

  test('Update resume section', async function() {
    const dispatch = jest.fn();
    const response = { response: 'win' };
    const section = {
      id: 23,
      resume_id: 111,
      name: 'Test Resume Section',
      max_items: 0,
    }

    fetchMock.put(`path:/api/resumes/${section.resume_id}/sections/${section.id}/`,
      response);

    await updateResumeSection(section)(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[1][0].type).toBe(UPDATE_SECTION_API.RESOLVE);
    expect(dispatch.mock.calls[1][0].body).toEqual(response);
  });

  test('Update resume section items', async function() {
    const dispatch = jest.fn();
    const resumeId = 111;
    const sectionId = 23;
    const items = [{id: 1}, {id: 2}];
    const response = { response: 'win' };

    fetchMock.put(`path:/api/resumes/${resumeId}/sections/${sectionId}/`, response);

    await updateResumeItems(resumeId, sectionId, items)(dispatch);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_RESUME_ITEMS);
    expect(dispatch.mock.calls[0][0].update.resume_id).toEqual(resumeId);
    expect(dispatch.mock.calls[0][0].update.section_id).toEqual(sectionId);
    expect(dispatch.mock.calls[0][0].update.items).toEqual(items);
    expect(dispatch.mock.calls[2][0].type).toBe(UPDATE_SECTION_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].body).toEqual(response);
  });

  test('Delete resume section', async function() {
    const dispatch = jest.fn();
    const resumeId = 111;
    const sectionId = 1234;

    fetchMock.delete(`path:/api/resumes/${resumeId}/sections/${sectionId}/`, {
      body: { status: 'success' },
    });


    fetchMock.get(
      `path:/api/resumes/${resumeId}/`,
      { body: { status: 'success', data: [] } },
    );

    await deleteResumeSection(resumeId, sectionId)(dispatch);
    expect(dispatch.mock.calls.length).toBe(4);
    expect(dispatch.mock.calls[0][0].type).toBe(DELETE_SECTION_API.REQUEST);
    expect(dispatch.mock.calls[1][0].type).toBe(DELETE_SECTION_API.RESOLVE);
    expect(dispatch.mock.calls[2][0].type).toBe(REFRESH_RESUME_API.REQUEST);
    expect(dispatch.mock.calls[3][0].type).toBe(REFRESH_RESUME_API.RESOLVE);
  });

});
