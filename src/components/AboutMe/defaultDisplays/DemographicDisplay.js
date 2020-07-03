import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswersArray,
} from './QuestionAnswerDisplayTemplates.js';

import {raceLabels} from '../defaultData';

const DemographicDisplay = ({profile, onClickEdit, classes}) => {
  // const checkedRace = Object.values(profile.race).filter(
  //   race => race[0] === true
  // );

  let checkedRace = [];
  for (const [key, value] of Object.entries(profile.race)) {
    if (value === true) checkedRace.push(key);
  }

  let race = [];
  for (const [key, value] of Object.entries(raceLabels)) {
    if (checkedRace.includes(key)) race.push(value);
  }

  return (
    <React.Fragment>
      <Header header="Demographic Information" onClickEdit={onClickEdit} />
      <QuestionWithMultipleAnswersArray question="Race:" answers={race} />
      <QuestionWithOneAnswer question="Gender:" answer={profile.gender} />
      <QuestionWithOneAnswer question="Pronoun:" answer={profile.pronoun} />
    </React.Fragment>
  );
};

DemographicDisplay.propTypes = {
  contact: PropTypes.object,
  onClickEdit: PropTypes.func,
};

export default DemographicDisplay;
