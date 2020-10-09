import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ApplicationStateAccordion from './ApplicationStateAccordion';

const ApplicationsCard = ({classes, contactId, applications, applicant}) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
    <Paper className={classes.card}>
      <Typography variant="h6" component="h1" className={classes.title}>
        Applications
      </Typography>
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
        header="Finalists for Role"
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
  );
};

ApplicationsCard.propTypes = {
  classes: PropTypes.object,
  contactId: PropTypes.number,
  applications: PropTypes.arrayOf(PropTypes.object),
  applicant: PropTypes.object,
};

const styles = ({breakpoints, palette, spacing}) => ({
  card: {
    border: 'solid 1px #000000',
    width: '360px',
    justifySelf: 'end',
    padding: spacing(1, 2, 2, 2),
    [breakpoints.down('xs')]: {
      margin: spacing(0),
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
    marginBottom: spacing(2),
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
