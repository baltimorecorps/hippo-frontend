import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const QuestionAnswer = ({classes, question, answer, subContent}) => {
  return (
    <ExpansionPanel className={classes.container}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.questionContainer}
      >
        <Typography className={classes.questions}>
          <span style={{marginRight: '10px'}}>❖</span> {question}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.answerContainer}>
        <Typography className={classes.answer}>{answer}</Typography>

        {subContent &&
          subContent.map(content => (
            <div>
              <Typography className={classes.subHeader}>
                {content.header}
              </Typography>
              {content.content.map(content => (
                <Typography className={classes.subContent}>
                  {content}
                </Typography>
              ))}
            </div>
          ))}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

QuestionAnswer.propTypes = {
  classes: PropTypes.object.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    marginBottom: spacing(2),
  },
  questionContainer: {
    backgroundColor: '#f5f5f5',
  },
  dotIcon: {
    fontSize: '12px',
    marginRight: '5px',
    verticalAlign: 'middle',
  },
  questions: {
    fontSize: '16px',
    display: 'flex',
    [breakpoints.up('sm')]: {
      fontSize: '18px',
    },
  },
  answerContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 20px',
    [breakpoints.up('sm')]: {
      padding: '15px 30px',
    },
  },
  answer: {
    textIndent: '19px',
    textAlign: 'justify',
    fontSize: '15px',

    [breakpoints.up('sm')]: {
      fontSize: '16px',
    },
  },
  boldAnswer: {
    textAlign: 'justify',
    fontWeight: 'bold',
    marginBottom: spacing(1),
  },
  subHeader: {
    fontWeight: 'bold',
    fontSize: '15px',
    [breakpoints.up('sm')]: {
      fontSize: '16px',
    },
  },

  subContent: {
    textIndent: '10px',
    textAlign: 'justify',

    fontSize: '15px',
    marginLeft: spacing(1),
    marginBottom: spacing(1),
    [breakpoints.up('sm')]: {
      fontSize: '16px',
      textIndent: '19px',
    },
  },
});

export default withStyles(styles)(QuestionAnswer);
