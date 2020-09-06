import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ApplicationStateAccordion from './ApplicationStateAccordion';
import Link from '@material-ui/core/Link';
import {useHistory} from 'react-router-dom';
import DescriptionIcon from '@material-ui/icons/Description';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';

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

  let paperStyles = '';

  if (page === 'internal-opportunities-board') {
    switch (opportunity.program_name) {
      case 'Fellowship':
        paperStyles = `${classes.paper} + ${classes.fellowshipContainerTop}`;
        break;
      case 'Mayoral Fellowship':
        paperStyles = `${classes.paper} + ${classes.mayoralContainerTop}`;
        break;
      default:
        paperStyles = classes.paper;
    }
  }

  if (opportunity.is_active === false) {
    paperStyles = `${paperStyles} + ${classes.inactive}`;
  }
  if (page === 'employer') {
    paperStyles = classes.employerPaper;
  }

  return (
    <Paper className={paperStyles}>
      <div className={classes.headerContainer}>
        <div className={classes.titleAndOrgContainer}>
          <Typography variant="h6" component="h1" className={classes.title}>
            {opportunity.title}
          </Typography>
          {page !== 'employer' && (
            <Typography
              variant="h6"
              component="h2"
              className={classes.organization}
            >
              {opportunity.org_name}
            </Typography>
          )}

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
          <Tooltip title="Job Description">
            <a href={opportunity.gdoc_link} className={classes.linkContainer}>
              <DescriptionIcon className={classes.gDocIcon} />
            </a>
          </Tooltip>

          <Typography
            variant="h5"
            component="p"
            className={classes.programName}
          >
            {opportunity.program_name || ''}
          </Typography>
          <Link
            component="button"
            variant="body1"
            onClick={() => toEmployerPage(opportunity.id)}
            className={classes.linkContainer}
          >
            {page === 'internal-opportunities-board' && (
              <Tooltip title="Employer's View">
                <VisibilityIcon className={classes.employerViewIcon} />
              </Tooltip>
            )}
          </Link>
        </div>
      </div>
      {page === 'internal-opportunities-board' && (
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
          isActive={opportunity.is_active}
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
        isActive={opportunity.is_active}
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
        isActive={opportunity.is_active}
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
        isActive={opportunity.is_active}
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
        isActive={opportunity.is_active}
      />
    </Paper>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  paper: {
    padding: spacing(2, 3, 3),
    width: '360px',
    marginBottom: spacing(1),

    borderTop: '4px solid #262626',
    [breakpoints.up('sm')]: {
      margin: spacing(0, 1, 2, 1),
    },
  },
  mayoralContainerTop: {
    borderTop: '4px solid #ef4aff',
  },
  fellowshipContainerTop: {
    borderTop: '4px solid #ffcc33',
  },
  inactive: {
    backgroundColor: '#d2d2d6',
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
    paddingBottom: spacing(1),
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
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  gDocIcon: {
    color: '#527aff',
    fontSize: '40px',
    padding: '8px',
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: '#ededed',
    },
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  employerViewIcon: {
    color: '#424242',
    fontSize: '42px',
    padding: '8px',
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: '#ededed',
    },
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
    verticalAlign: 'center',
    color: palette.primary.midGray,
    margin: '0 5px',
  },
});

export default withStyles(styles)(RoleCards);
