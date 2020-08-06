import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WorkSharpIcon from '@material-ui/icons/WorkSharp';
import CallSharpIcon from '@material-ui/icons/CallSharp';
import TodaySharpIcon from '@material-ui/icons/TodaySharp';
import AssistantPhotoSharpIcon from '@material-ui/icons/AssistantPhotoSharp';
import YouTubeIcon from '@material-ui/icons/YouTube';

const ApplyOpportunitiesExpansion = ({classes}) => {
  return (
    <ExpansionPanel defaultExpanded={false} className={classes.expansionPanel}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.expansionHeader}
      >
        <Typography className={classes.expansionHeaderText}>
          <AssistantPhotoSharpIcon className={classes.headerIcon} /> Apply for
          Opportunities
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionDetails}>
        <Typography variant="body1" component="h4" className={classes.steps}>
          <CallSharpIcon className={classes.stepIcon} /> Consultation
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className={classes.stepDetails}
        >
          As a member of Place for Purpose, you will be given a free-15-minute
          job consultation with our Talent Consultant. This is an invaluable
          opportunity for our team to learn more about your interest and
          experiences to provide targeted job and program recommendations and
          expert advice on strengthening your profile. Consultations are
          mandatory for all members of Place for Purpose. It is advised that you
          schedule your consultation ASAP, however, you will be able to apply to
          jobs in the portal prior to the consultation as long as you view the
          required Place for Purpose “How to Apply” Video.
        </Typography>
        <Typography variant="body1" component="h4" className={classes.steps}>
          <YouTubeIcon className={classes.stepIcon} />
          Place for Purpose “How to Apply” Video
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className={classes.stepDetails}
        >
          This is a short video that provides you with tips and tricks on how to
          apply to jobs in Place for Purpose starting with creating your
          profile, which functions as the majority of your job applications in
          the portal. All members of Place for Purpose will need to watch this
          video before applying.
        </Typography>

        <Typography variant="body1" component="h4" className={classes.steps}>
          <WorkSharpIcon className={classes.stepIcon} /> Apply for Opportunities
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className={classes.stepDetails}
        >
          After you have scheduled your consultation and completed the tutorial
          video, you will be able to apply for jobs and opportunities. Do not
          forget that your profile functions as 90% of your application, so make
          sure you have added all experience and skills to make your application
          competitive.
        </Typography>

        <Typography variant="body1" component="h4" className={classes.steps}>
          <TodaySharpIcon className={classes.stepIcon} /> Employer Schedule an
          Interview
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className={classes.stepDetails}
        >
          When you submit your interest in an opportunity, your skills and
          experiences will be reviewed and qualified candidates will be shared
          with employers. This will happen on a rolling basis. Employers will
          contact candidates directly to schedule an interview.
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  instructions: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(2, 3, 3),
    paddingBottom: spacing(3),
    marginTop: spacing(5),
    [breakpoints.down('sm')]: {
      margin: spacing(0.2),
      width: '100%',
    },
  },
  expansionPanel: {
    backgroundColor: '#f5f5f5',
  },
  expansionHeader: {
    backgroundColor: '#f5f5f5',
  },
  headerIcon: {
    marginRight: '10px',
    fontSize: '24px',
    [breakpoints.up('sm')]: {
      fontSize: '28px',
    },
  },
  expansionHeaderText: {
    fontWeight: '500',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      fontSize: '18px',
    },
  },
  expansionDetails: {
    padding: '15px 25px 15px 25px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    [breakpoints.up('sm')]: {
      padding: '30px 45px 20px 45px',
    },
  },
  headerContainer: {
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  stepIcon: {
    marginRight: '12px',
  },
  steps: {
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  stepDetails: {
    textAlign: 'justify',
    textIndent: '29px',
    marginBottom: '17px',
  },

  checkboxesContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '10px',
  },
  checkbox: {
    width: '100%',
    textAlign: 'left',
    fontSize: '15px',

    [breakpoints.up('sm')]: {
      fontSize: '16px',
    },
    [breakpoints.up('md')]: {
      marginLeft: '20px',
    },
  },
  list: {
    marginLeft: '60px',
    marginBottom: '5px',
  },
  listSymbol: {marginRight: '5px', fontSize: '18px'},
  submitButton: {
    alignSelf: 'center',
  },
});

export default withStyles(styles)(ApplyOpportunitiesExpansion);
