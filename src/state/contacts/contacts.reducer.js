import {createReducer} from 'redux-starter-kit';

import {
    GET_ALL_CONTACTS_API,
    GET_SUBMITTED_CONTACTS_API,
    GET_APPROVED_CONTACTS_API,
    APPROVE_NEW_CONTACTS_STATUS_API,
    RESET_FILTER_COUNT,
    GET_ALL_FILTERED_CONTACTS,
    ADD_CONTACTS_FILTERS,
    GET_FILTERED_CONTACTS_SUBMITTED,
    GET_CONTACT_API,
    GET_CONTACT_PROFILE_API,
    GET_MY_CONTACT_API,
    DELETE_EXPERIENCE,
    DELETE_CONTACT,
    UPDATE_CONTACT_API,
    ADD_CONTACT_API,
    GET_DYNAMIC_INSTRUCTIONS_API,
    SUBMIT_PROFILE_FOR_REVIEW_API,
    GET_ABOUT_ME_API,
    CREATE_ABOUT_ME_API,
    UPDATE_ABOUT_ME_API,
    GET_EXPERIENCE_API,
    ADD_EXPERIENCE_API,
    UPDATE_PROGRAM_APPS_API,
    GET_CONTACT_CAPABILITIES_API,
    DELETE_CONTACT_SKILL,
    UPDATE_CONTACT_SKILL


} from './contacts.actions'

export const contactsReducer = createReducer(
    {},
    {
      [GET_ALL_CONTACTS_API.RESOLVE]: (state, action) => {
        if (!action.body) {
          return {};
        } else {
          state.short = action.body.data;
        }
      },
      [GET_SUBMITTED_CONTACTS_API.RESOLVE]: (state, action) => {
        if (!action.body) {
          return {};
        } else {
          state.submitted = action.body.data;
        }
      },
      [GET_APPROVED_CONTACTS_API.RESOLVE]: (state, action) => {
        if (!action.body) {
          return {};
        } else {
          state.approved = action.body.data;
        }
      },
  
      [APPROVE_NEW_CONTACTS_STATUS_API.RESOLVE]: (state, action) => {
        const approvedContacts = action.body.data;
        const allFilteredContacts = state['all_filtered_contacts'];
        const newState = approvedContacts.map(approvedContact => {
          return allFilteredContacts.map(filteredContact => {
            if (filteredContact.id === approvedContact.id) {
              filteredContact.status = 'approved';
              return filteredContact;
            } else {
              return filteredContact;
            }
          });
        });
  
        state['all_filtered_contacts'] = newState[0];
      },
  
      [RESET_FILTER_COUNT]: (state, action) => {
        const {count, filterFormData} = action;
        state['filter_form_data'] = filterFormData;
        state['filter_count'] = count;
      },
      [GET_ALL_FILTERED_CONTACTS]: (state, action) => {
        const {data, filterFormData, filterCount} = action;
        state['all_filtered_contacts'] = data;
        state['filter_form_data'] = filterFormData;
        state['filter_count'] = filterCount;
      },
      [ADD_CONTACTS_FILTERS]: (state, action) => {
        const {data, filterFormData, filterCount} = action;
        state['filtered'] = data;
        state['filter_form_data'] = filterFormData;
        state['filter_count'] = filterCount;
      },
  
      [GET_FILTERED_CONTACTS_SUBMITTED]: (state, action) => {
        const {data} = action;
        state['filtered_submitted'] = data;
      },
  
      [GET_CONTACT_API.RESOLVE]: (state, action) => {
        const contact = action.body.data;
        state[contact.id] = {
          ...state[contact.id],
          ...contact,
        };
      },
      [GET_CONTACT_PROFILE_API.RESOLVE]: (state, action) => {
        const contact = action.body.data;
        state[contact.id] = {
          ...state[contact.id],
          ...contact,
        };
      },
  
      [GET_MY_CONTACT_API.RESOLVE]: (state, action) => {
        const contact = action.body.data;
        state[contact.id] = {
          ...state[contact.id],
          ...contact,
        };
      },
      [DELETE_EXPERIENCE]: (state, action) => {
        const experience = action.experience;
        state[experience.contact_id] = {
          ...state[experience.contact_id],
          experiences: state[experience.contact_id].experiences.filter(
            exp => exp.id !== experience.id
          ),
        };
      },
      [DELETE_CONTACT]: (state, action) => {
        const contactId = action.contactId;
  
        const newState = Object.values(state.short).filter(
          contact => contact.id !== contactId
        );
        state.short = newState;
        return state;
      },
  
      [UPDATE_CONTACT_API.RESOLVE]: (state, action) => {
        const contact = action.body.data;
        state[contact.id] = {
          ...state[contact.id],
          ...contact,
        };
      },
      [ADD_CONTACT_API.RESOLVE]: (state, action) => {
        const contact = action.body.data;
        state[contact.id] = contact;
      },
  
      [GET_DYNAMIC_INSTRUCTIONS_API.RESOLVE]: (state, action) => {
        const contact = action.body.data;
        state[contact.id].instructions = contact.instructions;
      },
      [SUBMIT_PROFILE_FOR_REVIEW_API.RESOLVE]: (state, action) => {
        const contact = action.body.data;
        state[contact.id].instructions = contact.instructions;
        state[contact.id].status = contact.status;
      },
      [GET_ABOUT_ME_API.RESOLVE]: (state, action) => {
        const contact = action.body.data;
        state[contact.id].profile = contact.profile;
      },
      [CREATE_ABOUT_ME_API.RESOLVE]: (state, action) => {
        const contact = action.body.data;
        state[contact.id].profile = contact.profile;
      },
      [UPDATE_ABOUT_ME_API.RESOLVE]: (state, action) => {
        const contact = action.body.data;
        const {first_name, last_name, email, phone_primary, profile} = contact;
        state[contact.id] = {
          ...state[contact.id],
          first_name,
          last_name,
          email,
          phone_primary,
          profile,
        };
      },
  
      [GET_EXPERIENCE_API.RESOLVE]: (state, action) => {
        const experience = action.body.data;
        state[experience.contact_id] = {
          ...state[experience.contact_id],
          experiences: state[experience.contact_id].experiences.map(exp => {
            if (exp.id === experience.id) {
              return experience;
            } else {
              return exp;
            }
          }),
        };
      },
      [ADD_EXPERIENCE_API.RESOLVE]: (state, action) => {
        const experience = action.body.data;
        state[experience.contact_id].experiences.push(experience);
      },
  
      [UPDATE_PROGRAM_APPS_API.RESOLVE]: (state, action) => {
        const contact = action.body.data;
        state[contact.id].program_apps = contact.program_apps;
      },
  
      [GET_CONTACT_CAPABILITIES_API.RESOLVE]: (state, action) => {
        const result = action.body.data;
        const contact_id = result.contact_id;
        if (state[contact_id] === undefined) {
          state[contact_id] = {id: contact_id};
        }
  
        state[contact_id].capabilities = {};
        result.capabilities.forEach(capability => {
          state[contact_id].capabilities[capability.id] = capability;
        });
        state[contact_id].other_skills = result.other_skills;
      },
      [DELETE_CONTACT_SKILL]: (state, action) => {
        const {skillId, contactId} = action.payload;
  
        const contact = state[contactId];
        if (!contact) {
          return state;
        }
  
        if (contact.capabilities) {
          // Clear skill out of everything
          Object.values(contact.capabilities).forEach(capability => {
            contact.capabilities[capability.id].skills = capability.skills.filter(
              skill => skill.id !== skillId
            );
            contact.capabilities[
              capability.id
            ].suggested_skills = capability.suggested_skills.filter(
              skill => skill.id !== skillId
            );
          });
        }
        if (contact.other_skills) {
          contact.other_skills = contact.other_skills.filter(
            skill => skill.id !== skillId
          );
        }
      },
      [UPDATE_CONTACT_SKILL]: (state, action) => {
        const {result, contactId} = action;
  
        // Make sure the contact has all the necessary properties
        state[contactId] = {
          id: contactId,
          capabilities: {},
          other_skills: [],
          ...state[contactId],
        };
  
        const newSkill = result;
        const contact = state[contactId];
        if (contact.capabilities === undefined) {
          contact.capabilities = {};
        }
        if (contact.other_skills === undefined) {
          contact.other_skills = [];
        }
  
        // Clear skill out of everything first
        Object.values(contact.capabilities).forEach(capability => {
          contact.capabilities[capability.id].skills = capability.skills.filter(
            skill => skill.id !== newSkill.id
          );
          contact.capabilities[
            capability.id
          ].suggested_skills = capability.suggested_skills.filter(
            skill => skill.id !== newSkill.id
          );
        });
        contact.other_skills = contact.other_skills.filter(
          skill => skill.id !== newSkill.id
        );
  
        // If this skill isn't associated with any capabilities, add it to the
        // other skills
        if (
          newSkill.capabilities.length === 0 &&
          newSkill.suggested_capabilities.length === 0
        ) {
          contact.other_skills.push({id: newSkill.id, name: newSkill.name});
        } else {
          // Otherwise, add it to the relevant capabilities
          const alreadyAdded = {};
          const addSkill = key => capability => {
            // Don't add this skill more than once to the same capability
            if (alreadyAdded[capability.id]) {
              return;
            }
  
            if (contact.capabilities[capability.id] === undefined) {
              contact.capabilities[capability.id] = {
                skills: [],
                suggested_skills: [],
                ...capability,
              };
            }
  
            contact.capabilities[capability.id][key].push({
              id: newSkill.id,
              name: newSkill.name,
            });
  
            alreadyAdded[capability.id] = true;
          };
          newSkill.capabilities.forEach(addSkill('skills'));
          newSkill.suggested_capabilities.forEach(addSkill('suggested_skills'));
        }
      },
    }
  );
  