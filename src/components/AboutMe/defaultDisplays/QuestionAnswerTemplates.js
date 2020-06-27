import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const QATemplate1 = ({question, answer, classes}) => {
  return (
    <div className={classes.item}>
      <Typography variant="body1" component="p" className={classes.question}>
        {question}
      </Typography>

      <Typography variant="body1" component="p" className={classes.answer}>
        - {answer}
      </Typography>
    </div>
  );
};

const QATemplate2 = ({question, answers, classes}) => {
  return (
    <div className={classes.item}>
      <Typography variant="body1" component="p" className={classes.question}>
        {question}
      </Typography>

      {answers.map((answer, index) => (
        <Typography
          key={index}
          variant="body1"
          component="p"
          className={classes.answer}
        >
          - {answer.label}
        </Typography>
      ))}
    </div>
  );
};
const QATemplate3 = ({question, answers, classes}) => {
  return (
    <div className={classes.item}>
      <Typography variant="body1" component="p" className={classes.question}>
        {question}
      </Typography>

      {answers.map((answer, index) => (
        <Typography
          key={index}
          variant="body1"
          component="p"
          className={classes.answer}
        >
          - {answer[1]}
        </Typography>
      ))}
    </div>
  );
};

QATemplate1.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
};
QATemplate2.propTypes = {
  question: PropTypes.string,
  answers: PropTypes.array,
};
QATemplate3.propTypes = {
  question: PropTypes.string,
  answers: PropTypes.array,
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

// export default withStyles(styles)(QuestionAnswerTemplates);

const QuestionWithOneAnswer = withStyles(styles)(QATemplate1);
const QuestionWithMultipleAnswersObject = withStyles(styles)(QATemplate2);
const QuestionWithMultipleAnswersArray = withStyles(styles)(QATemplate3);

export {
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswersObject,
  QuestionWithMultipleAnswersArray,
};
