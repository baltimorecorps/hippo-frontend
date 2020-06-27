import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import {
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswersObject,
} from './QuestionAnswerTemplates.js';

const InterestsAndGoalsDisplay = ({contact, onClickEdit, classes}) => {
  const checkedRoles = Object.values(contact.interested_roles).filter(
    role => role.checked === true
  );

  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.justifyBetween}>
        <Typography variant="h6" component="h3" className={classes.header}>
          Interest and Goals
        </Typography>
        <IconButton
          onClick={onClickEdit}
          size="small"
          aria-label="edit experience"
        >
          <EditIcon className={classes.editIcon} />
        </IconButton>
      </Grid>

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

const styles = ({breakpoints, palette, spacing}) => ({
  justifyBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  editIcon: {
    flexBasis: '60px',
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
  header: {
    fontWeight: '600',
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  question: {
    marginRight: '5px',
    fontWeight: 'bold',
    margin: 0,
  },
  answer: {
    margin: 0,
    textIndent: '10px',
  },
});

export default withStyles(styles)(InterestsAndGoalsDisplay);
