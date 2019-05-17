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


