import { API_URL } from '../../constants'
import fetchActionCreator from 'fetch-action-creator';

// ## ACTIONS ##

const ADD_EXPERIENCE = 'ADD_EXPERIENCE';
const addExperience = (contactId, experience) => async function(dispatch) {
  dispatch({type: ADD_EXPERIENCE, experience});

  await apiAddExperience(contactId, experience)(dispatch);
};

export { ADD_EXPERIENCE, addExperience };

// API Actions
// Note on naming convention here: 
// All fetch API methods creators are prefixed with 'api' for clarity in use

const apiGetAllContacts = () =>
  fetchActionCreator(
    'ALL_CONTACTS',
    `${API_URL}/api/contacts/`
  );

const apiGetContact = (contactId) =>
  fetchActionCreator(
    'CONTACT',
    `${API_URL}/api/contacts/${contactId}/`
  );

const apiAddContact = (contact) =>
  fetchActionCreator(
    'ADD_CONTACT',
    `${API_URL}/api/contacts/`,
    {
      body: contact,
      method: 'POST',
    }    
  );

const apiGetProfile = (contactId) =>
  fetchActionCreator(
    'PROFILE',
    `${API_URL}/api/contacts/${contactId}/profile/`
  );

const apiGetExperiences = (contactId) =>
  fetchActionCreator(
    'EXPERIENCES',
    `${API_URL}/api/contacts/${contactId}/experiences/`
  );

const apiGetExperience = (contactId, expId) =>
  fetchActionCreator(
    'EXPERIENCE',
    `${API_URL}/api/contacts/${contactId}/experiences/${expId}/`
  );

const apiAddExperience = (contactId, experience) =>
  fetchActionCreator(
    'ADD_EXPERIENCE',
    `${API_URL}/api/contacts/${contactId}/experiences/`,
    {
      body: experience,
      method: 'POST',
    }    
  );

const apiDeleteExperience = (expId) =>
  fetchActionCreator(
    'DELETE_EXPERIENCE',
    `${API_URL}/api/experiences/${expId}/`,
    {
      method: 'DELETE',
    }    
  );

const apiUpdateExperience = (expId, update) =>
  fetchActionCreator(
    'UPDATE_EXPERIENCE',
    `${API_URL}/api/experiences/${expId}/`,
    {
      body: update,
      method: 'PUT',
    }    
  );

const apiGetExperiencesByType = (contactId, type) =>
  fetchActionCreator(
    'EXPERIENCES_BY_TYPE',
    `${API_URL}/api/contacts/${contactId}/experiences/${type}/`,
  );

const apiGetAllTags = () =>
  fetchActionCreator(
    'ALL_TAGS',
    `${API_URL}/api/tags/`,
  );

const apiGetTag = (tagId) =>
  fetchActionCreator(
    'TAG',
    `${API_URL}/api/tags/${tagId}`,
  );

const apiGetContactTags = (contactId, tagType) => {
  if (tagType !== null && tagType !== undefined) {
    return fetchActionCreator(
      'CONTACT_TAGS',
      `${API_URL}/api/contacts/${contactId}/tags/?type=${tagType}`,
    );
  } else {
    return fetchActionCreator(
      'CONTACT_TAGS',
      `${API_URL}/api/contacts/${contactId}/tags/`,
    );
  }
};

const apiAddAchievement = (expId, achievement) => 
  fetchActionCreator(
    'ADD_ACHIEVEMENT',
    `${API_URL}/api/experiences/${expId}/achievements/`,
    {
      body: achievement,
      method: 'POST',
    }    
  );

const apiUpdateAchievement = (achievementId, achievement) => 
  fetchActionCreator(
    'UPDATE_ACHIEVEMENT',
    `${API_URL}/api/achievements/${achievementId}/`,
    {
      body: achievement,
      method: 'PUT',
    }    
  );

const apiDeleteAchievement = (achievementId) => 
  fetchActionCreator(
    'DELETE_ACHIEVEMENT',
    `${API_URL}/api/achievements/${achievementId}/`,
    {
      method: 'DELETE',
    }    
  );


