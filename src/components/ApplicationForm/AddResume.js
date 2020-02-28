import React, {useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom';
import {
  createExternalLink,
  createClickTracking,
} from 'lib/helperFunctions/helpers';
import Grid from '@material-ui/core/Grid';
import {interestValidator} from 'lib/formHelpers/formValidator';
import FormHelperText from '@material-ui/core/FormHelperText';
import StickyFooter from './StickyFooter';
import {ResumeViewer} from 'components/ResumeCreator';

const InterestForm = ({
  classes,
  startText,
  back,
  next,
  opportunity,
  application,
  contactId,
  resume,
  setResume,
}) => {
  // const [text, setText] = useState(startText);

  // const [errors, setErrors] = useState({});

  // const handleNext = () => {
  //   // const {isError, err} = interestValidator(text);
  //   const isError = false;
  //   const err = {};

  //   if (isError) {
  //     setErrors(err);
  //   } else {
  //     next(resume);
  //   }
  // };

  const onClickNext = resume => {
    createClickTracking(
      'Submitting Application',
      'Click Next on Customizing Resume Step',
      'Click Next on Customizing Resume Step'
    );
    next(resume);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.spacer} />
        <div className={classes.center}>
          <Paper className={classes.paper}>
            <div className={classes.opportunityContent}>
              <div className={classes.headerContainer}>
                <Typography
                  variant="h5"
                  component="h1"
                  className={classes.header}
                >
                  Add Resume
                </Typography>
              </div>
              <div className={classes.titleContainer}>
                <Typography
                  variant="h6"
                  component="h2"
                  className={classes.title}
                >
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
          </Paper>
        </div>
      </div>
      <ResumeViewer
        hidePrint
        contactId={contactId}
        resume={resume}
        setResume={setResume}
      />
      <StickyFooter
        page="addResume"
        back={back}
        handleNext={() => onClickNext(resume)}
        application={application}
      />
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  spacer: {
    minWidth: '400px',
  },
  container: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing(2),
    marginBottom: spacing(3),
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },

  paper: {
    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('lg')]: {
      flexBasis: '100%',
      maxWidth: '100%',
    },
    width: '8.5in',
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
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginBottom: spacing(1),
    fontWeight: 'bold',
  },
  organization: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: palette.primary.midGray,
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
});

export default withStyles(styles)(InterestForm);