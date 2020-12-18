import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import QuestionAnswer from './faqComponents/QuestionAnswer';
import Logo from '../../../assets/images/logoSquare.png';
import {profileAndResume, applyingForARole, otherQuestions} from './faqComponents/FAQContent';
const FAQPage = ({classes}) => {
  return (
    <Paper className={classes.paper}>
      <div className={classes.headerContainer}>
        <img src={Logo} className={classes.logo} alt="Baltimore Corps Logo" />{' '}
        <Typography
          variant="h1"
          component="h1"
          className={classes.header}
          data-testid="page_header"
        >
          Frequently Asked Questions
        </Typography>
      </div>

      <div className={classes.sectionContainer}>
        <Typography
          variant="h2"
          component="h2"
          className={classes.sections}
          data-testid="faq_section_profile_and_resume"
        >
          Profile and Resume
        </Typography>
        {profileAndResume.map((each, index) => (
          <QuestionAnswer
            question={each.question}
            answer={each.answer}
            key={index}
            subContent={each.subContent}
          />
        ))}
      </div>

      <div className={classes.sectionContainer}>
        <Typography
          variant="h2"
          component="h2"
          className={classes.sections}
          data-testid="faq_section_applying_for_a_role"
        >
          Applying for a Role
        </Typography>
        {applyingForARole.map((each, index) => (
          <QuestionAnswer
            question={each.question}
            answer={each.answer}
            key={index}
            subContent={each.subContent}
          />
        ))}
      </div>
      <div className={classes.sectionContainer}>
        <Typography
          variant="h2"
          component="h2"
          className={classes.sections}
          data-testid="faq_section_others"
        >
          Others
        </Typography>
        {otherQuestions.map((each, index) => (
          <QuestionAnswer
            question={each.question}
            answer={each.answer}
            key={index}
            subContent={each.subContent}
          />
        ))}
      </div>
      <div className={classes.sectionContainer}>
        <Typography
          variant="h2"
          component="h2"
          className={classes.sections}
          data-testid="faq_section_more_questions"
        >
          Have more questions ?
        </Typography>
        <Typography variant="body1" component="p" className={classes.bodyText}>
          <a
            href="https://www.tfaforms.com/4602493"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
            data-testid="link_to_add_new_case"
          >
            Click here
          </a>{' '}
          to let us know if you have any questions or any technical issues.
        </Typography>
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
    fontSize: '22px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      fontSize: '30px',
    },
  },
  sectionContainer: {
    marginBottom: spacing(2.5),
  },
  sections: {
    fontSize: '20px',
    marginBottom: spacing(1.5),
    [breakpoints.up('sm')]: {
      fontSize: '28px',
    },
  },
  link: {
    color: palette.primary.link,
    textDecoration: 'underline',
  },
});

export default withStyles(styles)(FAQPage);
