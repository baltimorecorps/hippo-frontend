import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  QuestionWithMultipleAnswers,
} from './QuestionAnswerDisplayTemplates.js';
import get from 'lodash.get';

const ProgramsAndEligibilityDisplay = ({contact, onClickEdit}) => {
  const needs_help_programs = get(
    contact,
    'profile.needs_help_programs',
    false
  );

  const checkedPrograms = contact.program_apps
    .filter(program => program.is_interested === true)
    .map(program => program.program.name);

  if (needs_help_programs === true)
    checkedPrograms.push("I'd like some help figuring this out");

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
