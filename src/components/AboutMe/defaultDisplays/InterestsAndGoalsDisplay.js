import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswers,
} from './QuestionAnswerDisplayTemplates.js';

import {roleLabels} from '../defaultData';

const InterestsAndGoalsDisplay = ({profile, onClickEdit, classes}) => {
  const {
    job_search_status,
    current_job_status,
    current_edu_status,
    years_exp,
    roles,
    previous_bcorps_program,
    programs_completed,
    hear_about_us,
    hear_about_us_other,
  } = profile;

  let roleOptions = [];
  Object.entries(roles).forEach(([roleKey, roleValue]) => {
    Object.entries(roleLabels).forEach(([labelKey, labelName]) => {
      if (roleKey === labelKey && roleValue === true)
        roleOptions.push(labelName);
    });
  });

  let hearAboutUs = '';
  if (hear_about_us !== 'Other' && hear_about_us_other.length > 0) {
    hearAboutUs = `${hear_about_us}: ${hear_about_us_other}`;
  } else if (hear_about_us !== 'Other') {
    hearAboutUs = hear_about_us;
  } else {
    hearAboutUs = hear_about_us_other;
  }

  return (
    <React.Fragment>
      <Header header="Interest and Goals" onClickEdit={onClickEdit} />
      <QuestionWithOneAnswer
        question="Job Search Status:"
        answer={job_search_status}
      />
      <QuestionWithOneAnswer
        question="Employment Status:"
        answer={current_job_status}
      />
      <QuestionWithOneAnswer
        question="Currently a student:"
        answer={current_edu_status}
      />
      <QuestionWithOneAnswer
        question="Years of experience:"
        answer={years_exp}
      />
      <QuestionWithMultipleAnswers
        question="Interested Types of Roles:"
        answers={roleOptions}
      />
      <QuestionWithOneAnswer
        question="Have participated with Baltimore Corps Before:"
        answer={previous_bcorps_program}
      />
      <QuestionWithOneAnswer
        question="How you find out about Baltimore Corps:"
        answer={hearAboutUs}
      />
    </React.Fragment>
  );
};

InterestsAndGoalsDisplay.propTypes = {
  profile: PropTypes.object,
  onClickEdit: PropTypes.func,
};

export default InterestsAndGoalsDisplay;
