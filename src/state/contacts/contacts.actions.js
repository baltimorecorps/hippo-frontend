import {fetchActionTypes} from 'redux-fetch-wrapper';

import {makeApiFetchActions} from 'lib/helperFunctions/helpers';
import {makeAuthFetchActions} from 'lib/Auth0/auth0';
import {formData} from '../../components/Internal/ApplicantsBoard/defaultValues';
import {API_URL} from 'app/constants';


const apiAddContact = (authToken, contact) =>
  makeAuthFetchActions(authToken, ADD_CONTACT, `${API_URL}/api/contacts/`, {
    body: JSON.stringify(contact),
    method: 'POST',
  });

// Get a contact
export const GET_CONTACT = 'GET_CONTACT';
export const GET_CONTACT_API = fetchActionTypes(GET_CONTACT);
export const getContact = contactId =>
  makeApiFetchActions(GET_CONTACT, `${API_URL}/api/contacts/${contactId}/`);

export const GET_CONTACT_CAPABILITIES = 'GET_CONTACT_CAPABILITIES';
export const GET_CONTACT_CAPABILITIES_API = fetchActionTypes(
  GET_CONTACT_CAPABILITIES
);
export const getContactCapabilities = contactId =>
  makeApiFetchActions(
    GET_CONTACT_CAPABILITIES,
    `${API_URL}/api/contacts/${contactId}/capabilities/`
  );

// Get a contact profile
export const GET_CONTACT_PROFILE = 'GET_CONTACT_PROFILE';
export const GET_CONTACT_PROFILE_API = fetchActionTypes(GET_CONTACT_PROFILE);
export const getContactProfile = contactId =>
  makeApiFetchActions(
    GET_CONTACT_PROFILE,
    `${API_URL}/api/contacts/${contactId}/profile/`
  );

// export const refreshContacts = apiGetAllContacts();

export const ADD_CONTACT = 'ADD_CONTACT';
export const ADD_CONTACT_API = fetchActionTypes(ADD_CONTACT);
export const addContact = (authToken, contact) =>
  async function(dispatch) {
    dispatch(addContactLocal(contact));

    return await apiAddContact(authToken, contact)(dispatch);
  };

const addContactLocal = contact => ({
  type: ADD_CONTACT,
  contact,
});

export const UPDATE_CONTACT_SKILL = 'UPDATE_CONTACT_SKILL';
export const updateContactSkill = (contactId, result) => ({
  type: UPDATE_CONTACT_SKILL,
  contactId,
  result: result.body.data,
});

export const ADD_CONTACT_SKILL = 'ADD_CONTACT_SKILL';
export const ADD_CONTACT_SKILL_API = fetchActionTypes(ADD_CONTACT_SKILL);
export const addContactSkill = (contactId, skill) =>
  async function(dispatch) {
    const payload = {
      contact_id: contactId,
      ...skill,
    };
    dispatch({
      type: ADD_CONTACT_SKILL,
      payload,
    });

    const result = await makeApiFetchActions(
      ADD_CONTACT_SKILL,
      `${API_URL}/api/contacts/${contactId}/skills/`,
      {
        body: JSON.stringify(payload),
        method: 'POST',
      }
    )(dispatch);

    if (result.statusCode === 201 || result.statusCode === 200) {
      dispatch(updateContactSkill(contactId, result));
    }
    return result;
  };

export const DELETE_CONTACT = 'DELETE_CONTACT';
export const DELETE_CONTACT_API = fetchActionTypes(DELETE_CONTACT);
export const deleteContact = contactId =>
  async function(dispatch) {
    let response;
    try {
      response = await makeApiFetchActions(
        DELETE_CONTACT,
        `${API_URL}/api/contacts/${contactId}/`,
        {
          method: 'DELETE',
        }
      )(dispatch);
      dispatch({
        type: DELETE_CONTACT,
        contactId,
      });
    } catch (err) {
      console.error(err);
    }

    return response;
  };

export const DELETE_CONTACT_SKILL = 'DELETE_CONTACT_SKILL';
export const DELETE_CONTACT_SKILL_API = fetchActionTypes(DELETE_CONTACT_SKILL);
export const deleteContactSkill = (contactId, skill) =>
  async function(dispatch) {
    const result = await makeApiFetchActions(
      DELETE_CONTACT_SKILL,
      `${API_URL}/api/contacts/${contactId}/skills/${skill.id}/`,
      {
        method: 'DELETE',
      }
    )(dispatch);

    if (result.statusCode === 200) {
      dispatch({
        type: DELETE_CONTACT_SKILL,
        payload: {
          contactId,
          skillId: skill.id,
        },
      });
    }

    return result;
  };

export const ADD_SKILL_SUGGESTION = 'ADD_CAPABILITY_SKILL_SUGGESTION';
export const ADD_SKILL_SUGGESTION_API = fetchActionTypes(ADD_SKILL_SUGGESTION);
export const addSkillSuggestion = (contactId, capabilityId, skill) =>
  async function(dispatch) {
    const payload = {
      contact_id: contactId,
      capability_id: capabilityId,
      name: skill.name,
    };
    dispatch({
      type: ADD_SKILL_SUGGESTION,
      payload,
    });

    const result = await makeApiFetchActions(
      ADD_SKILL_SUGGESTION,
      `${API_URL}/api/contacts/${contactId}/capabilities/${capabilityId}/suggestion/`,
      {
        body: JSON.stringify(payload),
        method: 'POST',
      }
    )(dispatch);

    if (result.statusCode === 201 || result.statusCode === 200) {
      dispatch(updateContactSkill(contactId, result));
    }
    return result;
  };

export const DELETE_SKILL_SUGGESTION_API = fetchActionTypes(
  'DELETE_CAPABILITY_SKILL_SUGGESTION'
);
export const deleteSkillSuggestion = (contactId, capabilityId, skill) =>
  async function(dispatch) {
    const result = await makeApiFetchActions(
      'DELETE_CAPABILITY_SKILL_SUGGESTION',
      `${API_URL}/api/contacts/${contactId}/capabilities/${capabilityId}/suggestion/${skill.id}/`,
      {
        method: 'DELETE',
      }
    )(dispatch);

    if (result.statusCode === 200) {
      dispatch({
        type: DELETE_CONTACT_SKILL,
        payload: {
          contactId,
          skillId: skill.id,
        },
      });
    }

    return result;
  };

// Update/Edit a contact
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const UPDATE_CONTACT_API = fetchActionTypes(UPDATE_CONTACT);
export const updateContact = contact =>
  async function(dispatch) {
    dispatch({
      type: UPDATE_CONTACT,
      contact,
    });

    return await makeApiFetchActions(
      UPDATE_CONTACT,
      `${API_URL}/api/contacts/${contact.id}/`,
      {
        body: JSON.stringify(contact),
        method: 'PUT',
      }
    )(dispatch);
  };

// Update/Edit a contact
export const updateContactSkills = (contactId, skills) =>
  async function(dispatch) {
    const contact = {
      id: contactId,
      skills,
    };

    const result = await updateContact(contact)(dispatch);
    if (result.statusCode === 200) {
      await getContactCapabilities(contactId)(dispatch);
    }
    return result;
  };

// ------------------------------------------------------------------------------------

export const GET_MY_CONTACT = 'GET_MY_CONTACT';
export const GET_MY_CONTACT_API = fetchActionTypes(GET_MY_CONTACT);
export const getMyContact = authToken =>
  async function(dispatch) {
    dispatch({
      type: GET_MY_CONTACT,
    });

    return await apiGetMyContact(authToken)(dispatch);
  };

export const apiGetMyContact = authToken =>
  makeAuthFetchActions(
    authToken,
    GET_MY_CONTACT,
    `${API_URL}/api/contacts/me/`
  );

// ---------------------------------------------------------------------------

export const CREATE_ABOUT_ME = 'CREATE_ABOUT_ME';
export const CREATE_ABOUT_ME_API = fetchActionTypes(CREATE_ABOUT_ME);
export const createAboutMe = contactId =>
  async function(dispatch) {
    return await makeApiFetchActions(
      CREATE_ABOUT_ME,
      `${API_URL}/api/contacts/${contactId}/about-me/`,
      {
        method: 'POST',
      }
    )(dispatch);
  };

export const GET_ABOUT_ME = 'GET_ABOUT_ME';
export const GET_ABOUT_ME_API = fetchActionTypes(GET_ABOUT_ME);
export const getAboutMe = contactId =>
  makeApiFetchActions(
    GET_ABOUT_ME,
    `${API_URL}/api/contacts/${contactId}/about-me/`
  );

export const UPDATE_ABOUT_ME = 'UPDATE_ABOUT_ME';
export const UPDATE_ABOUT_ME_API = fetchActionTypes(UPDATE_ABOUT_ME);
export const updateAboutMe = (contactId, aboutMe) =>
  async function(dispatch) {
    await makeApiFetchActions(
      UPDATE_ABOUT_ME,
      `${API_URL}/api/contacts/${contactId}/about-me/`,
      {
        body: JSON.stringify(aboutMe),
        method: 'PUT',
      }
    )(dispatch);
  };

// ---------------------------------------------------------------------------

export const UPDATE_PROGRAM_APPS = 'UPDATE_PROGRAM_APPS';
export const UPDATE_PROGRAM_APPS_API = fetchActionTypes(UPDATE_PROGRAM_APPS);
export const updateProgramApps = (programApps, contactId) =>
  async function(dispatch) {
    dispatch({
      type: UPDATE_PROGRAM_APPS,
      programApps,
    });

    return await makeApiFetchActions(
      UPDATE_PROGRAM_APPS,
      `${API_URL}/api/contacts/${contactId}/program-apps/interested/`,
      {
        body: JSON.stringify(programApps),
        method: 'PUT',
      }
    )(dispatch);
  };

// ---------------------------------------------------------------------------

export const GET_DYNAMIC_INSTRUCTIONS = 'GET_DYNAMIC_INSTRUCTIONS';
export const GET_DYNAMIC_INSTRUCTIONS_API = fetchActionTypes(
  GET_DYNAMIC_INSTRUCTIONS
);
export const getDynamicInstructions = contactId =>
  makeApiFetchActions(
    GET_DYNAMIC_INSTRUCTIONS,
    `${API_URL}/api/contacts/${contactId}/instructions/`
  );

// ---------------------------------------------------------------------------

export const SUBMIT_PROFILE_FOR_REVIEW = 'SUBMIT_PROFILE_FOR_REVIEW';
export const SUBMIT_PROFILE_FOR_REVIEW_API = fetchActionTypes(
  SUBMIT_PROFILE_FOR_REVIEW
);
export const submitProfileForReview = contactId =>
  async function(dispatch) {
    dispatch({
      type: SUBMIT_PROFILE_FOR_REVIEW,
    });

    return await makeApiFetchActions(
      SUBMIT_PROFILE_FOR_REVIEW,
      `${API_URL}/api/contacts/${contactId}/profile/submit/`,
      {
        method: 'POST',
      }
    )(dispatch);
  };
// ---------------------------------------------------------------------------

export const GET_EXPERIENCE = 'GET_EXPERIENCE';
export const GET_EXPERIENCE_API = fetchActionTypes(GET_EXPERIENCE);
export const getExperience = expId =>
  makeApiFetchActions(GET_EXPERIENCE, `${API_URL}/api/experiences/${expId}/`);

// ---------------------------------------------------------------------------
export const ADD_EXPERIENCE = 'ADD_EXPERIENCE';
export const ADD_EXPERIENCE_API = fetchActionTypes(ADD_EXPERIENCE);
export const addExperience = experience =>
  async function(dispatch) {
    dispatch({
      type: ADD_EXPERIENCE,
      experience,
    });

    await makeApiFetchActions(
      ADD_EXPERIENCE,
      `${API_URL}/api/contacts/${experience.contact_id}/experiences/`,
      {
        body: JSON.stringify(experience),
        method: 'POST',
        credentials: 'include',
      }
    )(dispatch);
  };
// ---------------------------------------------------------------------------
export const REFRESH_EXPERIENCE_TYPE = 'REFRESH_EXPERIENCE_TYPE';
export const REFRESH_EXPERIENCE_TYPE_API = fetchActionTypes(
  REFRESH_EXPERIENCE_TYPE
);
export const refreshExperienceType = (contactId, expType) => {
  expType = expType.toLowerCase();
  return makeApiFetchActions(
    REFRESH_EXPERIENCE_TYPE,
    `${API_URL}/api/contacts/${contactId}/experiences/?type=${expType}`,
    null,
    {
      onResolve: resolveAction => ({
        ...resolveAction,
        filter: expType,
      }),
    }
  );
};
// ---------------------------------------------------------------------------

export const DELETE_EXPERIENCE = 'DELETE_EXPERIENCE';
export const DELETE_EXPERIENCE_API = fetchActionTypes(DELETE_EXPERIENCE);
export const deleteExperience = experience =>
  async function(dispatch) {
    try {
      await makeApiFetchActions(
        DELETE_EXPERIENCE,
        `${API_URL}/api/experiences/${experience.id}/`,
        {
          method: 'DELETE',
        }
      )(dispatch);
      dispatch({
        type: DELETE_EXPERIENCE,
        experience: experience,
      });
    } catch (error) {
      console.error(error);
    }
  };

// ---------------------------------------------------------------------------

export const GET_ALL_CONTACTS = 'GET_ALL_CONTACTS';
export const GET_ALL_CONTACTS_API = fetchActionTypes(GET_ALL_CONTACTS);
export const getAllContacts = makeApiFetchActions(
  GET_ALL_CONTACTS,
  `${API_URL}/api/contacts/`
);
// ---------------------------------------------------------------------------

export const GET_SUBMITTED_CONTACTS = 'GET_SUBMITTED_CONTACTS';
export const GET_SUBMITTED_CONTACTS_API = fetchActionTypes(
  GET_SUBMITTED_CONTACTS
);
export const getSubmittedContacts = makeApiFetchActions(
  GET_SUBMITTED_CONTACTS,
  `${API_URL}/api/contacts/?status=submitted`
);
// ---------------------------------------------------------------------------

export const GET_APPROVED_CONTACTS = 'GET_APPROVED_CONTACTS';
export const GET_APPROVED_CONTACTS_API = fetchActionTypes(
  GET_APPROVED_CONTACTS
);
export const getApprovedContacts = makeApiFetchActions(
  GET_APPROVED_CONTACTS,
  `${API_URL}/api/contacts/?status=approved`
);

// ---------------------------------------------------------------------------

export const APPROVE_NEW_CONTACTS_STATUS = 'APPROVE_NEW_CONTACTS_STATUS';
export const APPROVE_NEW_CONTACTS_STATUS_API = fetchActionTypes(
  APPROVE_NEW_CONTACTS_STATUS
);
export const approveNewContactsStatus = (applicantIds, approvedContacts) =>
  async function(dispatch) {
    try {
      const result = await makeApiFetchActions(
        APPROVE_NEW_CONTACTS_STATUS,
        `${API_URL}/api/contacts/approve/`,
        {
          body: JSON.stringify(applicantIds),
          method: 'POST',
        }
      )(dispatch);
      dispatch({
        type: APPROVE_NEW_CONTACTS_STATUS,
        data: result.body.data,
        applicantIds,
        approvedContacts,
      });
    } catch (error) {
      console.error(error);
    }
  };

// ---------------------------------------------------------------------------

export const GET_ALL_FILTERED_CONTACTS = 'GET_ALL_FILTERED_CONTACTS';
export const GET_ALL_FILTERED_CONTACTS_API = fetchActionTypes(
  GET_ALL_FILTERED_CONTACTS
);
export const getAllFilteredContacts = filterFormData =>
  async function(dispatch) {
    try {
      const result = await makeApiFetchActions(
        GET_ALL_FILTERED_CONTACTS,
        `${API_URL}/api/contacts/filter/`,
        {
          body: JSON.stringify({}),
          method: 'POST',
        }
      )(dispatch);
      dispatch({
        type: GET_ALL_FILTERED_CONTACTS,
        data: result.body.data,
        filterFormData,
        filterCount: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };
// ---------------------------------------------------------------------------

export const ADD_CONTACTS_FILTERS = 'ADD_CONTACTS_FILTERS';
export const ADD_CONTACTS_FILTERS_API = fetchActionTypes(ADD_CONTACTS_FILTERS);
export const addContactsFilters = (
  filtersPayload,
  filterFormData,
  filterCount
) =>
  async function(dispatch) {
    try {
      const result = await makeApiFetchActions(
        ADD_CONTACTS_FILTERS,
        `${API_URL}/api/contacts/filter/`,
        {
          body: JSON.stringify(filtersPayload),
          method: 'POST',
        }
      )(dispatch);
      dispatch({
        type: ADD_CONTACTS_FILTERS,
        data: result.body.data,
        filterFormData,
        filterCount,
      });
    } catch (error) {
      console.error(error);
    }
  };
// ---------------------------------------------------------------------------

export const RESET_FILTER_COUNT = 'RESET_FILTER_COUNT';
export const resetFilterCount = dispatch =>
  dispatch({
    type: RESET_FILTER_COUNT,
    filterFormData: formData,
    count: 0,
  });

// ---------------------------------------------------------------------------

export const GET_FILTERED_CONTACTS_SUBMITTED =
  'GET_FILTERED_CONTACTS_SUBMITTED';
export const GET_FILTERED_CONTACTS_SUBMITTED_API = fetchActionTypes(
  GET_FILTERED_CONTACTS_SUBMITTED
);
export const getFilteredContactsSubmitted = () =>
  async function(dispatch) {
    try {
      const result = await makeApiFetchActions(
        GET_FILTERED_CONTACTS_SUBMITTED,
        `${API_URL}/api/contacts/filter/`,
        {
          body: JSON.stringify({status: ['submitted']}),
          method: 'POST',
        }
      )(dispatch);
      dispatch({
        type: GET_FILTERED_CONTACTS_SUBMITTED,
        data: result.body.data,
      });
    } catch (error) {
      console.error(error);
    }
  };