import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  QuestionWithOneAnswer,
} from './QuestionAnswerDisplayTemplates.js';

const ValueAlignmentDisplay = ({
  contact,
  onClickEdit,
  isSubmitted,
  classes,
}) => {
  if (!contact.profile) {
    return <div>Loading...</div>;
  }
  const {value_question1, value_question2} = contact.profile;

  return (
    <React.Fragment>
      <Header
        header="Value Alignment"
        isSubmitted={isSubmitted}
        onClickEdit={onClickEdit}
      />

      <QuestionWithOneAnswer
        question="Why is racial equity work in Baltimore important to you? *"
        answer={value_question1 || ''}
      />
      <QuestionWithOneAnswer
        question="How has your background and experiences prepared you for today’s work in Baltimore’s social impact sector? *"
        answer={value_question2 || ''}
      />
    </React.Fragment>
  );
};

ValueAlignmentDisplay.propTypes = {
  contact: PropTypes.object,
  onClickEdit: PropTypes.func,
};

export default ValueAlignmentDisplay;
