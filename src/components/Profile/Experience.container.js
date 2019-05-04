import React from 'react';
import {connect} from 'react-redux';
import Experience from './Experience';
import {addExperience} from '../../actions/profile';

const addNewExperience = (dispatch, experience) =>
  async function(experience) {
    await addExperience(contactId, experience)(dispatch);
  };

const mapStateToProps = state => ({
  experiences: state.experiences,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addNewExperience: addNewExperience(dispatch, ownProps.contactId),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Experience);

export default Container;

