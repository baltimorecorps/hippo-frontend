import React from 'react';
import PropTypes from 'prop-types';
import {getListOfAnswers} from '../../../lib/helperFunctions/helpers';
import {
  Header,
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswers,
} from './QuestionAnswerDisplayTemplates.js';
import {
  roleLabels,
  programsCompletedLabels,
  blankProfile,
} from '../defaultData';
import get from 'lodash.get';

const InterestsAndGoalsDisplay = ({contact, onClickEdit, classes}) => {
  const profile = get(contact, 'profile', blankProfile);

  const {
    job_search_status,
    current_job_status,
    current_edu_status,
    years_exp,
    roles,
    previous_bcorps_program,
    programs_completed,
  } = profile;

  let roleAnswer = roles && getListOfAnswers(roles, roleLabels);
  let programsCompletedAnswer =
    programs_completed &&
    getListOfAnswers(programs_completed, programsCompletedLabels);

  return (
    <React.Fragment>
      <Header header="Interest and Goals" onClickEdit={onClickEdit} />
      <QuestionWithOneAnswer
        question="Employment Status:"
        answer={current_job_status}
      />
      <QuestionWithOneAnswer
        question="Currently a student:"
        answer={current_edu_status}
      />
      <QuestionWithOneAnswer
        question="Job Search Status:"
        answer={job_search_status}
      />
      <QuestionWithOneAnswer
        question="Years of experience:"
        answer={years_exp}
      />
      <QuestionWithMultipleAnswers
        question="Interested Types of Roles:"
        answers={roleAnswer}
      />

      <QuestionWithOneAnswer
        question="Have participated with Baltimore Corps Before:"
        answer={previous_bcorps_program}
      />
      {previous_bcorps_program === 'Yes' && (
        <QuestionWithMultipleAnswers
          question="Program(s) I've completed:"
          answers={programsCompletedAnswer}
        />
      )}
    </React.Fragment>
  );
};

InterestsAndGoalsDisplay.propTypes = {
  contact: PropTypes.object,
  onClickEdit: PropTypes.func,
};

export default InterestsAndGoalsDisplay;
