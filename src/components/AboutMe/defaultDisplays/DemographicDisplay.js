import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswersArray,
} from './QuestionAnswerDisplayTemplates.js';

import {raceLabels} from '../defaultData';

const DemographicDisplay = ({profile, onClickEdit, classes}) => {
  let checkedRace = [];
  for (const [key, value] of Object.entries(profile.race)) {
    if (value === true) checkedRace.push(key);
  }

  let race = [];
  for (const [key, value] of Object.entries(raceLabels)) {
    if (checkedRace.includes(key)) race.push(value);
  }

  let gender = profile.gender;
  let pronoun = profile.pronoun;
  if (profile.gender === 'Not Listed') gender = profile.gender_other;
  if (profile.pronoun === 'Not Listed') pronoun = profile.pronoun_other;

  return (
    <React.Fragment>
      <Header header="Demographic Information" onClickEdit={onClickEdit} />
      <QuestionWithMultipleAnswersArray question="Race:" answers={race} />
      <QuestionWithOneAnswer question="Gender:" answer={gender} />
      <QuestionWithOneAnswer question="Pronoun:" answer={pronoun} />
    </React.Fragment>
  );
};

DemographicDisplay.propTypes = {
  contact: PropTypes.object,
  onClickEdit: PropTypes.func,
};

export default DemographicDisplay;
