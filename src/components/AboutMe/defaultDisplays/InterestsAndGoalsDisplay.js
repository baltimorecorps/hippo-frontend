import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswers,
} from './QuestionAnswerDisplayTemplates.js';

import {roleLabels} from '../defaultData';

const InterestsAndGoalsDisplay = ({profile, onClickEdit, classes}) => {
  let checkedRoles = [];
  for (const [key, value] of Object.entries(profile.roles)) {
    if (value === true) checkedRoles.push(key);
  }

  let roles = [];
  for (const [key, value] of Object.entries(roleLabels)) {
    if (checkedRoles.includes(key)) roles.push(value);
  }
  return (
    <React.Fragment>
      <Header header="Interest and Goals" onClickEdit={onClickEdit} />
      <QuestionWithOneAnswer
        question="Job Search Status:"
        answer={profile.job_search_status}
      />
      <QuestionWithOneAnswer
        question="Employment Status:"
        answer={profile.current_job_status}
      />
      <QuestionWithOneAnswer
        question="Currently a student:"
        answer={profile.current_edu_status}
      />
      <QuestionWithOneAnswer
        question="Years of experience:"
        answer={profile.years_exp}
      />
      <QuestionWithMultipleAnswers
        question="Interested Types of Roles:"
        answers={roles}
      />
      <QuestionWithOneAnswer
        question="Have participated with Baltimore Corps Before:"
        answer={profile.previous_bcorps_program}
      />
    </React.Fragment>
  );
};

InterestsAndGoalsDisplay.propTypes = {
  profile: PropTypes.object,
  onClickEdit: PropTypes.func,
};

export default InterestsAndGoalsDisplay;
