import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import {
  Header,
  QuestionWithOneAnswer,
} from './QuestionAnswerDisplayTemplates.js';

import {blankProfile} from '../defaultData';

import get from 'lodash.get';

const ValueAlignmentDisplay = ({contact, onClickEdit, classes}) => {
  const profile = get(contact, 'profile', blankProfile);
  console.log('profile', profile);

  const {value_question1, value_question2} = profile;

  return (
    <React.Fragment>
      <Header header="Value Alignment" onClickEdit={onClickEdit} />

      <QuestionWithOneAnswer
        question="Why is racial equity work in Baltimore important to you? *"
        answer={value_question1}
      />
      <QuestionWithOneAnswer
        question="How has your background and experiences prepared you for today’s work in Baltimore’s social impact sector? *"
        answer={value_question2}
      />
    </React.Fragment>
  );
};

ValueAlignmentDisplay.propTypes = {
  contact: PropTypes.object,
  onClickEdit: PropTypes.func,
};

export default ValueAlignmentDisplay;
