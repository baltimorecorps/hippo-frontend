import {connect} from 'react-redux';
import {createSelector} from 'redux-starter-kit';
import {
  getContact,
  getContactProfile,
  updateContact,
  addContactSkill,
  getAboutMe,
  createAboutMe,
  updateAboutMe,
  getDynamicInstructions,
} from 'state/contacts';

import {refreshPrograms, addNewProgram} from 'state/programs';
import {
  startResumeCreation,
  startResumeSelect,
  cancelResumeSelect,
  generateResume,
} from 'state/resume';
import {RESUME_CREATION} from 'state/resume';
import ProfilePage from './ProfilePage';

// TODO: refactor to use generic selectors, merge with ExperiencesList.container
const getExperiences = createSelector(['experiences'], experiences =>
  Object.keys(experiences).map(id => experiences[id])
);

const getSelection = createSelector(['resume.selected']);
const getResumeCreationStep = createSelector(['resume.resumeCreationStep']);

const getContactId = (state, props) =>
  props.contactId || props.match.params.contactId;

const getResumeAll = createSelector(
  [getExperiences, getSelection, getContactId],
  (exps, selection, contactId) => {
    let resume = {
      relevant_exp: [],
      other_exp: [],
      relevant_edu: [],
      other_edu: [],
      relevant_achieve: [],
      other_achieve: [],
      relevant_skills: [],
      other_skills: [],
    };
    const contactExps = exps.filter(
      exp => exp.contact_id.toString() === contactId.toString()
    );

    [
      ['Work', 'exp'],
      ['Service', 'exp'],
      ['Education', 'edu'],
      ['Accomplishment', 'achieve'],
    ].forEach(([type, suffix]) => {
      contactExps
        .filter(exp => exp.type === type)
        .forEach(exp => {
          resume[`relevant_${suffix}`].push(exp.id);
        });
    });
    return resume;
  }
);

const getResumeSelected = createSelector(
  [getExperiences, getSelection, getContactId],
  (exps, selection, contactId) => {
    let resume = {
      relevant_exp: [],
      other_exp: [],
      relevant_edu: [],
      other_edu: [],
      relevant_achieve: [],
      other_achieve: [],
      relevant_skills: [],
      other_skills: [],
    };
    const contactExps = exps.filter(
      exp => exp.contact_id.toString() === contactId.toString()
    );

    [
      ['Work', 'exp', 'experience'],
      ['Service', 'exp', 'experience'],
      ['Education', 'edu', 'education'],
      ['Accomplishment', 'achieve', 'accomplishments'],
    ].forEach(([type, suffix, selectKey]) => {
      contactExps
        .filter(exp => exp.type === type)
        .forEach(exp => {
          if (selection[selectKey].indexOf(exp.id) !== -1) {
            resume[`relevant_${suffix}`].push(exp.id);
          } else {
            resume[`other_${suffix}`].push(exp.id);
          }
        });
    });
    return resume;
  }
);

const getResume = createSelector(
  [getResumeCreationStep, getResumeSelected, getResumeAll],
  (step, resumeSelected, resumeAll) => {
    if (step === RESUME_CREATION.SELECT_HIGHLIGHTS) {
      return resumeSelected;
    } else {
      return resumeAll;
    }
  }
);

// (DK 2019-09-12)
// The state that the top level page uses is mostly the contact state,
// which looks like this:
// {
//   contacts: {
//     <contact1 id>: { <contact1 details> },
//     <contact2 id>: { <contact2 details> },
//     ...
//   },
//   ...
// }
//
// The props to this container specify which particular contact we want to
// display on the page, and we pull that contact's info out of the state

export const mapStateToProps = (state, props) => {
  const contactId = props.contactId || props.match.params.contactId;
  const contactInfo = state.contacts[contactId];

  let experiences = {work: [], education: [], portfolio: []};
  if (contactInfo)
    contactInfo.experiences.forEach(exp => {
      if (exp.type === 'Work') return experiences.work.push(exp);
      if (exp.type === 'Education') return experiences.education.push(exp);
      if (exp.type === 'Accomplishment') return experiences.portfolio.push(exp);
    });

  return {
    contactId: Number(contactId),
    contactInfo,
    experiences,
    showResumeDialog:
      state.resume.resumeCreationStep === RESUME_CREATION.CHOOSE_STYLE,
    inSelectMode:
      state.resume.resumeCreationStep === RESUME_CREATION.SELECT_HIGHLIGHTS,
    showResumeSpinner: state.resume.inProgress,
    myResume: getResume(state, props),
  };
};

// Refreshes the state of all contacts (as shown above) from the API, via
// the ALL_CONTACTS event (see state/contacts.js for details)
export const mapDispatchToProps = dispatch => ({
  updateContact: contact => updateContact(contact)(dispatch),
  refreshDynamicInstructions: contactId =>
    getDynamicInstructions(contactId)(dispatch),
  refreshPrograms: async contactId => {
    await refreshPrograms(contactId)(dispatch);
  },
  getContact: async contactId => {
    await getContact(contactId)(dispatch);
  },
  getContactProfile: async contactId => {
    await getContactProfile(contactId)(dispatch);
  },
  createAboutMe: async contactId => {
    await createAboutMe(contactId)(dispatch);
  },
  getAboutMe: async contactId => {
    await getAboutMe(contactId)(dispatch);
  },
  updateAboutMe: async (contactId, aboutMe) => {
    await updateAboutMe(contactId, aboutMe)(dispatch);
  },

  addNewProgram: async program => {
    await addNewProgram(program)(dispatch);
  },
  addContactSkill: (contactId, skill) =>
    addContactSkill(contactId, skill)(dispatch),
  startResumeCreation: () => dispatch(startResumeCreation()),
  startResumeSelect: () => dispatch(startResumeSelect()),
  cancelResumeSelect: () => dispatch(cancelResumeSelect()),
  generateResume: (contactId, name, resume) => {
    resume.name = name;
    return generateResume(contactId, resume)(dispatch);
  },
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);

export default ProfileContainer;
