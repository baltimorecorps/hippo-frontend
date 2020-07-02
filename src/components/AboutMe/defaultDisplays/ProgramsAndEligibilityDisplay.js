import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  QuestionWithMultipleAnswers,
} from './QuestionAnswerDisplayTemplates.js';

const ProgramsAndEligibilityDisplay = ({contact, onClickEdit}) => {
  const checkedPrograms = Object.values(contact.interested_programs).filter(
    program => program.checked === true
  );

  return (
    <React.Fragment>
      <Header header="Programs and Eligibility" onClickEdit={onClickEdit} />
      <QuestionWithMultipleAnswers
        question="Interested Programs:"
        answers={checkedPrograms}
      />
    </React.Fragment>
  );
};

ProgramsAndEligibilityDisplay.propTypes = {
  contact: PropTypes.object,
  onClickEdit: PropTypes.func,
};

export default ProgramsAndEligibilityDisplay;
