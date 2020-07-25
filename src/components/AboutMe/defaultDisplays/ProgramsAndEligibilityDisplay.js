import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  QuestionWithMultipleAnswers,
  QuestionWithOneAnswer,
} from './QuestionAnswerDisplayTemplates.js';

const ProgramsAndEligibilityDisplay = ({contact, onClickEdit}) => {
  const checkedPrograms = contact.program_apps
    .filter(program => program.is_interested === true)
    .map(program => program.program.name);

  if (
    contact.profile.needs_help_programs === true &&
    checkedPrograms.length > 0
  )
    checkedPrograms.push("I'd like some help figuring this out");

  return (
    <React.Fragment>
      <Header header="Programs and Eligibility" onClickEdit={onClickEdit} />

      {contact.profile.needs_help_programs === true &&
      checkedPrograms.length === 0 ? (
        <QuestionWithOneAnswer
          question="Interested Programs:"
          answer="I'd like some help figuring this out"
        />
      ) : (
        <QuestionWithMultipleAnswers
          question="Interested Programs:"
          answers={checkedPrograms}
        />
      )}
    </React.Fragment>
  );
};

ProgramsAndEligibilityDisplay.propTypes = {
  contact: PropTypes.object,
  onClickEdit: PropTypes.func,
};

export default ProgramsAndEligibilityDisplay;
