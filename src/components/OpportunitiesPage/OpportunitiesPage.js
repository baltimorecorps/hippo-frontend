import React, {useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import {
  createExternalLink,
  createClickTracking,
} from 'lib/helperFunctions/helpers';
import EachOpportunity from './EachOpportunity';

const OpportunitiesPage = ({
  classes,
  opportunities,
  getAllOpportunities,
  apps,
  getAllApplications,
  contactId,
  submittedIds,
  contact,
  page,
}) => {
  let history = useHistory();

  useEffect(() => {
    if (!apps && contact) {
      getAllApplications(contact.id);
    }
  }, [apps, getAllApplications, contact]);

  const toApply = opportunity_id => {
    history.push(`/application/${opportunity_id}`);
  };
  const toViewApplication = opportunity_id => {
    history.push(`/application/${opportunity_id}/review`);
  };

  useEffect(() => {
    getAllOpportunities();
  }, [getAllOpportunities]);

  const onClickApplyButton = opportunityId => {
    createClickTracking(
      'Opportunity',
      'Click Apply Button',
      'Click Apply Button'
    );
    toApply(opportunityId);
  };
  const onClickViewAppButton = opportunityId => {
    createClickTracking(
      'Opportunity',
      'Click Apply Button',
      'Click Apply Button'
    );
    toViewApplication(opportunityId);
  };

  let header = '';
  let filteredOpportunities = [];
  switch (page) {
    case 'Mayoral Fellowship':
      header = 'Mayoral Fellowship';
      filteredOpportunities = opportunities.filter(
        opp => opp.program_name === 'Mayoral Fellowship'
      );
      break;
    case 'Place for Purpose':
      header = 'Place for Purpose';
      filteredOpportunities = opportunities.filter(
        opp => opp.program_name === 'Place for Purpose'
      );
      break;
    default:
      header = 'All';
      filteredOpportunities = opportunities;
  }

  return (
    <div className={classes.container}>
      <Paper className={classes.headerPaper}>
        <Typography
          component="h1"
          variant="h5"
          align="left"
          className={classes.header}
        >
          {`${header} Opportunities`}
        </Typography>
      </Paper>
      {filteredOpportunities.map(
        (opportunity, index) =>
          opportunity.is_active === true && (
            <EachOpportunity
              opportunity={opportunity}
              contact={contact}
              submittedIds={submittedIds}
              index={index}
              onClickViewAppButton={onClickViewAppButton}
              onClickApplyButton={onClickApplyButton}
            />
          )
      )}
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: spacing(1),
  },
  header: {
    textAlign: 'center',
  },
  headerPaper: {
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
    width: '100%',
    padding: spacing(2, 3, 3),
    marginBottom: spacing(2),
  },
});

export default withStyles(styles)(OpportunitiesPage);
