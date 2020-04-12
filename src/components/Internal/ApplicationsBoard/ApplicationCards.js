import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ApplicationStateAccordion from '../OpportunitiesBoard/ApplicationStateAccordion';
import {useHistory} from 'react-router-dom';
import Link from '@material-ui/core/Link';

const ApplicationCards = ({
  classes,
  contactId,
  applications,
  applicant,
  page,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  let history = useHistory();

  const toProfile = contactId => {
    history.push(`/profile/${contactId}`);
  };

  let submittedApps = [];
  let recommendedApps = [];
  let interviewingApps = [];
  let notAFitApps = [];
  let consideredApps = [];

  if (applications) {
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

  return (
    <Paper className={classes.paper}>
      <div className={classes.headerContainer}>
        <div className={classes.titleAndOrgContainer}>
          <Typography variant="h6" component="h1" className={classes.title}>
            {`${(applicant && applicant.contact.first_name) ||
              null} ${applicant && applicant.contact.last_name}`}
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            className={classes.organization}
          >
            {applicant && applicant.contact.email}
          </Typography>
        </div>

        <Link
          onClick={() => toProfile(applicant.contact.id)}
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
        contactId={applicant.contact.id}
        page={page}
      />

      <ApplicationStateAccordion
        header="Recommended"
        applications={recommendedApps}
        iconName="recommended"
        expanded={expanded}
        handleChange={handleChange}
        panelName="Recommended"
        contactId={applicant.contact.id}
        page={page}
      />

      <ApplicationStateAccordion
        header="Interviewing"
        applications={interviewingApps}
        iconName="interviewing"
        expanded={expanded}
        handleChange={handleChange}
        panelName="Interviewing"
        contactId={applicant.contact.id}
        page={page}
      />
      <ApplicationStateAccordion
        header="Considered for Role"
        applications={consideredApps}
        iconName="consideredForRole"
        expanded={expanded}
        handleChange={handleChange}
        panelName="consideredForRole"
        contactId={applicant.contact.id}
        page={page}
      />
      <ApplicationStateAccordion
        header="Not a Fit"
        applications={notAFitApps}
        iconName="notAFit"
        expanded={expanded}
        handleChange={handleChange}
        panelName="notAFit"
        contactId={applicant.contact.id}
        page={page}
      />
    </Paper>
  );
};

ApplicationCards.propTypes = {
  classes: PropTypes.object.isRequired,
  contactId: PropTypes.number.isRequired,
  applications: PropTypes.arrayOf(PropTypes.object).isRequired,
  applicant: PropTypes.shape({
    is_active: PropTypes.bool.isRequired,
    applications: PropTypes.arrayOf(PropTypes.object).isRequired,
    contact: PropTypes.shape({
      email: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    program_id: PropTypes.number.isRequired,
    is_approved: PropTypes.bool.isRequired,
  }).isRequired,
  page: PropTypes.string.isRequired,
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

export default withStyles(styles)(ApplicationCards);
