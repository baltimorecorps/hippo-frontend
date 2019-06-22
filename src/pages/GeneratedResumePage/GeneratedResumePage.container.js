import React from 'react';
import GeneratedResumePage from './GeneratedResumePage';
import resumeInfo from './resumeInfo';

import { connect } from 'react-redux';
import { createSelector } from 'redux-starter-kit';

import {
  refreshResume,
} from 'actions/resume';

const makeMapStateToProps = () => {
  const { achievements, contactInfo, experiences, skillGroups } = resumeInfo;
  const mapStateToProps = ({resume}, ownProps) => {
    if (! Object.keys(resume).length) {
      return {
        achievements,
        contactInfo: {
          name: '',
          roles: [],
          title: '',
          email: '',
          phoneNumber: '',
          city: '',
          state: '',
        },
        experiences,
        skillGroups,
      };
    }
    console.log('mSTP', resume, ownProps);
    return ({
      achievements,
      contactInfo: resume.contactInfo,
      experiences,
      skillGroups,
    });
  }
  // ({
  //   achievements,
  //   contactInfo,
  //   experiences,
  //   skillGroups,
  // });
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    refreshResume: (resumeId) => refreshResume(resumeId)(dispatch),
  };
};

const Container = connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(GeneratedResumePage);

export default Container;
