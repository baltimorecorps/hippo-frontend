import {API_URL} from 'app/constants';
import {makeApiFetchActions} from 'lib/helperFunctions/helpers';
import {fetchActionTypes} from 'redux-fetch-wrapper';
import {createReducer} from 'redux-starter-kit';

export const ADD_OPPORTUNITY = 'ADD_OPPORTUNITY';
export const ADD_OPPORTUNITY_API = fetchActionTypes(ADD_OPPORTUNITY);
export const addOpportunity = opportunity =>
  async function(dispatch) {
    dispatch({
      type: ADD_OPPORTUNITY,
      opportunity,
    });

    return await makeApiFetchActions(
      ADD_OPPORTUNITY,
      `${API_URL}/api/opportunity/`,
      {
        body: JSON.stringify(opportunity),
        method: 'POST',
      }
    )(dispatch);
  };

export const UPDATE_OPPORTUNITY = 'UPDATE_OPPORTUNITY';
export const UPDATE_OPPORTUNITY_API = fetchActionTypes(UPDATE_OPPORTUNITY);
export const updateOpportunity = opportunity =>
  async function(dispatch) {
    dispatch({
      type: UPDATE_OPPORTUNITY,
      opportunity,
    });

    return await makeApiFetchActions(
      UPDATE_OPPORTUNITY,
      `${API_URL}/api/opportunity/${opportunity.id}`,
      {
        body: JSON.stringify(opportunity),
        method: 'PUT',
      }
    )(dispatch);
  };

export const GET_ALL_OPPORTUNITIES = 'GET_ALL_OPPORTUNITIES';
export const GET_ALL_OPPORTUNITIES_API = fetchActionTypes(
  GET_ALL_OPPORTUNITIES
);
export const getAllOpportunities = makeApiFetchActions(
  GET_ALL_OPPORTUNITIES,
  `${API_URL}/api/opportunity/`
);

export const START_APPLICATION = 'START_APPLICATION';
export const START_APPLICATION_API = fetchActionTypes(START_APPLICATION);
export const startApplication = (contactId, opportunityId) =>
  async function(dispatch) {
    dispatch({
      type: START_APPLICATION,
      contact_id: contactId,
      opportunity_id: opportunityId,
    });

    return await makeApiFetchActions(
      START_APPLICATION,
      `${API_URL}/api/contacts/${contactId}/app/${opportunityId}/`,
      {
        method: 'POST',
      }
    )(dispatch);
  };

export const GET_APPLICATION = 'GET_APPLICATION';
export const GET_APPLICATION_API = fetchActionTypes(GET_APPLICATION);
export const getApplication = (contactId, opportunityId) =>
  makeApiFetchActions(
    GET_APPLICATION,
    `${API_URL}/api/contacts/${contactId}/app/${opportunityId}/`
  );

export const GET_CONTACT_APPLICATIONS = 'GET_CONTACT_APPLICATIONS';
export const GET_CONTACT_APPLICATIONS_API = fetchActionTypes(
  GET_CONTACT_APPLICATIONS
);
export const getContactApplications = contactId => {
  return async function(dispatch) {
    try {
      const result = await makeApiFetchActions(
        GET_CONTACT_APPLICATIONS,
        `${API_URL}/api/contacts/${contactId}/app/`
      )(dispatch);
      dispatch({
        type: GET_CONTACT_APPLICATIONS,
        data: result.body.data,
        contactId,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const UPDATE_APPLICATION = 'UPDATE_APPLICATION';
export const UPDATE_APPLICATION_API = fetchActionTypes(UPDATE_APPLICATION);
export const updateApplication = application =>
  async function(dispatch) {
    dispatch({
      type: UPDATE_APPLICATION,
      application,
    });

    return await makeApiFetchActions(
      UPDATE_APPLICATION,
      `${API_URL}/api/contacts/${application.contact.id}/app/${application.opportunity.id}/`,
      {
        body: JSON.stringify(application),
        method: 'PUT',
      }
    )(dispatch);
  };

export const SUBMIT_APPLICATION = 'SUBMIT_APPLICATION';
export const SUBMIT_APPLICATION_API = fetchActionTypes(SUBMIT_APPLICATION);
export const submitApplication = application =>
  async function(dispatch) {
    dispatch({
      type: SUBMIT_APPLICATION,
      application,
    });

    return await makeApiFetchActions(
      SUBMIT_APPLICATION,
      `${API_URL}/api/contacts/${application.contact.id}/app/${application.opportunity.id}/submit/`,
      {
        method: 'POST',
      }
    )(dispatch);
  };

// duplicated with Get contact applications
export const GET_ALL_SUBMITTED_APPLICATIONS = 'GET_ALL_SUBMITTED_APPLICATIONS';
export const GET_ALL_SUBMITTED_APPLICATIONS_API = fetchActionTypes(
  GET_ALL_SUBMITTED_APPLICATIONS
);
export const getAllSubmittedApplications = contactId =>
  makeApiFetchActions(
    GET_ALL_SUBMITTED_APPLICATIONS,
    `${API_URL}/api/contacts/${contactId}/app/`
  );

export const GET_ALL_INTERNAL_OPPORTUNITIES = 'GET_ALL_INTERNAL_OPPORTUNITIES';
export const GET_ALL_INTERNAL_OPPORTUNITIES_API = fetchActionTypes(
  GET_ALL_INTERNAL_OPPORTUNITIES
);
export const getAllInternalOpportunities = makeApiFetchActions(
  GET_ALL_INTERNAL_OPPORTUNITIES,
  `${API_URL}/api/internal/opportunities/`
);

// ---------------------------------------------------------------------------

export const STAFF_RECOMMEND_APPLICATION = 'STAFF_RECOMMEND_APPLICATION';
export const STAFF_RECOMMEND_APPLICATION_API = fetchActionTypes(
  STAFF_RECOMMEND_APPLICATION
);
export const staffRecommendApplication = (contactId, opportunityId) =>
  async function(dispatch) {
    dispatch({
      type: STAFF_RECOMMEND_APPLICATION,
    });

    return await makeApiFetchActions(
      STAFF_RECOMMEND_APPLICATION,
      `${API_URL}/api/contacts/${contactId}/app/${opportunityId}/recommend/`,
      {
        method: 'POST',
      }
    )(dispatch);
  };

// ---------------------------------------------------------------------------

export const STAFF_NOT_A_FIT_APPLICATION = 'STAFF_NOT_A_FIT_APPLICATION';
export const STAFF_NOT_A_FIT_APPLICATION_API = fetchActionTypes(
  STAFF_NOT_A_FIT_APPLICATION
);
export const staffNotAFitApplication = (contactId, opportunityId) =>
  async function(dispatch) {
    dispatch({
      type: STAFF_NOT_A_FIT_APPLICATION,
    });

    return await makeApiFetchActions(
      STAFF_NOT_A_FIT_APPLICATION,
      `${API_URL}/api/contacts/${contactId}/app/${opportunityId}/not-a-fit/`,
      {
        method: 'POST',
      }
    )(dispatch);
  };

// ---------------------------------------------------------------------------

export const STAFF_REOPEN_APPLICATION = 'STAFF_REOPEN_APPLICATION';
export const STAFF_REOPEN_APPLICATION_API = fetchActionTypes(
  STAFF_REOPEN_APPLICATION
);
export const staffReopenApplication = (contactId, opportunityId) =>
  async function(dispatch) {
    dispatch({
      type: STAFF_REOPEN_APPLICATION,
    });

    return await makeApiFetchActions(
      STAFF_REOPEN_APPLICATION,
      `${API_URL}/api/contacts/${contactId}/app/${opportunityId}/reopen/`,
      {
        method: 'POST',
      }
    )(dispatch);
  };

// ---------------------------------------------------------------------------

export const APPROVE_NEW_APPLICANTS = 'APPROVE_NEW_APPLICANTS';
export const APPROVE_NEW_APPLICANTS_API = fetchActionTypes(
  APPROVE_NEW_APPLICANTS
);
export const approveNewApplicants = (programId, applicants) =>
  async function(dispatch) {
    dispatch({
      type: APPROVE_NEW_APPLICANTS,
      applicants,
    });

    return await makeApiFetchActions(
      APPROVE_NEW_APPLICANTS,
      `${API_URL}/api/programs/${programId}/contacts/approve-many/`,
      {
        body: JSON.stringify(applicants),
        method: 'POST',
      }
    )(dispatch);
  };

// ---------------------------------------------------------------------------
// not using anymore
export const GET_ALL_INTERNAL_APPLICANTS = 'GET_ALL_INTERNAL_APPLICANTS';
export const GET_ALL_INTERNAL_APPLICANTS_API = fetchActionTypes(
  GET_ALL_INTERNAL_APPLICANTS
);
export const getAllInternalApplicants = makeApiFetchActions(
  GET_ALL_INTERNAL_APPLICANTS,
  `${API_URL}/api/internal/applications/`
);

// ---------------------------------------------------------------------------

export const GET_ORG_OPPORTUNITY = 'GET_ORG_OPPORTUNITY';
export const GET_ORG_OPPORTUNITY_API = fetchActionTypes(GET_ORG_OPPORTUNITY);
export const getOrgOpportunity = opportunityId =>
  makeApiFetchActions(
    GET_ORG_OPPORTUNITY,
    `${API_URL}/api/org/opportunities/${opportunityId}/`
  );

// ---------------------------------------------------------------------------

export const EMPLOYER_INTERVIEW_APPLICATION = 'EMPLOYER_INTERVIEW_APPLICATION';
export const EMPLOYER_INTERVIEW_APPLICATION_API = fetchActionTypes(
  EMPLOYER_INTERVIEW_APPLICATION
);
export const employerInterviewApplication = (
  contactId,
  opportunityId,
  interviewDateTime
) =>
  async function(dispatch) {
    dispatch({
      type: EMPLOYER_INTERVIEW_APPLICATION,
      interviewDateTime,
    });

    return await makeApiFetchActions(
      EMPLOYER_INTERVIEW_APPLICATION,
      `${API_URL}/api/contacts/${contactId}/app/${opportunityId}/interview/`,
      {
        body: JSON.stringify(interviewDateTime),
        method: 'POST',
      }
    )(dispatch);
  };
// ---------------------------------------------------------------------------

export const EMPLOYER_CONSIDER_APPLICATION = 'EMPLOYER_CONSIDER_APPLICATION';
export const EMPLOYER_CONSIDER_APPLICATION_API = fetchActionTypes(
  EMPLOYER_CONSIDER_APPLICATION
);
export const employerFinalistsApplication = (contactId, opportunityId) =>
  async function(dispatch) {
    dispatch({
      type: EMPLOYER_CONSIDER_APPLICATION,
    });

    return await makeApiFetchActions(
      EMPLOYER_CONSIDER_APPLICATION,
      `${API_URL}/api/contacts/${contactId}/app/${opportunityId}/consider/`,
      {
        method: 'POST',
      }
    )(dispatch);
  };
// ---------------------------------------------------------------------------

export const EMPLOYER_NOT_A_FIT_APPLICATION = 'EMPLOYER_NOT_A_FIT_APPLICATION';
export const EMPLOYER_NOT_A_FIT_APPLICATION_API = fetchActionTypes(
  EMPLOYER_NOT_A_FIT_APPLICATION
);
export const employerNotAFitApplication = (contactId, opportunityId) =>
  async function(dispatch) {
    dispatch({
      type: EMPLOYER_NOT_A_FIT_APPLICATION,
    });

    return await makeApiFetchActions(
      EMPLOYER_NOT_A_FIT_APPLICATION,
      `${API_URL}/api/contacts/${contactId}/app/${opportunityId}/not-a-fit/`,
      {
        method: 'POST',
      }
    )(dispatch);
  };
// ---------------------------------------------------------------------------

export const INTERNAL_DEACTIVATE_ROLE = 'INTERNAL_DEACTIVATE_ROLE';
export const INTERNAL_DEACTIVATE_ROLE_API = fetchActionTypes(
  INTERNAL_DEACTIVATE_ROLE
);
export const internalDeactivateRole = opportunityId =>
  async function(dispatch) {
    dispatch({
      type: INTERNAL_DEACTIVATE_ROLE,
    });

    return await makeApiFetchActions(
      INTERNAL_DEACTIVATE_ROLE,
      `${API_URL}/api/opportunity/${opportunityId}/deactivate/`,
      {
        method: 'POST',
      }
    )(dispatch);
  };

export const INTERNAL_ACTIVATE_ROLE = 'INTERNAL_ACTIVATE_ROLE';
export const INTERNAL_ACTIVATE_ROLE_API = fetchActionTypes(
  INTERNAL_ACTIVATE_ROLE
);
export const internalActivateRole = opportunityId =>
  async function(dispatch) {
    dispatch({
      type: INTERNAL_ACTIVATE_ROLE,
    });

    return await makeApiFetchActions(
      INTERNAL_ACTIVATE_ROLE,
      `${API_URL}/api/opportunity/${opportunityId}/activate/`,
      {
        method: 'POST',
      }
    )(dispatch);
  };

// ---------------------------------------------------------------------------

export const opportunitiesReducer = createReducer(
  {},
  {
    [ADD_OPPORTUNITY_API.RESOLVE]: (state, action) => {
      const opportunity = action.body.data;
      state[opportunity.id] = opportunity;
    },
    [UPDATE_OPPORTUNITY_API.RESOLVE]: (state, action) => {
      const opportunity = action.body.data;
      state[opportunity.id] = opportunity;
    },
    [GET_ALL_OPPORTUNITIES_API.RESOLVE]: (state, action) => {
      const newState = {};
      // clear out all old entries
      action.body.data.forEach(opportunity => {
        newState[opportunity.id] = opportunity;
      });
      return newState;
    },
    [GET_ALL_INTERNAL_OPPORTUNITIES_API.RESOLVE]: (state, action) => {
      const newState = {};
      // clear out all old entries
      action.body.data.forEach(opportunity => {
        newState[opportunity.id] = opportunity;
      });
      return newState;
    },
    [GET_ORG_OPPORTUNITY_API.RESOLVE]: (state, action) => {
      const opportunity = action.body.data;
      state[opportunity.id] = opportunity;
    },
    [INTERNAL_ACTIVATE_ROLE_API.RESOLVE]: (state, action) => {
      const opportunity = action.body.data;
      state[opportunity.id] = opportunity;
    },
    [INTERNAL_DEACTIVATE_ROLE_API.RESOLVE]: (state, action) => {
      const opportunity = action.body.data;
      state[opportunity.id] = opportunity;
    },
  }
);
export const applicationsReducer = createReducer(
  {},
  {
    [START_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;
      state[application.id] = application;
    },

    [GET_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;

      state[application.id] = application;
    },

    [GET_CONTACT_APPLICATIONS]: (state, action) => {
      const {data, contactId} = action;
      state[contactId] = data;
    },

    [GET_ALL_SUBMITTED_APPLICATIONS_API.RESOLVE]: (state, action) => {
      action.body.data.forEach(app => {
        state[app.id] = app;
      });
    },
    [UPDATE_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;
      state[application.id] = application;
    },
    [SUBMIT_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;
      state[application.id] = application;
    },
    [STAFF_RECOMMEND_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;
      state[application.id] = application;
    },
    [STAFF_REOPEN_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;
      state[application.id] = application;
    },
    [STAFF_NOT_A_FIT_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;
      state[application.id] = application;
    },
    [EMPLOYER_INTERVIEW_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;
      state[application.id] = application;
    },
    [EMPLOYER_CONSIDER_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;
      state[application.id] = application;
    },
    [EMPLOYER_NOT_A_FIT_APPLICATION_API.RESOLVE]: (state, action) => {
      const application = action.body.data;
      state[application.id] = application;
    },
  }
);

export const applicantsReducer = createReducer(
  {},
  {
    [APPROVE_NEW_APPLICANTS_API.RESOLVE]: (state, action) => {
      const applications = action.body.data;
      state['approved_applicants'] = [
        ...state['approved_applicants'],
        ...applications,
      ];
    },

    [GET_ALL_INTERNAL_APPLICANTS_API.RESOLVE]: (state, action) => {
      const newState = {};
      // clear out all old entries

      action.body.data.forEach(applicant => {
        newState[applicant.id] = applicant;
      });
      return newState;
    },
  }
);
