import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  QuestionWithMultipleAnswers,
} from './QuestionAnswerDisplayTemplates.js';

const ProgramsAndEligibilityDisplay = ({contact, onClickEdit}) => {
  const checkedPrograms = contact.program_apps
    .filter(program => program.is_interested === true)
    .map(program => program.program.name);

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
