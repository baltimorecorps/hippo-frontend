import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {createExternalLink} from 'lib/helperFunctions/helpers';
import ApplicationStateAccordion from './ApplicationStateAccordion';
import Link from '@material-ui/core/Link';
import {useHistory} from 'react-router-dom';
import DescriptionIcon from '@material-ui/icons/Description';

const RoleCards = ({
  classes,
  page,
  opportunity,
  getAllOpportunities,

  applications,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let history = useHistory();

  const toEmployerPage = opportunityId => {
    history.push(`/org/opportunity/${opportunityId}`);
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
    if (page === 'employer') {
      notAFitApps = applications.filter(
        app => app.is_active === false && app.status !== 'submitted'
      );
    } else {
      notAFitApps = applications.filter(app => app.is_active === false);
    }
    consideredApps = applications.filter(
      app => app.status === 'considered_for_role' && app.is_active === true
    );
  }

  return (
    <Paper
      className={
        page === 'employer'
          ? classes.employerPaper
          : opportunity.program_name === 'Mayoral Fellowship'
          ? classes.mayoralContainer
          : opportunity.program_name === 'Fellowship'
          ? classes.fellowshipContainer
          : classes.paper
      }
    >
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
          {page === 'employer' && (
            <Typography
              variant="h6"
              component="h2"
              className={classes.shortDescription}
            >
              {opportunity.short_description}
            </Typography>
          )}
        </div>
        <div className={classes.headerBottomContainer}>
          <a href={opportunity.gdoc_link} className={classes.gDocLink}>
            <DescriptionIcon className={classes.gDocIcon} />
          </a>
          <div className={classes.employerViewAndProgramName}>
            <Link
              component="button"
              variant="body1"
              onClick={() => toEmployerPage(opportunity.id)}
              className={classes.employerLink}
            >
              {page === 'internal' && 'Employer View'}
            </Link>
            <Typography
              variant="h5"
              component="p"
              className={classes.programName}
            >
              {opportunity.program_name || ''}
            </Typography>
          </div>
        </div>
      </div>
      {page === 'internal' && (
        <ApplicationStateAccordion
          header="Submitted"
          applications={submittedApps}
          totalApps={submittedApps.length}
          iconName="submitted"
          expanded={expanded}
          handleChange={handleChange}
          panelName="Submitted"
          opportunityId={opportunity.id}
          page={page}
        />
      )}

      <ApplicationStateAccordion
        header="Recommended"
        applications={recommendedApps}
        iconName="recommended"
        expanded={expanded}
        handleChange={handleChange}
        panelName="Recommended"
        opportunityId={opportunity.id}
        page={page}
      />

      <ApplicationStateAccordion
        header="Interviewing"
        applications={interviewingApps}
        iconName="interviewing"
        expanded={expanded}
        handleChange={handleChange}
        panelName="Interviewing"
        opportunityId={opportunity.id}
        page={page}
      />
      <ApplicationStateAccordion
        header="Finalists for Role"
        applications={consideredApps}
        iconName="consideredForRole"
        expanded={expanded}
        handleChange={handleChange}
        panelName="consideredForRole"
        opportunityId={opportunity.id}
        page={page}
      />

      <ApplicationStateAccordion
        header="Not a Fit"
        applications={notAFitApps}
        iconName="notAFit"
        expanded={expanded}
        handleChange={handleChange}
        panelName="notAFit"
        opportunityId={opportunity.id}
        page={page}
      />
    </Paper>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    padding: spacing(2, 3, 3),
    margin: spacing(0, 1, 2, 1),
    width: '360px',
    borderTop: '4px solid #262626',
  },
  mayoralContainer: {
    padding: spacing(2, 3, 3),
    margin: spacing(0, 1, 2, 1),
    width: '360px',
    borderTop: '4px solid #ef4aff',
  },
  fellowshipContainer: {
    padding: spacing(2, 3, 3),
    margin: spacing(0, 1, 2, 1),
    width: '360px',
    borderTop: '4px solid #ffcc33',
  },
  employerPaper: {
    flexGrow: 1,

    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '95%',
    padding: spacing(2, 3, 3),
    margin: spacing(1.5),
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
  headerBottomContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  employerViewAndProgramName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  gDocLink: {
    marginRight: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gDocIcon: {
    color: '#527aff',
    fontSize: '25px',
  },
  employerLink: {
    color: '#000000',
    textDecoration: 'underline',
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
  shortDescription: {
    fontSize: '16px',
    padding: '0 5% 3px 0',
    textIndent: '25px',
    textAlign: 'justify',
  },
  programName: {
    fontSize: '14px',
    verticalAlign: 'text-bottom',
    color: palette.primary.midGray,
  },
});

export default withStyles(styles)(RoleCards);
