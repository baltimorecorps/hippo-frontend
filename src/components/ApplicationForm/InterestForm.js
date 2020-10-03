import React, {useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  createExternalLink,
  createClickTracking,
} from 'lib/helperFunctions/helpers';
import Grid from '@material-ui/core/Grid';
import {interestValidator} from 'lib/formHelpers/formValidator';
import FormHelperText from '@material-ui/core/FormHelperText';
import StickyFooter from './StickyFooter';

const InterestForm = ({
  classes,
  startText,
  back,
  next,
  opportunity,
  application,
}) => {
  const [text, setText] = useState(startText);
  const [errors, setErrors] = useState({});

  const handleNext = text => {
    const {isError, err} = interestValidator(text);

    if (isError) {
      setErrors(err);
    } else {
      next(text);
    }
  };

  const onClickNext = text => {
    createClickTracking(
      'Submitting Application',
      'Click Next on Interest Statement Form',
      'Click Next on Interest Statement Form'
    );
    handleNext(text);
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.opportunityContent}>
          <div className={classes.headerContainer}>
            <Typography variant="h5" component="h1" className={classes.header}>
              Interest Statement
            </Typography>
          </div>
          <div className={classes.titleContainer}>
            <Typography variant="h6" component="h2" className={classes.title}>
              {opportunity.title}
            </Typography>
            <Typography
              variant="h5"
              component="h1"
              className={classes.organization}
            >
              {opportunity.org_name || ''}
            </Typography>
          </div>
          <div className={classes.opportunityDescription}>
            <Typography className={classes.description}>
              {opportunity.short_description}
              <br />
            </Typography>
            <Typography className={classes.link}>
              {createExternalLink(
                'View full description',
                opportunity.gdoc_link,
                classes.link
              )}
            </Typography>
          </div>
        </div>
        <div>
          <Typography
            variant="h6"
            component="h1"
            className={classes.interestHeader}
          >
            Tell us why you're interested
          </Typography>
        </div>
        <div className={classes.interestHelptext}>
          <Typography variant="body2" component="p">
            Let employers know why you are excited about this opportunity and
            how your skills and experiences are a good fit.
          </Typography>
        </div>
        {application.status === 'submitted' ? (
          <Typography className={classes.interestStatement}>
            {application.interest_statement}
          </Typography>
        ) : (
          <Grid container justify="center" align="center" direction="column">
            <TextField
              variant="outlined"
              value={text}
              onChange={ev => {
                setText(ev.target.value);
              }}
              multiline
              rows={10}
              className={classes.interest}
            />
            <FormHelperText className={classes.formHelperText}>
              {errors.interestText_error || null}
            </FormHelperText>
          </Grid>
        )}
      </Paper>
      <StickyFooter
        page="interest"
        back={back}
        handleNext={() => onClickNext(text)}
        application={application}
      />
    </div>
  );
};

InterestForm.propTypes = {
  startText: PropTypes.string.isRequired,
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  opportunity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    program_id: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    short_description: PropTypes.string.isRequired,
    gdoc_link: PropTypes.string.isRequired,
    org_name: PropTypes.string.isRequired,
  }),
  application: PropTypes.shape({
    interview_date: PropTypes.string,
    interview_time: PropTypes.string,
    resume: PropTypes.object,
    status: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    interview_completed: PropTypes.bool.isRequired,
    interest_statement: PropTypes.string,
    contact: PropTypes.shape({
      email: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }).isRequired,
    is_active: PropTypes.bool.isRequired,
    opportunity: PropTypes.shape({
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      program_id: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      short_description: PropTypes.string.isRequired,
      gdoc_link: PropTypes.string.isRequired,
      org_name: PropTypes.string.isRequired,
    }),
  }),
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: spacing(2),
    marginBottom: spacing(3),
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paper: {
    flexGrow: 1,
    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('lg')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '100%',
    maxWidth: '1000px',

    padding: spacing(2, 3, 3),
    marginBottom: spacing(2),
  },
  headerContainer: {
    paddingBottom: spacing(2),
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
  },
  header: {
    fontWeight: 700,
    textAlign: 'center',
  },
  title: {
    marginBottom: spacing(1),
    fontWeight: 'bold',
  },
  interest: {
    width: '100%',
  },
  interestHeader: {
    fontWeight: '700',
  },
  interestHelptext: {
    marginBottom: spacing(1),
    color: palette.primary.midGray,
    fontSize: '15px',
    fontWeight: 'normal',
  },
  link: {
    color: palette.primary.link,
    marginTop: spacing(1),
  },
  description: {
    textAlign: 'justify',
    textIndent: '25px',
  },
  opportunityContent: {
    marginBottom: spacing(2),
  },
  formHelperText: {
    color: palette.error.main,
    marginTop: '2px',
    marginBottom: '4px',
  },
  interestStatement: {
    textIndent: '25px',
    textAlign: 'justify',
    border: `${palette.primary.midGray} 1px solid`,
    padding: '10px',
  },
  organization: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: palette.primary.midGray,
  },
});

export default withStyles(styles)(InterestForm);
