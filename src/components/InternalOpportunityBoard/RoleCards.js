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
  appLists,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.container}>
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
              `https://docs.google.com/document/d/${opportunity.gdoc_id}`,
              classes.link
            )}
          </Typography>
        </div>

        <ApplicationStateAccordion
          toViewApplication={toViewApplication}
          header="New Application"
          apps={appLists[0]}
          iconName="newApplication"
          expanded={expanded}
          handleChange={handleChange}
          panelName="New_Application"
          opportunityId={opportunity.id}
        />
        <ApplicationStateAccordion
          toViewApplication={toViewApplication}
          header="Recommended"
          apps={appLists[1]}
          iconName="recommended"
          expanded={expanded}
          handleChange={handleChange}
          panelName="Recommended"
          opportunityId={opportunity.id}
        />
        <ApplicationStateAccordion
          toViewApplication={toViewApplication}
          header="Interviewing"
          apps={appLists[2]}
          iconName="interviewing"
          expanded={expanded}
          handleChange={handleChange}
          panelName="Interviewing"
          opportunityId={opportunity.id}
        />
      </Paper>
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    minWidth: '350px',
    maxWidth: '90%',
    [breakpoints.down('xs')]: {
      minWidth: '200px',
    },
    [breakpoints.down('sm')]: {
      minWidth: '250px',
    },
    [breakpoints.down('md')]: {
      minWidth: '300px',
    },
  },
  paper: {
    // width: '90%',
    padding: spacing(2, 3, 3),
    margin: spacing(0, 1, 2, 1),
  },

  titleAndOrgContainer: {
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('md')]: {
      marginRight: spacing(0),
      alignSelf: 'center',
    },
  },
  headerContainer: {
    paddingBottom: spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',

    [breakpoints.down('xs')]: {
      paddingBottom: spacing(1),
    },
    [breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
    [breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
});

export default withStyles(styles)(RoleCards);
