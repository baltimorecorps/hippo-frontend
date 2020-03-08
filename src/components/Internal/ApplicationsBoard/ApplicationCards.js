import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {createExternalLink} from 'lib/helperFunctions/helpers';
import ApplicationStateAccordion from '../OpportunitiesBoard/ApplicationStateAccordion';

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
  applicant,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let submittedApps = [];
  let recommendedApps = [];
  let interviewingApps = [];

  if (applications) {
    submittedApps = applications.filter(app => app.status === 'submitted');
    recommendedApps = applications.filter(app => app.status === 'recommended');
    interviewingApps = applications.filter(
      app => app.status === 'interviewing'
    );
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.headerContainer}>
        <div className={classes.titleAndOrgContainer}>
          <Typography variant="h6" component="h1" className={classes.title}>
            {`${applicant && applicant.contact.first_name} ${applicant &&
              applicant.contact.last_name}`}
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            className={classes.organization}
          >
            {applicant && applicant.contact.email}
          </Typography>
        </div>

        {/* <Typography className={classes.link}>
          {createExternalLink(
            'View full description',
            applicant.gdoc_link,
            classes.link
          )}
        </Typography> */}
      </div>

      <ApplicationStateAccordion
        toViewApplication={toViewApplication}
        header="Submitted"
        applications={submittedApps}
        totalApps={submittedApps.length}
        iconName="submitted"
        expanded={expanded}
        handleChange={handleChange}
        panelName="Submitted"
        opportunityId={1}
        contactId={78}
      />

      <ApplicationStateAccordion
        toViewApplication={toViewApplication}
        header="Recommended"
        applications={recommendedApps}
        iconName="recommended"
        expanded={expanded}
        handleChange={handleChange}
        panelName="Recommended"
        opportunityId={1}
        contactId={78}
      />

      <ApplicationStateAccordion
        toViewApplication={toViewApplication}
        header="Interviewing"
        applications={interviewingApps}
        iconName="interviewing"
        expanded={expanded}
        handleChange={handleChange}
        panelName="Interviewing"
        opportunityId={1}
        contactId={78}
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
    alignItems: 'center',
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
