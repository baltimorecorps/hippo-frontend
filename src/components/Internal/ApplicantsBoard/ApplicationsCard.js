import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ApplicationStateAccordion from '../OpportunitiesBoard/ApplicationStateAccordion';
import PartnershipsNavBar from '../PartnershipsPage/PartnershipsNavBar';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

const ApplicationsCard = ({
  classes,
  contactId,
  applications,
  applicant,
  getContactApplications,
  getContact,
}) => {
  useEffect(() => {
    getContactApplications(contactId);
  }, [getContactApplications, contactId]);
  useEffect(() => {
    getContact(contactId);
  }, [getContact, contactId]);

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  let history = useHistory();

  const toProfile = contactId => {
    history.push(`/profile/${contactId}`);
  };
  const backToApplicantsBoard = contactId => {
    history.push(`/internal/applicants-board`);
  };

  let submittedApps = [];
  let recommendedApps = [];
  let interviewingApps = [];
  let notAFitApps = [];
  let consideredApps = [];

  if (applications && applications.length > 0) {
    submittedApps = applications.filter(
      app => app.status === 'submitted' && app.is_active === true
    );
    recommendedApps = applications.filter(
      app => app.status === 'recommended' && app.is_active === true
    );
    interviewingApps = applications.filter(
      app => app.status === 'interviewed' && app.is_active === true
    );
    notAFitApps = applications.filter(app => app.is_active === false);
    consideredApps = applications.filter(
      app => app.status === 'considered_for_role' && app.is_active === true
    );
  }
  if (!applications || !applicant) {
    return <div>loading...</div>;
  }
  return (
    <div className={classes.container}>
      <PartnershipsNavBar />
      <Paper className={classes.paper}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          className={classes.header}
        >
          Applicant's Overview
        </Typography>
      </Paper>
      <Grid className={classes.buttonContainer}>
        <Button
          onClick={() => backToApplicantsBoard()}
          variant="contained"
          color="primary"
          className={classes.backButton}
        >
          Back to Applicants Board
        </Button>
      </Grid>
      <Paper className={classes.paper}>
        <div className={classes.headerContainer}>
          <div className={classes.titleAndOrgContainer}>
            <Typography variant="h6" component="h1" className={classes.title}>
              {`${(applicant && applicant.first_name) || null} ${applicant &&
                applicant.last_name}`}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className={classes.organization}
            >
              {(applicant && applicant.email) ||
                (applicant && applicant.email_primary.email)}
            </Typography>
          </div>

          <Link
            onClick={() => toProfile(applicant.id)}
            className={classes.link}
          >
            <Typography variant="body1" component="h1">
              See Profile
            </Typography>
          </Link>
        </div>

        <ApplicationStateAccordion
          header="Submitted"
          applications={submittedApps}
          totalApps={submittedApps.length}
          iconName="submitted"
          expanded={expanded}
          handleChange={handleChange}
          panelName="Submitted"
          contactId={contactId}
          page="internal-applications-board"
        />

        <ApplicationStateAccordion
          header="Recommended"
          applications={recommendedApps}
          iconName="recommended"
          expanded={expanded}
          handleChange={handleChange}
          panelName="Recommended"
          contactId={contactId}
          page="internal-applications-board"
        />

        <ApplicationStateAccordion
          header="Interviewing"
          applications={interviewingApps}
          iconName="interviewing"
          expanded={expanded}
          handleChange={handleChange}
          panelName="Interviewing"
          contactId={contactId}
          page="internal-applications-board"
        />
        <ApplicationStateAccordion
          header="Considered for Role"
          applications={consideredApps}
          iconName="consideredForRole"
          expanded={expanded}
          handleChange={handleChange}
          panelName="consideredForRole"
          contactId={contactId}
          page="internal-applications-board"
        />
        <ApplicationStateAccordion
          header="Not a Fit"
          applications={notAFitApps}
          iconName="notAFit"
          expanded={expanded}
          handleChange={handleChange}
          panelName="notAFit"
          contactId={contactId}
          page="internal-applications-board"
        />
      </Paper>
    </div>
  );
};

ApplicationsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  contactId: PropTypes.number.isRequired,
  applications: PropTypes.arrayOf(PropTypes.object).isRequired,
  applicant: PropTypes.object.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    marginTop: spacing(1),

    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  backButton: {
    marginBottom: spacing(2),
    marginTop: spacing(2),
  },
  paper: {
    width: '360px',
    padding: spacing(2, 3, 3),
    margin: spacing(4, 1, 2, 1),
    [breakpoints.down('xs')]: {
      margin: spacing(0, 0, 1, 0),
      width: '95%',
    },
  },
  titleAndOrgContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    paddingBottom: spacing(1.5),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      paddingBottom: spacing(1),
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    color: palette.primary.link,
    padding: '2px 5px',
    cursor: 'pointer',
  },

  title: {
    fontWeight: 700,
    fontSize: '20px',
    textAlign: 'center',
    [breakpoints.down('xs')]: {
      fontSize: '18px',
    },
  },
  organization: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: palette.primary.midGray,
    textAlign: 'center',
  },
});

export default withStyles(styles)(ApplicationsCard);
