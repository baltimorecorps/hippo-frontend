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
    [CREATE_RESUME_API.RESOLVE]: (state, action) => {
      if (!action.body) {
        return {};
      }
      const {data} = action.body;
      return {
        [data.id]: {
          ...data,
          contact_id: data.contact.id,
          sections: {},
        },
      };
    },
    [CREATE_RESUME_API.REJECT]: (state, action) => {
      return state;
    },
    [REFRESH_RESUME_API.RESOLVE]: (state, action) => {
      if (!action.body) {
        return {};
      }
      const {data} = action.body;
      return {
        ...state,
        [data.id]: {
          id: data.id,
          name: data.name,
          contact_id: data.contact.id,
          sections: data.sections.reduce((object, section) => ({
            ...object,
            [section.id]: section,
          }), {}),
        },
      };
    },
    [REFRESH_RESUME_API.REJECT]: (state, action) => {
      return state;
    },
    [REFRESH_RESUMES_API.RESOLVE]: (state, action) => {
      if (!action.body) {
        return {};
      }
      // TODO
      const {data} = action.body;
      return {
        ...state,
        ...data.reduce((object, resume) => ({
          ...object,
          [resume.id]: resume,
        }), {}),
      };
    },
    [UPDATE_RESUME_API.RESOLVE]: (state, action) => {
      // console.log('UPDATE_RESUME_API', {state, action});
    },
    [DELETE_RESUME_API.RESOLVE]: (state, action) => {
      // console.log('DELETE_RESUME_API', {state, action});
    },
    [CREATE_SECTION_API.RESOLVE]: (state, action) => {
      if (!action.body) {
        return {};
      }
      const {data} = action.body;
      const resume = state[data.resume_id];
      const updatedResume = {
        ...resume,
        sections: {
          ...resume.sections,
          [data.id]: data,
        },
      };
      return {
        ...state,
        [data.resume_id]: updatedResume,
      };
    },
    [REFRESH_SECTION_API.RESOLVE]: (state, action) => {
      // console.log('REFRESH_SECTION_API', {state, action});
    },
    [UPDATE_SECTION_API.RESOLVE]: (state, action) => {
      if (!action.body) {
        return {};
      }
      const {data} = action.body;
      const resume = state[data.resume_id];
      const updatedResume = {
        ...resume,
        sections: {
          ...resume.sections,
          [data.id]: {
            ...resume.sections[data.id],
            ...data,
          },
        },
      };
      return {
        ...state,
        [data.resume_id]: updatedResume,

      };
    },
    [UPDATE_RESUME_ITEMS_API.RESOLVE]: (state, action) => {
      // console.log('UPDATE_RESUME_ITEMS_API', {state, action});
    },
    [DELETE_SECTION_API.RESOLVE]: (state, action) => {
      // console.log('DELETE_SECTION_API', {state, action});
    },
  }
);

export default resumeReducer;
