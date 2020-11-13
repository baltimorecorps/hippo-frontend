import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ApplicationStateAccordion from './ApplicationStateAccordion';

const ApplicationsCard = ({classes, contactId, applications}) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let startedApps = [];
  let submittedApps = [];
  let recommendedApps = [];
  let interestedApps = [];
  let interviewingApps = [];
  let inactiveApps = [];
  let consideredApps = [];
  let finalistApps = [];
  let matchedApps = [];

  if (applications && applications.length > 0) {
    startedApps = applications.filter(
      app => app.status === 'started' && app.is_active === true
    );
    submittedApps = applications.filter(
      app => app.status === 'submitted' && app.is_active === true
    );
    recommendedApps = applications.filter(
      app => app.status === 'recommended' && app.is_active === true
    );
    interestedApps = applications.filter(
      app => app.status === 'recommended' && app.is_active === true
    );
    interviewingApps = applications.filter(
      app => app.status === 'interviewed' && app.is_active === true
    );

    consideredApps = applications.filter(
      app => app.status === 'considered_for_role' && app.is_active === true
    );

    // will replace consideredApps
    finalistApps = applications.filter(
      app => app.status === 'finalist' && app.is_active === true
    );

    matchedApps = applications.filter(
      app => app.status === 'matched' && app.is_active === true
    );
    inactiveApps = applications.filter(app => app.is_active === false);
  }
  if (!applications) {
    return <div data-testid="loading">Loading...</div>;
  }
  return (
    <Paper className={classes.card} data-testid="applications_card">
      <Typography
        variant="h6"
        component="h1"
        className={classes.title}
        data-testid="application_card_header"
      >
        Applications
      </Typography>
      <ApplicationStateAccordion
        header="Started"
        applications={startedApps}
        iconName="started"
        expanded={expanded}
        handleChange={handleChange}
        panelName="Started"
        contactId={contactId}
        page="internal-applications-board"
      />
      <ApplicationStateAccordion
        header="Submitted"
        applications={submittedApps}
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
        header="Interested"
        applications={interestedApps}
        iconName="interested"
        expanded={expanded}
        handleChange={handleChange}
        panelName="Interested"
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
        header="Matched"
        applications={matchedApps}
        iconName="matched"
        expanded={expanded}
        handleChange={handleChange}
        panelName="matched"
        contactId={contactId}
        page="internal-applications-board"
      />
      <ApplicationStateAccordion
        header="Inactive"
        applications={inactiveApps}
        iconName="inactive"
        expanded={expanded}
        handleChange={handleChange}
        panelName="inactive"
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
