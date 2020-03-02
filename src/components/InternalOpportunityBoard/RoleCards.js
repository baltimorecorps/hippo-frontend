import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {createExternalLink} from 'lib/helperFunctions/helpers';
import ApplicationStateAccordion from './ApplicationStateAccordion';

const RoleCards = ({
  classes,
  contactId,
  apps,
  getAllApplications,
  state,
  submittedApp,
  opportunity,
  getAllOpportunities,
  toViewApplication,
  applications,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let submittedApps = [];
  let recommendedApps = [];
  let interviewingApps = [];

  // console.log(applications);

  if (applications) {
    submittedApps = applications.filter(
      app => app.status === 'submitted' && app.is_active === true
    );
    recommendedApps = applications.filter(
      app => app.status === 'recommended' && app.is_active === true
    );
    interviewingApps = applications.filter(
      app => app.status === 'interviewing' && app.is_active === true
    );
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.headerContainer}>
        <div className={classes.titleAndOrgContainer}>
          <Typography variant="h6" component="h1" className={classes.title}>
            {opportunity.title}
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            className={classes.organization}
          >
            {opportunity.org_name}
          </Typography>
        </div>

        <Typography className={classes.link}>
          {createExternalLink(
            'View full description',
            opportunity.gdoc_link,
            classes.link
          )}
        </Typography>
      </div>

      <ApplicationStateAccordion
        toViewApplication={toViewApplication}
        header="New Application"
        applications={submittedApps}
        totalApps={submittedApps.length}
        iconName="newApplication"
        expanded={expanded}
        handleChange={handleChange}
        panelName="New_Application"
        opportunityId={opportunity.id}
      />

      <ApplicationStateAccordion
        toViewApplication={toViewApplication}
        header="Recommended"
        applications={recommendedApps}
        iconName="recommended"
        expanded={expanded}
        handleChange={handleChange}
        panelName="Recommended"
        opportunityId={opportunity.id}
      />

      <ApplicationStateAccordion
        toViewApplication={toViewApplication}
        header="Interviewing"
        applications={interviewingApps}
        iconName="interviewing"
        expanded={expanded}
        handleChange={handleChange}
        panelName="Interviewing"
        opportunityId={opportunity.id}
      />
    </Paper>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    padding: spacing(2, 3, 3),
    margin: spacing(0, 1, 2, 1),
  },
  titleAndOrgContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  headerContainer: {
    paddingBottom: spacing(2),
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
  },

  title: {
    fontWeight: 700,
    fontSize: '20px',
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

export default withStyles(styles)(RoleCards);
