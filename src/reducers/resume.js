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
  START_RESUME_CREATION,
  CANCEL_RESUME_SELECT,
  START_RESUME_SELECT,
  SELECT_RESUME_EXPERIENCE,
  DESELECT_RESUME_EXPERIENCE,
  GENERATE_RESUME,
  GENERATE_RESUME_API,
} from '../actions/resume';
/* eslint-enable no-unused-vars */

export const RESUME_CREATION = {
  NOT_ACTIVE: 'NOT_ACTIVE',
  CHOOSE_STYLE: 'CHOOSE_STYLE',
  SELECT_HIGHLIGHTS: 'SELECT_HIGHLIGHTS',
};

const getExperienceKey = (experience) => {
  const expType = experience.type;
  if (expType === 'Education') {
    return 'education';
  } else if (expType === 'Accomplishment') {
    return 'accomplishments';
  } else {
    return 'experience';
  }
};

const genInitState = () => ({
  resumeCreationStep: RESUME_CREATION.NOT_ACTIVE,
  selected: {
    experience: [],
    education: [],
    accomplishments: [],
  },
})

export const resumeReducer = createReducer(genInitState(),
  {
    [START_RESUME_CREATION]: (state, action) => {
      state.resumeCreationStep = RESUME_CREATION.CHOOSE_STYLE;
    },
    [START_RESUME_SELECT]: (state, action) => {
      state.resumeCreationStep = RESUME_CREATION.SELECT_HIGHLIGHTS;
    },
    [CANCEL_RESUME_SELECT]: (state, action) => {
      Object.keys(state.selected).forEach((key) => {
        state.selected[key] = [];
      });
      state.resumeCreationStep = RESUME_CREATION.NOT_ACTIVE;
    },
    [SELECT_RESUME_EXPERIENCE]: (state, action) => {
      // Only allow item selection when we're in the right state for it
      // Hopefully this should keep our state clean across oddly timed
      // transitions, etc.
      if (state.resumeCreationStep !== RESUME_CREATION.SELECT_HIGHLIGHTS) {
        return;
      }

      const key = getExperienceKey(action.experience);
      state.selected[key].push(
        action.experience.id,
      );
    },

    [DESELECT_RESUME_EXPERIENCE]: (state, action) => {
      const key = getExperienceKey(action.experience);
      state.selected[key] = state.selected[key].filter(
        (id) => id !== action.experience.id,
      );
    },
    [DESELECT_RESUME_EXPERIENCE]: (state, action) => {
      const key = getExperienceKey(action.experience);
      state.selected[key] = state.selected[key].filter(
        (id) => id !== action.experience.id,
      );
    },
    [GENERATE_RESUME_API.RESOLVE]: (state, action) => {
      return genInitState();
    },

  },
);

export default resumeReducer;
