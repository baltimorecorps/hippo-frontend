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
    }
    dispatch({
      type: CREATE_RESUME,
      resume,
    });

    await makeFetchActions(
      CREATE_RESUME,
      `${API_URL}/api/contacts/${contactId}/resumes/`,
      {
        body: JSON.stringify(resume),
        method: 'POST',
      },
    )(dispatch);
  };


export const REFRESH_RESUMES = 'REFRESH_RESUMES';
export const REFRESH_RESUMES_API = fetchActionTypes(REFRESH_RESUMES);
export const refreshResumes = (contactId) => makeFetchActions(
  REFRESH_RESUMES,
  `${API_URL}/api/contacts/${contactId}/resumes/`,
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

    await makeFetchActions(
      UPDATE_RESUME,
      `${API_URL}/api/resumes/${resumeId}/`,
      {
        body: JSON.stringify(update),
        method: 'PUT',
      },
    )(dispatch);
  };

export const DELETE_RESUME = 'DELETE_RESUME';
export const DELETE_RESUME_API = fetchActionTypes(DELETE_RESUME);
export const deleteResume = (resumeId, contactId) =>
  async function(dispatch) {
    dispatch({
      type: DELETE_RESUME,
      resumeId,
    });

    await makeFetchActions(
      DELETE_RESUME,
      `${API_URL}/api/resumes/${resumeId}/`,
      {
        method: 'DELETE',
      },
    )(dispatch);

    await refreshResumes(contactId)(dispatch);
  };
