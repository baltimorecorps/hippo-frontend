import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const HeaderTemplate = ({header, onClickEdit, classes}) => {
  return (
    <Grid item xs={12} className={classes.justifyBetween}>
      <Typography variant="h6" component="h3" className={classes.header}>
        {header}
      </Typography>
      <IconButton
        onClick={onClickEdit}
        size="small"
        aria-label="edit experience"
      >
        <EditIcon className={classes.editIcon} />
      </IconButton>
    </Grid>
  );
};

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

HeaderTemplate.propTypes = {
  header: PropTypes.string,
  onClickEdit: PropTypes.func,
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
const Header = withStyles(styles)(HeaderTemplate);

export {
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswersObject,
  QuestionWithMultipleAnswersArray,
  Header,
};
