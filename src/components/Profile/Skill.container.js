import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'redux-starter-kit';
import Skill from './Skill';

import {
  addExperience,
  refreshExperienceType,
  updateExperience,
  deleteExperience,
} from '../../actions/profile';

const getExperiences = createSelector(
  ['experiences'],
  experiences => Object.keys(experiences).map(id => experiences[id]),
);

const getContact = (state, props) => props.contactId;
const getTypeFilter = (state, props) => props.tagType;

const makeGetRelevantExperiences = () => {
  const getRelevantExperiences = createSelector(
    [getExperiences, getContact, getTypeFilter],
    (exps, contactId, type) =>
      exps
        .filter(exp => exp.contact_id.toString() === contactId.toString())
        .filter(exp => exp.type === type),
  );
  return getRelevantExperiences;
};

export const makeMapStateToProps = () => {
  const getRelevantExperiences = makeGetRelevantExperiences();
  const sampleTag = {
    name: 'C++',
    tag_id: 2,
    contact_id: 1,
    score: 2,
  };
  const mapStateToProps = (state, props) => {
    sampleTag.type = props.tagType;
    return {
      tags: [sampleTag],
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addTagItem: v => console.log('add', v),
    deleteTagItem: v => console.log('delete', v),
    updateTagItem: v => console.log('update', v),
    refreshTags: () => console.log('refresh'),
  };
};

const SkillContainer = connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(Skill);
export default SkillContainer;
