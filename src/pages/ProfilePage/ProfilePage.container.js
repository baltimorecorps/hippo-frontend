import {connect} from 'react-redux';
import {createSelector} from 'redux-starter-kit';
import {refreshContacts, updateContact} from 'actions/contacts';
import {
  startResumeCreation,
  startResumeSelect,
  cancelResumeSelect,
  generateResume,
} from 'actions/resume';
import {RESUME_CREATION} from 'reducers/resume';
import ProfilePage from './ProfilePage';

// eslint-disable-next-line no-unused-vars
const addNewContact = dispatch =>
  async function(contact) {
    await refreshContacts(dispatch);
  };

// TODO: refactor to use generic selectors, merge with ExperiencesList.container
const getExperiences = createSelector(
  ['experiences'],
  experiences => Object.keys(experiences).map(id => experiences[id])
);

const getSelection = createSelector(['resume.selected']);
const getResumeCreationStep = createSelector(['resume.resumeCreationStep']);

const getContact = (state, props) => props.match.params.contactId;

const getResumeAll = createSelector(
  [getExperiences, getSelection, getContact],
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
  [getExperiences, getSelection, getContact],
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
  const contactId = props.match.params.contactId;
  const contactInfo = state.contacts[contactId];
  return {
    contactId: Number(contactId),
    contactInfo,
    showResumeDialog:
      state.resume.resumeCreationStep === RESUME_CREATION.CHOOSE_STYLE,
    inSelectMode:
      state.resume.resumeCreationStep === RESUME_CREATION.SELECT_HIGHLIGHTS,
    showResumeSpinner: state.resume.inProgress,
    resume: getResume(state, props),
  };
};

// Refreshes the state of all contacts (as shown above) from the API, via
// the ALL_CONTACTS event (see reducers/contacts.js for details)
export const mapDispatchToProps = dispatch => ({
  updateContact: contact => updateContact(contact)(dispatch),
  refreshContacts: () => refreshContacts(dispatch),
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
