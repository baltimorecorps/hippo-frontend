import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';

import IconButton from '@material-ui/core/IconButton';

const FormHeaderTemplate = ({header, descriptions, onCloseForm, classes}) => {
  return (
    <React.Fragment>
      <div className={classes.headerContainer}>
        <Typography variant="h3" component="h3" className={classes.formHeader}>
          {header}
        </Typography>
        <Grid align="end">
          <IconButton
            edge="end"
            aria-label="cancel form"
            onMouseDown={onCloseForm}
            className={classes.iconButton}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </div>

      {descriptions.map((description, index) => (
        <Typography
          key={index}
          variant="body1"
          component="p"
          className={classes.sectionInfo}
        >
          {description}
        </Typography>
      ))}
    </React.Fragment>
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

// FormHeaderTemplate.propTypes = {
//   header: PropTypes.string,
//   onClickEdit: PropTypes.func,
// };
// QATemplate1.propTypes = {
//   question: PropTypes.string,
//   answer: PropTypes.string,
// };
// QATemplate2.propTypes = {
//   question: PropTypes.string,
//   answers: PropTypes.array,
// };
// QATemplate3.propTypes = {
//   question: PropTypes.string,
//   answers: PropTypes.array,
// };

const styles = ({breakpoints, palette, spacing}) => ({
  form: {
    padding: '17px 30px 30px 30px',
    backgroundColor: '#f7f7f7',
    marginBottom: spacing(2),
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  sectionInfo: {
    fontSize: '15px',
    textIndent: '25px',
    marginBottom: '15px',
    marginTop: '10px',
  },
  formControl: {
    width: '95%',
    marginTop: spacing(0),
  },
  resize: {
    fontSize: 16,
  },
  labelRoot: {
    fontSize: 17,
  },
  labelFocused: {
    fontSize: 19,
  },
  formHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  formHelperText: {
    color: palette.error.main,
    marginTop: '2px',
    width: '95%',
    marginBottom: spacing(1),
  },
  iconButton: {
    flexBasis: '60px',
    padding: spacing(0.5),
    '&:hover': {
      color: 'black',
    },
  },
  allRacesContainer: {
    display: 'flex',
    flexDirection: 'column',

    [breakpoints.up('lg')]: {
      flexDirection: 'row',
    },
  },
  raceGroupContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  dropdownContainer: {
    marginTop: '10px',
  },
  dropdownSelector: {
    textAlign: 'left',
    width: '90px',
  },

  race: {
    textAlign: 'left',
  },
  genderAndPronounsContainer: {
    marginTop: spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  inputLabel: {
    textAlign: 'left',
  },
  submitButton: {
    margin: '10px 20px 0px 0px',
  },
});

const QuestionWithOneAnswer = withStyles(styles)(QATemplate1);
const QuestionWithMultipleAnswersObject = withStyles(styles)(QATemplate2);
const QuestionWithMultipleAnswersArray = withStyles(styles)(QATemplate3);
const FormHeader = withStyles(styles)(FormHeaderTemplate);

export {
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswersObject,
  QuestionWithMultipleAnswersArray,
  FormHeader,
};
