import {format} from 'date-fns';
import {API_URL} from 'app/constants';
import {makeApiFetchActions} from 'lib/helperFunctions/helpers';
import {fetchActionTypes} from 'redux-fetch-wrapper';
import {createReducer} from 'redux-starter-kit';

export const START_RESUME_CREATION = 'START_RESUME_CREATION';
export const startResumeCreation = () => ({
  type: START_RESUME_CREATION,
});

export const START_RESUME_SELECT = 'START_RESUME_SELECT';
export const startResumeSelect = () => ({
  type: START_RESUME_SELECT,
});

export const CANCEL_RESUME_SELECT = 'CANCEL_RESUME_SELECT';
export const cancelResumeSelect = () => ({
  type: CANCEL_RESUME_SELECT,
});

export const GENERATE_RESUME = 'GENERATE_RESUME';
export const GENERATE_RESUME_API = fetchActionTypes(GENERATE_RESUME);
export const generateResume = (contactId, resume) =>
  async function(dispatch) {
    dispatch({
      type: GENERATE_RESUME,
      payload: {
        contactId,
        resume,
      },
    });

    const response = await makeApiFetchActions(
      GENERATE_RESUME,
      `${API_URL}/api/contacts/${contactId}/generate-resume/`,
      {
        body: JSON.stringify(resume),
        method: 'POST',
      }
    )(dispatch);

    return response;
  };

export const SELECT_RESUME_EXPERIENCE = 'SELECT_RESUME_EXPERIENCE';
export const selectResumeExperience = experience => ({
  type: SELECT_RESUME_EXPERIENCE,
  experience,
});

export const DESELECT_RESUME_EXPERIENCE = 'DESELECT_RESUME_EXPERIENCE';
export const deselectResumeExperience = experience => ({
  type: DESELECT_RESUME_EXPERIENCE,
  experience,
});

export const CREATE_RESUME = 'CREATE_RESUME';
export const CREATE_RESUME_API = fetchActionTypes(CREATE_RESUME);
export const createResume = (contactId, name) =>
  async function(dispatch) {
    const resume = {
      contact_id: contactId,
      name,
      date_created: format(new Date(), 'yyyy-MM-dd'),
    };
    dispatch({
      type: CREATE_RESUME,
      resume,
    });

    return await makeApiFetchActions(
      CREATE_RESUME,
      `${API_URL}/api/contacts/${contactId}/resumes/`,
      {
        body: JSON.stringify(resume),
        method: 'POST',
      }
    )(dispatch);
  };

export const REFRESH_RESUME = 'REFRESH_RESUME';
export const REFRESH_RESUME_API = fetchActionTypes(REFRESH_RESUME);
export const refreshResume = resumeId =>
  makeApiFetchActions(REFRESH_RESUME, `${API_URL}/api/resumes/${resumeId}/`);

export const REFRESH_RESUMES = 'REFRESH_RESUMES';
export const REFRESH_RESUMES_API = fetchActionTypes(REFRESH_RESUMES);
export const refreshResumes = contactId =>
  makeApiFetchActions(
    REFRESH_RESUMES,
    `${API_URL}/api/contacts/${contactId}/resumes/`,
    null,
    {
      onResolve: resolveAction => ({
        ...resolveAction,
        contact_id: contactId,
      }),
    }
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

    return await makeApiFetchActions(
      UPDATE_RESUME,
      `${API_URL}/api/resumes/${resumeId}/`,
      {
        body: JSON.stringify(update),
        method: 'PUT',
      }
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

    const result = await makeApiFetchActions(
      DELETE_RESUME,
      `${API_URL}/api/resumes/${resumeId}/`,
      {
        method: 'DELETE',
      }
    )(dispatch);

    const success = await refreshResumes(contactId)(dispatch);

    if (result.type === DELETE_RESUME_API.REJECT) {
      return result;
    } else {
      return success;
    }
  };

export const CREATE_SECTION = 'CREATE_SECTION';
export const CREATE_SECTION_API = fetchActionTypes(CREATE_SECTION);
export const createResumeSection = section =>
  async function(dispatch) {
    if (
      !section ||
      section.resume_id === null ||
      section.resume_id === undefined
    ) {
      throw new Error('invalid section given to createResumeSection!');
    }

    return await makeApiFetchActions(
      CREATE_SECTION,
      `${API_URL}/api/resumes/${section.resume_id}/sections/`,
      {
        body: JSON.stringify(section),
        method: 'POST',
      }
    )(dispatch);
  };

export const REFRESH_SECTION = 'REFRESH_SECTION';
export const REFRESH_SECTION_API = fetchActionTypes(REFRESH_SECTION);
export const refreshResumeSection = (resumeId, sectionId) =>
  makeApiFetchActions(
    REFRESH_SECTION,
    `${API_URL}/api/resumes/${resumeId}/sections/${sectionId}/`
  );

export const UPDATE_SECTION = 'UPDATE_SECTION';
export const UPDATE_SECTION_API = fetchActionTypes(UPDATE_SECTION);
export const updateResumeSection = section =>
  makeApiFetchActions(
    UPDATE_SECTION,
    `${API_URL}/api/resumes/${section.resume_id}/sections/${section.id}/`,
    {
      body: JSON.stringify(section),
      method: 'PUT',
    }
  );

export const UPDATE_RESUME_ITEMS = 'UPDATE_RESUME_ITEMS';
export const UPDATE_RESUME_ITEMS_API = fetchActionTypes(UPDATE_RESUME_ITEMS);
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
    const result = await makeApiFetchActions(
      DELETE_SECTION,
      `${API_URL}/api/resumes/${resumeId}/sections/${sectionId}/`,
      {
        method: 'DELETE',
      }
    )(dispatch);

    const success = await refreshResume(resumeId)(dispatch);

    if (result.type === DELETE_SECTION_API.REJECT) {
      return result;
    } else {
      return success;
    }
  };

export const RESUME_CREATION = {
  NOT_ACTIVE: 'NOT_ACTIVE',
  CHOOSE_STYLE: 'CHOOSE_STYLE',
  SELECT_HIGHLIGHTS: 'SELECT_HIGHLIGHTS',
};

const getExperienceKey = experience => {
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
  inProgress: false,
  selected: {
    experience: [],
    education: [],
    accomplishments: [],
  },
  resumes: [],
});

export const resumeReducer = createReducer(genInitState(), {
  [START_RESUME_CREATION]: (state, action) => {
    state.resumeCreationStep = RESUME_CREATION.CHOOSE_STYLE;
  },
  [START_RESUME_SELECT]: (state, action) => {
    state.resumeCreationStep = RESUME_CREATION.SELECT_HIGHLIGHTS;
  },
  [CANCEL_RESUME_SELECT]: (state, action) => {
    Object.keys(state.selected).forEach(key => {
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
    state.selected[key].push(action.experience.id);
  },

  [DESELECT_RESUME_EXPERIENCE]: (state, action) => {
    const key = getExperienceKey(action.experience);
    state.selected[key] = state.selected[key].filter(
      id => id !== action.experience.id
    );
  },
  [DESELECT_RESUME_EXPERIENCE]: (state, action) => {
    const key = getExperienceKey(action.experience);
    state.selected[key] = state.selected[key].filter(
      id => id !== action.experience.id
    );
  },
  [GENERATE_RESUME_API.REQUEST]: (state, action) => {
    state.inProgress = true;
  },
  [GENERATE_RESUME_API.RESOLVE]: (state, action) => {
    const initState = genInitState();
    state.resumeCreationStep = initState.resumeCreationStep;
    state.selected = initState.selected;
    state.resumes.push(action.body.data);
    state.inProgress = false;
  },
  [GENERATE_RESUME_API.REJECT]: (state, action) => {
    state.inProgress = false;
  },
});

export default resumeReducer;
