import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WorkSharpIcon from '@material-ui/icons/WorkSharp';
import WorkOutlineSharpIcon from '@material-ui/icons/WorkOutlineSharp';
import CallSharpIcon from '@material-ui/icons/CallSharp';
import MessageSharpIcon from '@material-ui/icons/MessageSharp';
import TodaySharpIcon from '@material-ui/icons/TodaySharp';
import AssistantPhotoSharpIcon from '@material-ui/icons/AssistantPhotoSharp';

const ApplyOpportunitiesExpansion = ({classes}) => {
  const AboutMeSteps = [
    {content: 'Contact information (Address)', checked: true},
    {content: 'Value alignment', checked: false},
    {content: 'Programs and eligibility', checked: true},
    {content: 'Interests and goals', checked: false},
    {content: 'Demographic questions (optional)', checked: false},
  ];
  const ExperienceSteps = [
    {content: 'Add skills', checked: true},
    {content: 'Add all relevant experience', checked: false},
    {content: 'Add education, certificates, or training', checked: true},
    {content: 'Add portfolio or work products (optional)', checked: false},
  ];
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
          <WorkSharpIcon className={classes.stepIcon} /> Apply for opportunities
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className={classes.stepDetails}
        >
          Once you are approved for a particular program after your
          consultation, you will be able to apply for opportunities related to
          that program.
        </Typography>

        <Typography variant="body1" component="h4" className={classes.steps}>
          <CallSharpIcon className={classes.stepIcon} /> Schedule a consultation
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className={classes.stepDetails}
        >
          After you submit your profile, our staff will contact you to schedule
          a consultation to help you review and improve your profile, as well as
          recommend the programs and opportunities that best align with your
          current interests and goals.
        </Typography>

        <Typography variant="body1" component="h4" className={classes.steps}>
          <TodaySharpIcon className={classes.stepIcon} /> Employer reviews and
          schedule interviews with selected candidates
        </Typography>
        <Typography
          variant="body1"
          component="p"
          className={classes.stepDetails}
        >
          If you are selected, the employer or our staff will contact you via
          email within 14 business days after you submit the application to
          schedule interviews with the employer.
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
    fontSize: '28px',
  },
  expansionHeaderText: {
    fontWeight: '500',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
  },
  expansionDetails: {
    padding: '20px 30px',

    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    marginBottom: spacing(2),
    borderBottom: 'solid #e0e0e0 1px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  stepIcon: {
    marginRight: '6px',
  },
  steps: {
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
  },
  stepDetails: {
    textIndent: '29px',
    marginBottom: '10px',
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
