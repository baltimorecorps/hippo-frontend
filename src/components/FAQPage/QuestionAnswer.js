import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import GradeIcon from '@material-ui/icons/Grade';

const QuestionAnswer = ({classes, question, answer}) => {
  return (
    <div className={classes.questionContainer}>
      <Typography variant="body1" component="h3" className={classes.questions}>
        <GradeIcon className={classes.dotIcon} /> {question}
      </Typography>
      <Typography variant="body1" component="h3" className={classes.answers}>
        {answer}
      </Typography>
    </div>
  );
};

QuestionAnswer.propTypes = {
  classes: PropTypes.object.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  questionContainer: {
    marginBottom: spacing(1),
  },
  dotIcon: {
    fontSize: '12px',
    marginRight: '5px',
  },
  questions: {
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
  },
  answers: {
    textIndent: '20px',
    textAlign: 'justify',
  },
});

export default withStyles(styles)(QuestionAnswer);
