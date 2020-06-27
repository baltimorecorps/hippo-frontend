import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswersArray,
} from './QuestionAnswerDisplayTemplates.js';

const DemographicDisplay = ({contact, onClickEdit, classes}) => {
  const checkedRace = Object.values(contact.race).filter(
    race => race[0] === true
  );

  return (
    <React.Fragment>
      <Header header="Demographic Information" onClickEdit={onClickEdit} />
      <QuestionWithMultipleAnswersArray
        question="Race:"
        answers={checkedRace}
      />
      <QuestionWithOneAnswer question="Gender:" answer={contact.gender} />
      <QuestionWithOneAnswer question="Pronoun:" answer={contact.pronoun} />
    </React.Fragment>
  );
};

DemographicDisplay.propTypes = {
  contact: PropTypes.object,
  onClickEdit: PropTypes.func,
};

export default DemographicDisplay;
