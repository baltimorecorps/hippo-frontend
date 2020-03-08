import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {createExternalLink} from 'lib/helperFunctions/helpers';
import ApplicationStateAccordion from '../OpportunitiesBoard/ApplicationStateAccordion';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import Link from '@material-ui/core/Link';

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
  let history = useHistory();

  const toProfile = () => {
    history.push(`/profile/${contactId}`);
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
  const preventDefault = event => event.preventDefault();

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

        <Link href="#" onClick={() => toProfile()} className={classes.link}>
          <Typography variant="body1" component="h1">
            See Profile
          </Typography>
        </Link>
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
        opportunityId={'67c93a98-f5ca-421f-93ea-680d05af9e38'}
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
        opportunityId={'94a6103c-c985-4db1-bd4e-e9e815c4cdda'}
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
    width: '360px',
    padding: spacing(2, 3, 3),
    margin: spacing(0, 1, 2, 1),
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

export default withStyles(styles)(RoleCards);
