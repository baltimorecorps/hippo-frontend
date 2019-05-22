import moment from 'moment';
import { API_URL } from '../constants';
import { makeFetchActions, fetchActionTypes } from 'redux-fetch-wrapper';

export const CREATE_RESUME = 'CREATE_RESUME';
export const CREATE_RESUME_API = fetchActionTypes(CREATE_RESUME);
export const createResume = (contactId, name) =>
  async function(dispatch) {
    const resume = {
      contact_id: contactId,
      name,
      date_created: moment().format('YYYY-MM-DD'),
    };
    dispatch({
      type: CREATE_RESUME,
      resume,
    });

    return await makeFetchActions(CREATE_RESUME, `${API_URL}/api/contacts/${contactId}/resumes/`, {
      body: JSON.stringify(resume),
      method: 'POST',
    })(dispatch);
  };

export const REFRESH_RESUME = 'REFRESH_RESUME';
export const REFRESH_RESUME_API = fetchActionTypes(REFRESH_RESUME);
export const refreshResume = (resumeId) =>
  makeFetchActions(REFRESH_RESUME, `${API_URL}/api/resumes/${resumeId}/`);

export const REFRESH_RESUMES = 'REFRESH_RESUMES';
export const REFRESH_RESUMES_API = fetchActionTypes(REFRESH_RESUMES);
export const refreshResumes = (contactId) =>
  makeFetchActions(
    REFRESH_RESUMES, `${API_URL}/api/contacts/${contactId}/resumes/`,
    null,
    {
      onResolve: (resolveAction) => ({
        ...resolveAction,
        contact_id: contactId,
      }),
    },

  );

export const UPDATE_RESUME = 'UPDATE_RESUME';
export const UPDATE_RESUME_API = fetchActionTypes(UPDATE_RESUME);
export const updateResume = (resumeId, name) =>
  async function(dispatch) {
    const update = {
      name,
    };
    dispatch({
      type: UPDATE_RESUME,
      update,
    });

    return await makeFetchActions(UPDATE_RESUME, `${API_URL}/api/resumes/${resumeId}/`, {
      body: JSON.stringify(update),
      method: 'PUT',
    })(dispatch);
  };

export const DELETE_RESUME = 'DELETE_RESUME';
export const DELETE_RESUME_API = fetchActionTypes(DELETE_RESUME);
export const deleteResume = (resumeId, contactId) =>
  async function(dispatch) {
    dispatch({
      type: DELETE_RESUME,
      resumeId,
    });

    const result = await makeFetchActions(DELETE_RESUME, `${API_URL}/api/resumes/${resumeId}/`, {
      method: 'DELETE',
    })(dispatch);

    const success = await refreshResumes(contactId)(dispatch);

    if (result.type === DELETE_RESUME_API.REJECT) {
      return result;
    } else {
      return success;
    }
  };

export const CREATE_SECTION = 'CREATE_SECTION';
export const CREATE_SECTION_API = fetchActionTypes(CREATE_SECTION);
export const createResumeSection = (section) =>
  async function(dispatch) {
    if (!section || section.resume_id === null || section.resume_id === undefined) {
      throw new Error('invalid section given to createResumeSection!');
    }

    return await makeFetchActions(
      CREATE_SECTION,
      `${API_URL}/api/resumes/${section.resume_id}/sections/`,
      {
        body: JSON.stringify(section),
        method: 'POST',
      },
    )(dispatch);
  };

export const REFRESH_SECTION = 'REFRESH_SECTION';
export const REFRESH_SECTION_API = fetchActionTypes(REFRESH_SECTION);
export const refreshResumeSection = (resumeId, sectionId) =>
  makeFetchActions(REFRESH_SECTION, `${API_URL}/api/resumes/${resumeId}/sections/${sectionId}/`);

export const UPDATE_SECTION = 'UPDATE_SECTION';
export const UPDATE_SECTION_API = fetchActionTypes(UPDATE_SECTION);
export const updateResumeSection = (section) =>
  makeFetchActions(
    UPDATE_SECTION,
    `${API_URL}/api/resumes/${section.resume_id}/sections/${section.id}/`,
    {
      body: JSON.stringify(section),
      method: 'PUT',
    },
  );

export const UPDATE_RESUME_ITEMS = 'UPDATE_RESUME_ITEMS';
export const updateResumeItems = (resumeId, sectionId, items) =>
  async function(dispatch) {
    const update = {
      resume_id: resumeId,
      id: sectionId,
      items: items,
    };

    dispatch({
      type: UPDATE_RESUME_ITEMS,
      update: {
        resume_id: resumeId,
        section_id: sectionId,
        items,
      },
    });

    return await updateResumeSection(update)(dispatch);
  };

export const DELETE_SECTION = 'DELETE_SECTION';
export const DELETE_SECTION_API = fetchActionTypes(DELETE_SECTION);
export const deleteResumeSection = (resumeId, sectionId) =>
  async function(dispatch) {
    const result = await makeFetchActions(
      DELETE_SECTION,
      `${API_URL}/api/resumes/${resumeId}/sections/${sectionId}/`,
      {
        method: 'DELETE',
      },
    )(dispatch);

    const success = await refreshResume(resumeId)(dispatch);

    if (result.type === DELETE_SECTION_API.REJECT) {
      return result;
    } else {
      return success;
    }
  };
