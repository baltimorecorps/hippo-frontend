import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import CheckCircleOutlineSharpIcon from '@material-ui/icons/CheckCircleOutlineSharp';
import {createClickTracking} from 'lib/helperFunctions/helpers';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import GradeIcon from '@material-ui/icons/Grade';
import QuestionAnswer from './QuestionAnswer';
import Logo from './img/b_square.png';

const FAQPage = ({classes}) => {
  //   let history = useHistory();

  //   const toProfile = () => {
  //     history.push('/profile');
  //   };
  //   const toOpportunities = () => {
  //     history.push('/opportunities');
  //   };

  //   const onClickBackToProfile = () => {
  //     createClickTracking(
  //       'Confirmation Page after Submit Application',
  //       'Click Back to Profile',
  //       'Click Back to Profile'
  //     );
  //     toProfile();
  //   };
  //   const onClickViewMoreOpportunities = () => {
  //     createClickTracking(
  //       'Confirmation Page after Submit Application',
  //       'Click View More Opportunities',
  //       'Click View More Opportunities'
  //     );
  //     toOpportunities();
  //   };

  const questionsAnswers = [
    {
      question: 'Why do I need a profile?',

      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quisquam totam voluptas accusantium ullam quasi facere. Ea quo illo dolor!',
    },
    {
      question: 'Why do I need a profile?',

      answer:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio sint, aliquid cupiditate ratione corrupti corporis rem, autem tempora minima optio libero accusamus quaerat magni porro non assumenda tenetur exercitationem nemo?',
    },
    {
      question: 'Why do I need a profile?',

      answer:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio sint, aliquid cupiditate ratione corrupti corporis rem, autem tempora minima optio libero accusamus quaerat magni porro non assumenda tenetur exercitationem nemo?',
    },
  ];

  return (
    <Paper className={classes.paper}>
      <div className={classes.headerContainer}>
        <img src={Logo} className={classes.logo} alt="Baltimore Corps Logo" />{' '}
        <Typography variant="h1" component="h1" className={classes.header}>
          Frequently Asked Questions
        </Typography>
      </div>

      <div className={classes.sectionContainer}>
        <Typography variant="h2" component="h2" className={classes.sections}>
          Profile and Resume
        </Typography>
        {questionsAnswers.map(each => (
          <QuestionAnswer question={each.question} answer={each.answer} />
        ))}
      </div>
      <div className={classes.sectionContainer}>
        <Typography variant="h2" component="h2" className={classes.sections}>
          Applying for a Role
        </Typography>
        {questionsAnswers.map(each => (
          <QuestionAnswer question={each.question} answer={each.answer} />
        ))}
      </div>
    </Paper>
  );
};

FAQPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    flexGrow: 1,
    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
      padding: spacing(3, 6),
      margin: spacing(2, 0),
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '100%',
    height: '50%',
    padding: spacing(2, 3),
    margin: spacing(0),

    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: spacing(1, 0, 2, 0),
    [breakpoints.up('sm')]: {
      margin: spacing(2, 0, 3, 0),
    },
  },
  logo: {
    marginRight: '10px',
    height: '30px',
    width: '30px',
    [breakpoints.up('sm')]: {
      height: '45px',
      width: '45px',
    },
  },
  header: {
    textAlign: 'center',
    fontSize: '25px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      fontSize: '30px',
    },
  },
  sectionContainer: {
    marginBottom: spacing(2),
  },
  sections: {
    fontSize: '20px',
    marginBottom: spacing(1.5),
    fontWeight: 'bold',
    [breakpoints.up('sm')]: {
      fontSize: '25px',
    },
  },
  questionContainer: {
    marginBottom: spacing(1),
  },
  dotIcon: {
    fontSize: '12px',
    marginRight: '5px',
  },
  questions: {
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      fontSize: '18px',
    },
  },
  answers: {
    textIndent: '20px',
    textAlign: 'justify',
  },
});

export default withStyles(styles)(FAQPage);
