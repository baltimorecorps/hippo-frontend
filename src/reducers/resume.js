import { createReducer } from 'redux-starter-kit';

/* eslint-disable no-unused-vars */
import {
  CREATE_RESUME,
  CREATE_RESUME_API,
  REFRESH_RESUME,
  REFRESH_RESUME_API,
  REFRESH_RESUMES,
  REFRESH_RESUMES_API,
  UPDATE_RESUME,
  UPDATE_RESUME_API,
  DELETE_RESUME,
  DELETE_RESUME_API,
  CREATE_SECTION,
  CREATE_SECTION_API,
  REFRESH_SECTION,
  REFRESH_SECTION_API,
  UPDATE_SECTION,
  UPDATE_SECTION_API,
  UPDATE_RESUME_ITEMS,
  UPDATE_RESUME_ITEMS_API,
  DELETE_SECTION,
  DELETE_SECTION_API,
} from '../actions/resume';
/* eslint-enable no-unused-vars */

export const resumeReducer = createReducer(
  {},
  {
    // [CREATE_RESUME_API.RESOLVE]: (state, action) => {
    // },
    // [REFRESH_RESUME_API.RESOLVE]: (state, action) => {
    // },
    // [REFRESH_RESUMES_API.RESOLVE]: (state, action) => {
    // },
    // [UPDATE_RESUME_API.RESOLVE]: (state, action) => {
    // },
    // [DELETE_RESUME_API.RESOLVE]: (state, action) => {
    // },
    // [CREATE_SECTION_API.RESOLVE]: (state, action) => {
    // },
    // [REFRESH_SECTION_API.RESOLVE]: (state, action) => {
    // },
    // [UPDATE_SECTION_API.RESOLVE]: (state, action) => {
    // },
    // [UPDATE_RESUME_ITEMS_API.RESOLVE]: (state, action) => {
    // },
    // [DELETE_SECTION_API.RESOLVE]: (state, action) => {
    // },
    [CREATE_RESUME_API.RESOLVE]: (state, action) => {
      console.log('CREATE_RESUME_API', {state, action});
    },
    [REFRESH_RESUME_API.RESOLVE]: (state, action) => {
      console.log('REFRESH_RESUME_API', {state, action});
      if (!action.body) {
        return {};
      } else {
        const {data} = action.body;
        return {
          ...data,
          contactInfo: {
            name: `${data.contact.first_name} ${data.contact.last_name}`,
            email: data.contact.email_primary.email,
          },
        };
      }
    },
    [REFRESH_RESUMES_API.RESOLVE]: (state, action) => {
      console.log('REFRESH_RESUMES_API', {state, action});
    },
    [UPDATE_RESUME_API.RESOLVE]: (state, action) => {
      console.log('UPDATE_RESUME_API', {state, action});
    },
    [DELETE_RESUME_API.RESOLVE]: (state, action) => {
      console.log('DELETE_RESUME_API', {state, action});
    },
    [CREATE_SECTION_API.RESOLVE]: (state, action) => {
      console.log('CREATE_SECTION_API', {state, action});
    },
    [REFRESH_SECTION_API.RESOLVE]: (state, action) => {
      console.log('REFRESH_SECTION_API', {state, action});
    },
    [UPDATE_SECTION_API.RESOLVE]: (state, action) => {
      console.log('UPDATE_SECTION_API', {state, action});
    },
    [UPDATE_RESUME_ITEMS_API.RESOLVE]: (state, action) => {
      console.log('UPDATE_RESUME_ITEMS_API', {state, action});
    },
    [DELETE_SECTION_API.RESOLVE]: (state, action) => {
      console.log('DELETE_SECTION_API', {state, action});
    },
  }
);

export default resumeReducer;
