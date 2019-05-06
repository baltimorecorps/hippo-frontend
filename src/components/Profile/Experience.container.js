import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'redux-starter-kit';
import Experience from './Experience';

import {
  addExperience,
  refreshExperiences,
  updateExperience,
} from '../../actions/profile';

const getExperiences = createSelector(
  ['experiences'],
  experiences => Object.keys(experiences).map(id => experiences[id]),
);

const getContact = (state, props) => props.contactId;
const getTypeFilter = (state, props) => props.experienceType;

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
  const mapStateToProps = (state, ownProps) => ({
    experiences: getRelevantExperiences(state, ownProps),
  });
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNewExperience: experience =>
      addExperience(ownProps.contactId, experience)(dispatch),
    updateExperience: experience => updateExperience(experience)(dispatch),
    refreshExperiences: () => refreshExperiences(ownProps.contactId)(dispatch),
  };
};

const Container = connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(Experience);

export default Container;
