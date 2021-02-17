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
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';


const ApplyOpportunitiesExpansion = ({isExpanded, classes,status}) => {
  let history = useHistory();

  const applyForRoles = () => {
    history.push(`/opportunities/`);
  };
  return (
    <ExpansionPanel
      defaultExpanded={isExpanded}
      className={classes.expansionPanel}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.expansionHeader}
        data-testid="apply-opportunities-header"
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
          As a member of Place for Purpose, you will be given a free
          job consultation with our Talent Consultant. This is an invaluable
          opportunity for our team to learn more about your interest and
          experiences to provide targeted job and program recommendations and
          expert advice on strengthening your profile. Consultations are
          mandatory for all members of Place for Purpose. It is advised that you
          schedule your consultation ASAP, however, you will be able to apply to
          jobs in the portal prior to the consultation as long as you view the
          required Place for Purpose “How to Apply” Video.
        </Typography>
        <Button
            variant="contained"
            href={"https://calendly.com/bc-partnership2/candidate-consultation-place-for-purpose"}
            target="_blank"
            className={classes.submitButton2}
          >
            Schedule your Consultation
          </Button>

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
        <div className={classes.videoWrapper}>
        <iframe className={classes.video} src="https://www.youtube.com/embed/Fh5A5ksXk5Y" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
       

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
        {status === 'approved' ? (
          <Button
            variant="contained"
            onClick={applyForRoles}
            className={classes.submitButton2}
            data-testid="apply-roles-button-2"
          >
            Start applying for roles
          </Button>) : ("") }

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
  videoWrapper:{
    position: 'relative',
    paddingBottom: '56.25%', /* 16:9 */
    height: '0',
    marginBottom:'17px'

  },
  video: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%'
  },
  submitButton2: {
    marginTop: '8px',
    marginBottom:'17px',
    fontSize: '16px',
    alignSelf: 'center',
    padding: '7px 20px',
    backgroundColor: '#2858eb',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#1846d9',
    },}
});

export default withStyles(styles)(ApplyOpportunitiesExpansion);
