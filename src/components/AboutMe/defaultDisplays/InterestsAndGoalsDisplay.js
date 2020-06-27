import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswersObject,
} from './QuestionAnswerDisplayTemplates.js';

const InterestsAndGoalsDisplay = ({contact, onClickEdit, classes}) => {
  const checkedRoles = Object.values(contact.interested_roles).filter(
    role => role.checked === true
  );

  return (
    <React.Fragment>
      <Header header="Interest and Goals" onClickEdit={onClickEdit} />
      <QuestionWithOneAnswer
        question="Job Search Status:"
        answer={contact.job_search_status}
      />
      <QuestionWithOneAnswer
        question="Years of experience:"
        answer={contact.years_exp}
      />
      <QuestionWithMultipleAnswersObject
        question="Interested Types of Roles:"
        answers={checkedRoles}
      />
      <QuestionWithOneAnswer
        question="Have participated with Baltimore Corps Before:"
        answer={contact.participated_baltimore_corps_before}
      />
    </React.Fragment>
  );
};

InterestsAndGoalsDisplay.propTypes = {
  contact: PropTypes.object,
  onClickEdit: PropTypes.func,
};

export default InterestsAndGoalsDisplay;
